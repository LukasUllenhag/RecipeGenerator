import { FridgeIllustration } from './FridgeIllustration'
import { FridgeUpload } from './FridgeUpload'
import { LoadingBar } from './LoadingBar'
import { AnalysisModeToggle } from './AnalysisModeToggle'
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
  onGenerateRecipes,
  onReset,
}: FridgeSidebarProps) {
  const ingredientCount = ingredients.length
  const hasIngredients = ingredientCount > 0
  const isBusy = isAnalyzing || isGenerating

  return (
    <section className="fridge-panel" aria-label="Your fridge">
      <h2 className="fridge-panel__title">Your Fridge</h2>
      <AnalysisModeToggle mode={mode} disabled={isBusy} onChange={onModeChange} />

      <FridgeIllustration>
        {isAnalyzing ? (
          <LoadingBar label={mode === 'live' ? 'Analyzing fridge…' : 'Loading sample…'} />
        ) : hasIngredients ? (
          <ul className="fridge-ingredient-list" aria-label="Ingredients in your fridge">
            {ingredients.map((name, index) => (
              <li key={`${index}-${name}`} className="fridge-ingredient-item">
                {name}
              </li>
            ))}
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
        <button type="button" className="btn btn--add" disabled={!hasIngredients || isBusy}>
          + Add ingredient
        </button>
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
