export type Recipe = {
  title: string
  description: string
  cookTime: string
  steps: string[]
}

export type FridgeAnalysis = {
  ingredients: string[]
}

export type RecipesResponse = {
  recipes: Recipe[]
}

export type AnalysisMode = 'mock' | 'live'

export async function analyzeFridge(
  mode: AnalysisMode,
  image?: File,
): Promise<FridgeAnalysis> {
  const body = new FormData()
  body.append('mode', mode)
  if (image) {
    body.append('image', image)
  }

  const response = await fetch('/api/fridge', {
    method: 'POST',
    body,
  })

  if (!response.ok) {
    throw new Error(`Fridge analysis failed (${response.status})`)
  }

  return (await response.json()) as FridgeAnalysis
}

export async function generateRecipes(ingredients: string[]): Promise<RecipesResponse> {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  })

  if (!response.ok) {
    throw new Error(`Recipe generation failed (${response.status})`)
  }

  return (await response.json()) as RecipesResponse
}
