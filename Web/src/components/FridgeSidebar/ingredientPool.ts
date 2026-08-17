const INGREDIENT_POOL = [
  'Eggs',
  'Tomatoes',
  'Cheese',
  'Carrots',
  'Milk',
  'Butter',
  'Chicken breast',
  'Spinach',
  'Bell peppers',
  'Onions',
  'Garlic',
  'Greek yogurt',
  'Lemon',
  'Mushrooms',
  'Broccoli',
  'Rice',
  'Pasta',
  'Olive oil',
  'Avocado',
  'Cucumber',
  'Lettuce',
  'Bacon',
  'Ground beef',
  'Potatoes',
  'Cream',
  'Parmesan',
  'Basil',
  'Ginger',
  'Soy sauce',
  'Honey',
] as const

export function getRandomIngredients(count = 50): string[] {
  const pool = [...INGREDIENT_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}
