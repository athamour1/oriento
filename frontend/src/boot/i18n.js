import { createI18n } from 'vue-i18n'
import enUS from '../i18n/en-US'
import el from '../i18n/el'
import { api } from './axios'

const messages = {
  'en-US': enUS,
  'el': el
}

export default async ({ app }) => {
  // First, check local storage
  let defaultLang = localStorage.getItem('appLang')
  
  if (!defaultLang) {
    // If none established, fetch default from backend
    try {
      const res = await api.get('/config')
      defaultLang = res.data.defaultLanguage
    } catch {
      defaultLang = 'en-US'
    }
  }

  // Create I18n instance
  const i18n = createI18n({
    locale: defaultLang,
    legacy: false, 
    globalInjection: true,
    messages
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}
