import { useState } from 'react'
import { FridgeSidebar } from './components/FridgeSidebar/FridgeSidebar'
import { RecipeList } from './components/RecipeList/RecipeList'
import {
  analyzeFridge,
  generateRecipes,
  type AnalysisMode,
  type Recipe,
} from './api/analyzeFridge'
import './App.css'

const MODE_STORAGE_KEY = 'fridge-analysis-mode'

function readStoredMode(): AnalysisMode {
  try {
    return localStorage.getItem(MODE_STORAGE_KEY) === 'live' ? 'live' : 'mock'
  } catch {
    return 'mock'
  }
}

function App() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<AnalysisMode>(readStoredMode)

  function handleModeChange(nextMode: AnalysisMode) {
    setMode(nextMode)
    try {
      localStorage.setItem(MODE_STORAGE_KEY, nextMode)
    } catch {
      // Ignore storage failures in private browsing.
    }
  }

  async function loadFridge(nextMode: AnalysisMode, image?: File) {
    setIsAnalyzing(true)
    setError(null)
    setIngredients([])
    setRecipes([])

    try {
      const analysis = await analyzeFridge(nextMode, image)
      setIngredients(analysis.ingredients)
    } catch {
      setError(
        nextMode === 'live'
          ? 'Could not analyze the fridge photo. Is the backend running?'
          : 'Could not load the sample fridge. Is the backend running?',
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  async function handleGenerateRecipes() {
    setIsGenerating(true)
    setError(null)
    setRecipes([])

    try {
      const result = await generateRecipes(ingredients)
      setRecipes(result.recipes)
    } catch {
      setError('Could not generate recipes. Is the backend running?')
    } finally {
      setIsGenerating(false)
    }
  }

  function handleReset() {
    setIngredients([])
    setRecipes([])
    setError(null)
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">Recipe Generator</h1>
      </header>

      <FridgeSidebar
        ingredients={ingredients}
        isAnalyzing={isAnalyzing}
        isGenerating={isGenerating}
        error={error}
        mode={mode}
        onModeChange={handleModeChange}
        onFileSelected={(file) => loadFridge('live', file)}
        onLoadSample={() => loadFridge('mock')}
        onGenerateRecipes={handleGenerateRecipes}
        onReset={handleReset}
      />

      <main className="recipes" aria-label="Recipes">
        {isGenerating ? (
          <p className="recipes__status">Generating recipes…</p>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </main>
    </div>
  )
}

export default App
