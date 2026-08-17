import { Hono } from "hono"
import { cors } from "hono/cors"
import { serve } from "@hono/node-server"
import { generateText, Output } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"


const app = new Hono()

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
  }),
)


app.get("/api/hello", (c) => {
    return c.json({message: "Hello asdffrom the MovieNight Backeeend"})
  })

serve({
    fetch: app.fetch,
    port: 3000,
})