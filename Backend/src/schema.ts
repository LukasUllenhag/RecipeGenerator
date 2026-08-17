import { z } from "zod"

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export const fridgeAnalysisSchema = z.object({
  ingredients: z
    .array(
      z
        .string()
        .describe(
          'One ingredient with its amount, for example "2 tomatoes" or "3 kg of flour"',
        ),
    )
    .describe("Visible fridge ingredients, each as a single amount-plus-item string"),
})

export const recipesResponseSchema = z.object({
  recipes: z.array(recipeSchema),
})

export type FridgeAnalysis = z.infer<typeof fridgeAnalysisSchema>
export type RecipesResponse = z.infer<typeof recipesResponseSchema>
