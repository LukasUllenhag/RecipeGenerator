import type { Recipe } from '../../api/analyzeFridge'
import './RecipeList.css'

type RecipeListProps = {
  recipes: Recipe[]
}

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return null
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe, index) => (
        <li key={`${index}-${recipe.title}`}>
          <details className="recipe-card">
            <summary className="recipe-card__summary">
              <div className="recipe-card__header">
                <h3 className="recipe-card__title">{recipe.title}</h3>
                <p className="recipe-card__time">{recipe.cookTime}</p>
              </div>
              <p className="recipe-card__description">{recipe.description}</p>
            </summary>
            <ol className="recipe-card__steps">
              {recipe.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ul>
  )
}
