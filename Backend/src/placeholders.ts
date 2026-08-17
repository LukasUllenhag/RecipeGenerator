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

export const SAMPLE_RECIPES: RecipesResponse["recipes"] = [
  {
    title: "Deli Meat & Cheese Omelette with Simple Lemon-Mustard Salad",
    description:
      "A quick, satisfying omelette loaded with sliced deli meat and cheese, served with a bright green salad dressed with lemon and mustard.",
    cookTime: "15 min",
    steps: [
      "Prepare salad: thinly slice about 1/4 cucumber and put into a bowl with a large handful of mixed salad/greens.",
      "Make dressing: in a small bowl mix 1/2 teaspoon yellow mustard, 1 tablespoon cooking oil, juice of 1/4 lemon, and a pinch of salt and pepper. Whisk and toss with the salad. Set aside.",
      "Prepare omelette mix: in a bowl crack 2–3 eggs, add 1 tablespoon milk, a pinch of salt and pepper, and beat until combined.",
      "Prepare filling: roughly chop 3–4 slices of deli meat and grate or crumble about 30 g of the wedge cheese (or use a little grated cheese).",
      "Heat a non-stick pan over medium heat and add 1/2 tablespoon Bregott butter or Flora spread. When melted, briefly warm the chopped deli meat for 30–60 seconds.",
      "Pour the egg mixture over the warmed meat in the pan. When the edges start to set, sprinkle the cheese over one half of the omelette.",
      "When the omelette is mostly set but still slightly soft on top (about 1–2 minutes), fold it in half and cook another 30 seconds to set through (lower heat if browning too fast).",
      "Slide the omelette onto a plate and serve immediately with the lemon-mustard salad.",
    ],
  },
  {
    title: "Cool Cucumber & Yogurt Dip (quick tzatziki-style) with Veggie Sticks and Chips",
    description:
      "A creamy, refreshing cucumber dip made from natural yoghurt and sour cream — great with potato chips and sliced cucumber or other raw vegetables.",
    cookTime: "10 min (plus optional chill)",
    steps: [
      "Grate or finely dice about half a cucumber. Sprinkle with a pinch of salt and let sit in a sieve or on a paper towel for 5 minutes; then squeeze out excess water with your hands or press with a spoon.",
      "In a bowl combine 1 cup (about 240 ml) yoghurt naturell and 2–3 tablespoons white sour cream/cream cheese. Stir until smooth.",
      "Add the drained cucumber to the yoghurt mix. Stir in the juice of 1/4 lemon, 1/2 teaspoon yellow mustard for a touch of tang, and season with salt and pepper to taste. Mix well.",
      "Optional: chill the dip for 10–15 minutes to let flavors meld. Taste and adjust seasoning before serving.",
      "Serve the dip with potato chips, cucumber slices, and other raw veggies from the paper bags as dippers.",
    ],
  },
  {
    title: "Savory Mini Tart Bake (using the foil tart)",
    description:
      "Turn the small foil tart into a hot, cheesy mini-quiche using egg, milk, deli meat and tomato sauce for extra flavor.",
    cookTime: "25–30 min (including prep)",
    steps: [
      "Preheat the oven to 200°C (390°F).",
      "Chop 4–5 slices of deli meat into small pieces and grate about 30 g grated cheese (or use the wedge cheese).",
      "In a small bowl whisk 1 egg with 2 tablespoons milk, a pinch of salt and pepper, and 1 teaspoon yellow mustard for a little lift.",
      "Spread 1–2 tablespoons of the tomato/pasta sauce into the bottom of the foil tart shell to form a flavored base.",
      "Scatter the chopped deli meat evenly over the sauce, then pour the egg mixture into the tart shell. Sprinkle grated cheese on top.",
      "Place the tart on a baking tray and bake in the preheated oven for 12–18 minutes, until the filling is set and the top is lightly golden.",
      "Remove from oven and let rest 2–3 minutes before serving. Pair with a small handful of mixed salad/greens dressed simply (oil + lemon + salt).",
    ],
  },
  {
    title: "Loaded Potato Chip 'Nachos' (oven-melted chips)",
    description:
      "A fast, no-tortilla nacho-style plate using the purple potato chips as the base, topped with melted cheese, warmed deli meat and scoops of taco sauce and sour cream.",
    cookTime: "12–15 min",
    steps: [
      "Preheat the oven to 200°C (390°F). Line a baking tray with foil or parchment.",
      "Spread a single layer of potato chips from the bag across the tray (you can overlap a little but avoid a thick pile).",
      "Scatter a generous handful of grated cheese over the chips. Tear or chop several slices of deli meat and distribute them across the chips as well.",
      "Add small dollops of taco sauce across the chips (use sparingly to avoid sogginess).",
      "Place the tray in the oven for 6–9 minutes or until the cheese has melted and the deli meat is warmed through. Watch closely so chips don’t burn.",
      "Remove from oven. Top with spoonfuls of white sour cream/cream cheese, a sprinkle of the dark pickle/relish (for brightness), and some chopped cucumber and mixed salad greens for freshness.",
      "Finish with a light drizzle of burger dressing or ketchup if desired, then serve immediately while warm and crisp.",
    ],
  },
]

export function getSampleRecipes(): RecipesResponse {
  return { recipes: SAMPLE_RECIPES }
}
