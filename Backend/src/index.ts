import { Hono } from "hono"
import { cors } from "hono/cors"
import { serve } from "@hono/node-server"
import { generateText, Output } from "ai"
import { fridgeAnalysisSchema, recipesResponseSchema } from "./schema.js"
import { getSampleFridgeAnalysis, getSampleRecipes } from "./placeholders.js"

const MODEL = "openai/gpt-5-mini"

const VISION_PROMPT = `Look at this fridge photo.
Return every visible food item or ingredient as its own string.
Each string must include an estimated amount and the item name, for example "2 tomatoes" or "3 kg of flour".
Use a countable number when you can count the items. Otherwise use a sensible unit such as kg, g, ml, bunch, carton, or bottle.
If you cannot estimate an amount, use "some", for example "some cheese".
Do not include recipes, commentary, or confidence scores.`

const RECIPE_PROMPT = `You are a home cook suggesting meals from a fridge.
Create 4 practical recipes that can be cooked with the listed ingredients.
Prefer using what is already in the fridge. Common pantry staples like salt, pepper, water, and a little oil are allowed.
Each recipe needs a title, a short description, a cook time, and a full step-by-step cooking procedure.
Do not invent large missing ingredients that are not in the fridge.`

const app = new Hono()

const ALLOWED_ORIGINS = new Set(
  [
    process.env.FRONTEND_URL,
    "https://recipe-generator-web.vercel.app",
  ].filter((origin): origin is string => Boolean(origin)),
)

function isAllowedOrigin(origin: string) {
  if (origin.startsWith("http://localhost:")) {
    return true
  }

  return ALLOWED_ORIGINS.has(origin)
}

app.use(
  "*",
  cors({
    origin: (origin) => (origin && isAllowedOrigin(origin) ? origin : ""),
  }),
)


app.post("/api/fridge", async (c) => {
  const formData = await c.req.formData()
  const mode = formData.get("mode")
  const useMock = mode !== "live"

  if (useMock) {
    return c.json(getSampleFridgeAnalysis())
  }

  const image = formData.get("image")

  if (!image || typeof image === "string") {
    return c.json({ error: "An image file is required" }, 400)
  }

  try {
    const result = await generateText({
      model: MODEL,
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
      console.error("AI Gateway fridge vision returned no output")
      return c.json({ error: "Could not detect ingredients" }, 502)
    }

    return c.json(fridgeAnalysisSchema.parse(result.output))
  } catch (error) {
    console.error("AI Gateway fridge vision failed", error)
    return c.json({ error: "Could not analyze the fridge photo" }, 502)
  }
})

app.post("/api/recipes", async (c) => {
  const body = await c.req.json().catch(() => null)
  const ingredients = Array.isArray(body?.ingredients)
    ? body.ingredients.filter((item: unknown) => typeof item === "string")
    : []
  const useMock = body?.mode !== "live"

  if (ingredients.length === 0) {
    return c.json({ error: "Ingredients are required" }, 400)
  }

  if (useMock) {
    return c.json(getSampleRecipes())
  }

  try {
    const result = await generateText({
      model: MODEL,
      output: Output.object({ schema: recipesResponseSchema }),
      prompt: `${RECIPE_PROMPT}\n\nIngredients in the fridge:\n${ingredients.map((item: string) => `- ${item}`).join("\n")}`,
    })

    if (!result.output) {
      console.error("AI Gateway recipe generation returned no output")
      return c.json({ error: "Could not generate recipes" }, 502)
    }

    return c.json(recipesResponseSchema.parse(result.output))
  } catch (error) {
    console.error("AI Gateway recipe generation failed", error)
    return c.json({ error: "Could not generate recipes" }, 502)
  }
})

export default app;

if (!process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: 3000,
  });

  console.log("Backend listening on http://localhost:3000");
}
