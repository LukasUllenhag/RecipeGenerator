import { useEffect, useRef, useState } from 'react'
import './FridgeSidebar.css'

type IngredientItemProps = {
  name: string
  disabled?: boolean
  onSave: (next: string) => void
}

export function IngredientItem({ name, disabled, onSave }: IngredientItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setDraft(name)
    }
  }, [name, isEditing])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing() {
    if (disabled) {
      return
    }
    setDraft(name)
    setIsEditing(true)
  }

  function commit() {
    const next = draft.trim()
    if (next && next !== name) {
      onSave(next)
    } else {
      setDraft(name)
    }
    setIsEditing(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setDraft(name)
      setIsEditing(false)
    }
  }

  return (
    <li className={`fridge-ingredient-item${isEditing ? ' fridge-ingredient-item--editing' : ''}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          className="fridge-ingredient-item__input"
          type="text"
          value={draft}
          aria-label="Edit ingredient"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <span className="fridge-ingredient-item__label">{name}</span>
          <button
            type="button"
            className="fridge-ingredient-item__edit"
            aria-label={`Edit ${name}`}
            disabled={disabled}
            onClick={startEditing}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M13.2 3.6 16.4 6.8 7.5 15.7H4.3v-3.2L13.2 3.6Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M11.6 5.2 14.8 8.4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </>
      )}
    </li>
  )
}
