/**
 * Safely plays an audio element
 * @param audioElement The audio element to play
 * @returns A boolean indicating if the audio was successfully played
 */
export const playSound = (audioElement: HTMLAudioElement | null): boolean => {
  if (!audioElement) return false

  // Check if the audio has a valid source
  if (!audioElement.src || audioElement.src === window.location.href) {
    return false
  }

  try {
    audioElement.play().catch((e) => {
      console.warn("Error playing audio:", e)
      return false
    })
    return true
  } catch (e) {
    console.warn("Error playing audio:", e)
    return false
  }
}

/**
 * Safely pauses an audio element
 * @param audioElement The audio element to pause
 */
export const pauseSound = (audioElement: HTMLAudioElement | null): void => {
  if (!audioElement) return

  try {
    audioElement.pause()
    audioElement.currentTime = 0
  } catch (e) {
    console.warn("Error pausing audio:", e)
  }
}
