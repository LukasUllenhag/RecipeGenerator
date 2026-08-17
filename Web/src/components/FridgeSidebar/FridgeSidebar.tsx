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
  onGenerateRecipes,
  onReset,
}: FridgeSidebarProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const ingredientCount = ingredients.length
  const hasIngredients = ingredientCount > 0
  const isBusy = isAnalyzing || isGenerating

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus()
    }
  }, [isAdding])

  useEffect(() => {
    if (isAdding) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
    }
  }, [ingredientCount, isAdding])

  function handleAddSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextIngredient = draft.trim()
    if (!nextIngredient) {
      return
    }
    onAddIngredient(nextIngredient)
    setDraft('')
    inputRef.current?.focus()
  }

  function handleCancelAdd() {
    setIsAdding(false)
    setDraft('')
  }

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
              />
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
        {isAdding ? (
          <form className="add-ingredient" onSubmit={handleAddSubmit}>
            <input
              ref={inputRef}
              className="add-ingredient__input"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="e.g. 2 tomatoes"
              aria-label="New ingredient"
              disabled={isBusy}
            />
            <button type="submit" className="btn btn--add" disabled={isBusy || !draft.trim()}>
              Add
            </button>
            <button type="button" className="btn btn--generate" onClick={handleCancelAdd} disabled={isBusy}>
              Cancel
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="btn btn--add"
            disabled={isBusy}
            onClick={() => setIsAdding(true)}
          >
            + Add ingredient
          </button>
        )}
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
