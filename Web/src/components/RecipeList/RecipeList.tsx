type RecipeListProps = {
  recipes: {
    title: string
    description: string
  }[]
}

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return null
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.title} className="recipe-card">
          <h3 className="recipe-card__title">{recipe.title}</h3>
          <p className="recipe-card__description">{recipe.description}</p>
        </li>
      ))}
    </ul>
  )
}
