import { useRef, useState } from 'react'
import './FridgeSidebar.css'

type FridgeUploadProps = {
  onFileSelected: (file: File) => void
}

export function FridgeUpload({ onFileSelected }: FridgeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (file?.type.startsWith('image/')) {
      onFileSelected(file)
    }
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div
      className={`fridge-upload${isDragging ? ' fridge-upload--dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          inputRef.current?.click()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Upload a photo of your fridge"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="fridge-upload__input"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <div className="fridge-upload__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
          <path d="M16 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <p className="fridge-upload__hint">
        Drag &amp; drop an image here, or <span className="fridge-upload__link">browse files</span>
      </p>
    </div>
  )
}
