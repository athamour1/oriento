import { createI18n } from 'vue-i18n'
import enUS from '../i18n/en-US'
import el from '../i18n/el'

const messages = {
  'en-US': enUS,
  'el': el
}

export default async ({ app }) => {
  // Use whatever the admin last saved, defaulting to English
  const defaultLang = localStorage.getItem('appLang') || 'en-US'

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
