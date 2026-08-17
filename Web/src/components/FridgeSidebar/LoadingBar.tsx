type LoadingBarProps = {
  label?: string
}

export function LoadingBar({ label = 'Analyzing fridge…' }: LoadingBarProps) {
  return (
    <div className="loading-panel" role="status" aria-live="polite">
      <p className="loading-panel__label">{label}</p>
      <div className="loading-bar" aria-hidden="true">
        <span className="loading-bar__fill" />
      </div>
    </div>
  )
}
