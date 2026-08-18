const MAX_EDGE_PX = 1600
const JPEG_QUALITY = 0.72

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file
  }

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      bitmap.close()
      return file
    }

    context.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
    })

    if (!blob) {
      return file
    }

    return new File([blob], replaceExtension(file.name, 'jpg'), {
      type: 'image/jpeg',
    })
  } catch {
    return file
  }
}

function replaceExtension(name: string, extension: string) {
  return name.replace(/\.[^.]+$/, `.${extension}`)
}
