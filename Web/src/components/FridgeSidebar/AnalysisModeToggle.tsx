import type { AnalysisMode } from '../../api/analyzeFridge'
import './FridgeSidebar.css'

type AnalysisModeToggleProps = {
  mode: AnalysisMode
  disabled?: boolean
  onChange: (mode: AnalysisMode) => void
}

export function AnalysisModeToggle({ mode, disabled, onChange }: AnalysisModeToggleProps) {
  return (
    <div className="mode-toggle" role="group" aria-label="Fridge analysis mode">
      <button
        type="button"
        className={`mode-toggle__option${mode === 'live' ? ' mode-toggle__option--active' : ''}`}
        aria-pressed={mode === 'live'}
        disabled={disabled}
        onClick={() => onChange('live')}
      >
        Live AI
      </button>
      <button
        type="button"
        className={`mode-toggle__option${mode === 'mock' ? ' mode-toggle__option--active' : ''}`}
        aria-pressed={mode === 'mock'}
        disabled={disabled}
        onClick={() => onChange('mock')}
      >
        Sample
      </button>
    </div>
  )
}
