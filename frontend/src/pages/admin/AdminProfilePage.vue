<template>
  <q-page class="q-pa-lg admin-page">
    <div class="text-h5 text-weight-bold tracking-tight q-mb-xl">{{ $t('profileSettings') }}</div>

    <!-- Change Password -->
    <q-card flat bordered class="q-pa-md shadow-2 q-mb-lg">
      <div class="row items-center q-mb-md">
        <q-icon name="lock" color="primary" class="q-mr-sm" />
        <div class="text-subtitle1 text-weight-bold">{{ $t('changePassword') }}</div>
      </div>
      <q-form @submit="savePassword" class="q-gutter-md">
        <q-input
          v-model="pwd.current"
          :label="$t('currentPassword')"
          outlined
          :type="showCurrent ? 'text' : 'password'"
          :error="!!pwdError"
          :error-message="pwdError"
        >
          <template v-slot:append>
            <q-icon :name="showCurrent ? 'visibility_off' : 'visibility'" class="cursor-pointer" color="grey-6" @click="showCurrent = !showCurrent" />
          </template>
        </q-input>
        <q-input
          v-model="pwd.next"
          :label="$t('newPassword')"
          outlined
          :type="showNew ? 'text' : 'password'"
          :rules="[val => val.length >= 4 || $t('passwordTooShort')]"
        >
          <template v-slot:append>
            <q-icon :name="showNew ? 'visibility_off' : 'visibility'" class="cursor-pointer" color="grey-6" @click="showNew = !showNew" />
          </template>
        </q-input>
        <div class="row justify-end">
          <q-btn unelevated :label="$t('saveChanges')" color="primary" type="submit" no-caps />
        </div>
      </q-form>
    </q-card>

    <!-- Language -->
    <q-card flat bordered class="q-pa-md shadow-2">
      <div class="row items-center q-mb-md">
        <q-icon name="translate" color="primary" class="q-mr-sm" />
        <div class="text-subtitle1 text-weight-bold">{{ $t('language') }}</div>
      </div>
      <q-btn-toggle
        v-model="locale"
        no-caps
        unelevated
        toggle-color="primary"
        :options="[
          { label: $t('english'), value: 'en-US' },
          { label: $t('greek'),   value: 'el' },
        ]"
        @update:model-value="onLangChange"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const { t, locale } = useI18n()

const pwd = ref({ current: '', next: '' })
const pwdError = ref('')
const showCurrent = ref(false)
const showNew = ref(false)

const savePassword = async () => {
  pwdError.value = ''
  try {
    await api.put('/auth/profile/password', {
      currentPassword: pwd.value.current,
      newPassword: pwd.value.next,
    })
    pwd.value = { current: '', next: '' }
    $q.notify({ type: 'positive', message: t('passwordChanged'), position: 'top-right', timeout: 2000 })
  } catch (e) {
    if (e.response?.status === 400) {
      pwdError.value = t('currentPasswordWrong')
    } else {
      $q.notify({ type: 'negative', message: t('failedToSaveSettings'), position: 'top-right', timeout: 2500 })
    }
  }
}

const onLangChange = (val) => {
  localStorage.setItem('appLang', val)
}
</script>

<style scoped>
.admin-page { max-width: 600px; margin: 0 auto; }
.tracking-tight { letter-spacing: -0.02em; }
</style>
