export const GGB_MEDIA_TYPE = "application/vnd.geogebra.file"

const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04]

/** True when the bytes start like a zip archive, which every .ggb file is. */
export function isGgbArchive(bytes: Uint8Array): boolean {
  return bytes.length > ZIP_MAGIC.length && ZIP_MAGIC.every((value, index) => bytes[index] === value)
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000))
  }
  return btoa(binary)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index)
  return bytes
}

export const ggbDataUrl = (base64: string) => `data:${GGB_MEDIA_TYPE};base64,${base64}`

/** The base64 payload of a data URL, or undefined for any other source (a file URL or "ggbid:" material). */
export function dataUrlPayload(src: string | undefined): string | undefined {
  return src?.startsWith("data:") ? src.split(",").at(-1) : undefined
}
