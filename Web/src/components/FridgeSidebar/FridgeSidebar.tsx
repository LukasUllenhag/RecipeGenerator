import { useState } from 'react'
import { getRandomIngredients } from './ingredientPool'
import { FridgeIllustration } from './FridgeIllustration'
import { FridgeUpload } from './FridgeUpload'
import './FridgeSidebar.css'

export function FridgeSidebar() {
  const [ingredients, setIngredients] = useState<string[]>([])

  function handleFileSelected(_file: File) {
    setIngredients(getRandomIngredients())
  }

  function handleUploadAnother() {
    setIngredients([])
  }

  const ingredientCount = ingredients.length
  const hasIngredients = ingredientCount > 0

  return (
    <section className="fridge-panel" aria-label="Your fridge">
      <h2 className="fridge-panel__title">Your Fridge</h2>

      <FridgeIllustration>
        {hasIngredients ? (
          <ul className="fridge-ingredient-list" aria-label="Ingredients in your fridge">
            {ingredients.map((name) => (
              <li key={name} className="fridge-ingredient-item">
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <FridgeUpload onFileSelected={handleFileSelected} />
        )}
      </FridgeIllustration>

      {hasIngredients && (
        <>
          <p className="fridge-panel__count">
            {ingredientCount} {ingredientCount === 1 ? 'ingredient' : 'ingredients'}
          </p>
          <button
            type="button"
            className="fridge-panel__reupload"
            onClick={handleUploadAnother}
          >
            Upload another photo
          </button>
        </>
      )}

      <div className="fridge-panel__actions">
        <button type="button" className="btn btn--add" disabled={!hasIngredients}>
          + Add ingredient
        </button>
        <button type="button" className="btn btn--generate" disabled={!hasIngredients}>
          Generate Recipes
        </button>
      </div>
    </section>
  )
}
