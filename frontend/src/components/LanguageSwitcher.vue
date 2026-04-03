<template>
  <q-btn-dropdown flat :label="currentLabel" no-caps>
    <q-list>
      <q-item clickable v-close-popup @click="switchLanguage('en-US')" :active="$i18n.locale === 'en-US'">
        <q-item-section>
          <q-item-label>{{ $t('english') }}</q-item-label>
        </q-item-section>
      </q-item>
      
      <q-item clickable v-close-popup @click="switchLanguage('el')" :active="$i18n.locale === 'el'">
        <q-item-section>
          <q-item-label>{{ $t('greek') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Display the selected language label natively securely
const currentLabel = computed(() => {
  return locale.value === 'el' ? t('greek') : t('english')
})

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('appLang', lang)
}
</script>
