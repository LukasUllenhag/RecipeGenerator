import { FridgeSidebar } from './components/FridgeSidebar/FridgeSidebar'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">Recipe Generator</h1>
      </header>

      <FridgeSidebar />

      <main className="recipes" aria-label="Recipes">
        {/* Recipe grid will go here */}
      </main>
    </div>
  )
}

export default App
