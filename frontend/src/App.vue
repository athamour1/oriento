<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { usePwaInstall } from 'src/composables/usePwaInstall'

const $q = useQuasar()
const { setPrompt, clearPrompt, autoPromptSuppressed, promptInstall, dismissAutoPrompt } = usePwaInstall()

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    setPrompt(e)
    
    if (autoPromptSuppressed.value) return

    $q.notify({
      color: 'primary',
      icon: 'get_app',
      message: 'Εγκαταστήστε την εφαρμογή / Install the Oriento App for the best experience!',
      timeout: 0,
      position: 'bottom',
      actions: [
        { 
          label: 'Install', 
          color: 'white', 
          handler: () => promptInstall()
        },
        { 
          label: 'Dismiss', 
          color: 'grey-4', 
          handler: () => dismissAutoPrompt()
        }
      ]
    })
  })

  window.addEventListener('appinstalled', clearPrompt)
})
</script>
