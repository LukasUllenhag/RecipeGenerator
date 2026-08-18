import { useEffect, useRef, useState } from 'react'
import { FridgeIllustration } from './FridgeIllustration'
import { FridgeUpload } from './FridgeUpload'
import { LoadingBar } from './LoadingBar'
import { AnalysisModeToggle } from './AnalysisModeToggle'
import { IngredientItem } from './IngredientItem'
import type { AnalysisMode } from '../../api/analyzeFridge'
import './FridgeSidebar.css'

type FridgeSidebarProps = {
  ingredients: string[]
  isAnalyzing: boolean
  isGenerating: boolean
  error: string | null
  mode: AnalysisMode
  onModeChange: (mode: AnalysisMode) => void
  onFileSelected: (file: File) => void
  onLoadSample: () => void
  onAddIngredient: (ingredient: string) => void
  onUpdateIngredient: (index: number, ingredient: string) => void
  onRemoveIngredient: (index: number) => void
  onGenerateRecipes: () => void
  onReset: () => void
}

export function FridgeSidebar({
  ingredients,
  isAnalyzing,
  isGenerating,
  error,
  mode,
  onModeChange,
  onFileSelected,
  onLoadSample,
  onAddIngredient,
  onUpdateIngredient,
  onRemoveIngredient,
  onGenerateRecipes,
  onReset,
}: FridgeSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const previousCount = useRef(0)
  const [isComposing, setIsComposing] = useState(false)
  const ingredientCount = ingredients.length
  const hasIngredients = ingredientCount > 0
  const isBusy = isAnalyzing || isGenerating

  useEffect(() => {
    if (ingredientCount === previousCount.current + 1 || isComposing) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
    }
    previousCount.current = ingredientCount
  }, [ingredientCount, isComposing])

  return (
    <section className="fridge-panel" aria-label="Your fridge">
      <h2 className="fridge-panel__title">Your Fridge</h2>
      <AnalysisModeToggle mode={mode} disabled={isBusy} onChange={onModeChange} />

      <FridgeIllustration>
        {isAnalyzing ? (
          <LoadingBar label={mode === 'live' ? 'Analyzing fridge…' : 'Loading sample…'} />
        ) : hasIngredients ? (
          <ul
            ref={listRef}
            className="fridge-ingredient-list"
            aria-label="Ingredients in your fridge"
          >
            {ingredients.map((name, index) => (
              <IngredientItem
                key={`${index}-${name}`}
                name={name}
                disabled={isBusy}
                onSave={(next) => onUpdateIngredient(index, next)}
                onRemove={() => onRemoveIngredient(index)}
              />
            ))}
            {isComposing ? (
              <IngredientItem
                name=""
                isComposer
                disabled={isBusy}
                onSave={(next) => {
                  onAddIngredient(next)
                  setIsComposing(false)
                }}
                onCancel={() => setIsComposing(false)}
              />
            ) : (
              <li>
                <button
                  type="button"
                  className="fridge-ingredient-add"
                  disabled={isBusy}
                  onClick={() => setIsComposing(true)}
                >
                  + Add ingredient
                </button>
              </li>
            )}
          </ul>
        ) : mode === 'live' ? (
          <FridgeUpload onFileSelected={onFileSelected} />
        ) : (
          <button type="button" className="fridge-upload" onClick={onLoadSample}>
            <p className="fridge-upload__title">Load sample fridge</p>
            <p className="fridge-upload__hint">Uses saved ingredients. No AI call.</p>
          </button>
        )}
      </FridgeIllustration>

      {error && <p className="fridge-panel__error">{error}</p>}

      {hasIngredients && !isAnalyzing && (
        <>
          <p className="fridge-panel__count">
            {ingredientCount} {ingredientCount === 1 ? 'ingredient' : 'ingredients'}
          </p>
          <button type="button" className="fridge-panel__reupload" onClick={onReset} disabled={isBusy}>
            {mode === 'live' ? 'Upload another photo' : 'Clear fridge'}
          </button>
        </>
      )}

      <div className="fridge-panel__actions">
        <button
          type="button"
          className="btn btn--generate"
          disabled={!hasIngredients || isBusy}
          onClick={onGenerateRecipes}
        >
          Generate Recipes
        </button>
      </div>
    </section>
  )
}
