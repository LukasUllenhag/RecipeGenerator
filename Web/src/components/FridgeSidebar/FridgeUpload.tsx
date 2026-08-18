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
        <svg viewBox="0 0 100 78" fill="none">
          <rect x="18" y="12" width="11" height="8" rx="2" fill="#1a1a1a" />
          <path d="M38 22 42.5 8h15L62 22H38Z" fill="#1a1a1a" />
          <rect x="45" y="11" width="10" height="5" rx="1.2" fill="#fff" />
          <rect x="8" y="22" width="84" height="50" rx="7" fill="#1a1a1a" />
          <path d="M14 30h72M14 64h72" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="20" cy="37" r="1.35" fill="#fff" />
          <circle cx="26.5" cy="37" r="1.35" fill="#fff" />
          <rect x="72" y="43" width="11" height="3.6" rx="1.2" fill="#fff" />
          <circle cx="50" cy="47" r="16" fill="#1a1a1a" />
          <circle cx="50" cy="47" r="12.5" fill="#1a1a1a" stroke="#fff" strokeWidth="2.2" />
          <circle cx="45.5" cy="43" r="2.15" fill="#fff" />
          <circle cx="54.5" cy="51.5" r="1.1" fill="#fff" />
        </svg>
      </div>

      <p className="fridge-upload__hint">
        Drag &amp; drop an image here, or <span className="fridge-upload__link">browse files</span>
      </p>
    </div>
  )
}
