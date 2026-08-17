import type { FridgeAnalysis, RecipesResponse } from "./schema"

export const SAMPLE_FRIDGE_INGREDIENTS: FridgeAnalysis["ingredients"] = [
  "2 cartons yoghurt naturell",
  "1 carton filmjölk",
  "1 carton milk (green carton)",
  "1 bottle yellow mustard",
  "1 tub Flora spread",
  "1 jar taco sauce",
  "1 bag ground coffee",
  "1 bag potato chips (purple)",
  "1 jug red juice (~1 L)",
  "1 tub white sour cream/cream cheese",
  "2 tubs Bregott butter",
  "1 jar strawberry jam",
  "6 eggs (carton)",
  "1 small foil tart",
  "1 pack sliced deli meat (wrapped)",
  "1 pink yogurt cup",
  "1 jar dark pickle/relish",
  "1 jar tomato/pasta sauce (door)",
  "1 bottle ketchup (Felix)",
  "1 bottle cooking oil",
  "1 bottle dark soy/balsamic sauce",
  "1 bag grated cheese",
  "1 carton Kelda sauce",
  "2 small glass syrup bottles",
  "1 squeeze mustard bottle",
  "1 bottle burger dressing",
  "1 small jar with wooden lid",
  "2 small boxed stock/sauce cartons",
  "1 wedge bag of cheese (small)",
  "1 lemon",
  "1 cucumber",
  "1 bag mixed salad/greens",
  "3 paper bags with vegetables",
  "1 tub white spread (large)",
  "1 tray of cold cuts (plastic)",
]

export function getSampleFridgeAnalysis(): FridgeAnalysis {
  return { ingredients: SAMPLE_FRIDGE_INGREDIENTS }
}

const RECIPE_POOL: RecipesResponse["recipes"] = [
  {
    title: "Tomato Egg Stir-Fry",
    description: "Soft scrambled eggs with ripe tomatoes, garlic, and a splash of soy sauce.",
  },
  {
    title: "Cheesy Spinach Omelette",
    description: "A folded omelette filled with wilted spinach, cheese, and a little cream.",
  },
  {
    title: "Lemon Herb Chicken",
    description: "Pan-seared chicken breast with lemon, garlic, and olive oil.",
  },
  {
    title: "Roasted Carrot Salad",
    description: "Warm roasted carrots over lettuce with yogurt, honey, and basil.",
  },
  {
    title: "Mushroom Pasta",
    description: "Simple pasta tossed with mushrooms, garlic, parmesan, and butter.",
  },
  {
    title: "Avocado Rice Bowl",
    description: "Rice topped with avocado, cucumber, soy sauce, and a soft egg.",
  },
  {
    title: "Broccoli Beef Skillet",
    description: "Ground beef cooked with broccoli, onions, ginger, and soy sauce.",
  },
  {
    title: "Potato Frittata",
    description: "Baked eggs with potatoes, cheese, and bell peppers.",
  },
]

function pickRandom<T>(items: T[], count: number): T[] {
  const pool = [...items]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}

export function getPlaceholderRecipes(): RecipesResponse {
  return {
    recipes: pickRandom(RECIPE_POOL, 4),
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
