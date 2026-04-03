import { ref } from 'vue'

const deferredPrompt = ref(null)
// We track if we CAN install it to show the header button
const isInstallable = ref(false)
// We track if we SHOULD auto-prompt
const autoPromptSuppressed = ref(localStorage.getItem('pwaPromptDismissed') === 'true')

export function usePwaInstall() {
  const promptInstall = async () => {
    if (!deferredPrompt.value) return
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome !== 'accepted') {
        dismissAutoPrompt()
    }
    deferredPrompt.value = null
    isInstallable.value = false
  }

  const dismissAutoPrompt = () => {
    localStorage.setItem('pwaPromptDismissed', 'true')
    autoPromptSuppressed.value = true
  }

  const setPrompt = (e) => {
    deferredPrompt.value = e
    isInstallable.value = true
  }

  const clearPrompt = () => {
    deferredPrompt.value = null
    isInstallable.value = false
  }

  return {
    isInstallable,
    autoPromptSuppressed,
    promptInstall,
    dismissAutoPrompt,
    setPrompt,
    clearPrompt
  }
}
