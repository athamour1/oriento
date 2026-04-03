import { defineBoot } from '#q-app/wrappers'
import { Dark } from 'quasar'

export default defineBoot(() => {
  // Restore preference from localStorage on every app load
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    Dark.set(saved === 'true')
  } else {
    // Default: follow OS preference
    Dark.set('auto')
  }
})
