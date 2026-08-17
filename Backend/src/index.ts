import { Hono } from "hono"
import { cors } from "hono/cors"
import { serve } from "@hono/node-server"
import { generateText, Output } from "ai"
import { openai } from "@ai-sdk/openai"
import { fridgeAnalysisSchema, recipesResponseSchema } from "./schema"
import { delay, getPlaceholderRecipes, getSampleFridgeAnalysis } from "./placeholders"

const VISION_PROMPT = `Look at this fridge photo.
Return every visible food item or ingredient as its own string.
Each string must include an estimated amount and the item name, for example "2 tomatoes" or "3 kg of flour".
Use a countable number when you can count the items. Otherwise use a sensible unit such as kg, g, ml, bunch, carton, or bottle.
If you cannot estimate an amount, use "some", for example "some cheese".
Do not include recipes, commentary, or confidence scores.`

const app = new Hono()

app.use(
  "*",
  cors({
    origin: (origin) =>
      origin.startsWith("http://localhost:") ? origin : "http://localhost:5173",
  }),
)

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello from the Recipe Generator backend" })
})

app.post("/api/fridge", async (c) => {
  const formData = await c.req.formData()
  const mode = formData.get("mode")
  const useMock = mode !== "live"

  if (useMock) {
    console.log("Using sample fridge ingredients (mock mode)")
    return c.json(getSampleFridgeAnalysis())
  }

  const image = formData.get("image")

  if (!image || typeof image === "string") {
    return c.json({ error: "An image file is required" }, 400)
  }

  console.log("Received fridge image", {
    name: image.name,
    type: image.type,
    size: image.size,
  })

  try {
    const result = await generateText({
      model: openai("gpt-5-mini"),
      output: Output.object({ schema: fridgeAnalysisSchema }),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: VISION_PROMPT },
            {
              type: "file",
              mediaType: image.type || "image",
              data: new Uint8Array(await image.arrayBuffer()),
            },
          ],
        },
      ],
    })

    if (!result.output) {
      console.error("OpenAI fridge vision returned no output")
      return c.json({ error: "Could not detect ingredients" }, 502)
    }

    const analysis = fridgeAnalysisSchema.parse(result.output)
    console.log("OpenAI fridge ingredients", analysis.ingredients)
    console.log("OpenAI usage", result.usage)
    return c.json(analysis)
  } catch (error) {
    console.error("OpenAI fridge vision failed", error)
    return c.json({ error: "Could not analyze the fridge photo" }, 502)
  }
})

app.post("/api/recipes", async (c) => {
  const body = await c.req.json().catch(() => null)
  const ingredients = Array.isArray(body?.ingredients) ? body.ingredients : []

  console.log("Generating recipes for ingredients", ingredients)

  await delay(1200)

  const recipes = recipesResponseSchema.parse(getPlaceholderRecipes())
  return c.json(recipes)
})

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log("Backend listening on http://localhost:3000")
