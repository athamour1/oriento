<template>
  <q-page class="flex flex-center">
    <div class="absolute-top-right q-pa-md z-top">
      <LanguageSwitcher />
    </div>
    <div class="main-card q-pa-xl shadow-up-10 rounded-borders">
      <div class="text-center q-mb-lg">
        <h3 class="text-h4 text-weight-bold tracking-tight branded-title q-my-none">Oriento</h3>
        <p class="text-subtitle1 text-grey-8 opacity-80 current-status q-mt-sm">{{ $t('targetAndNavigate') }}</p>
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          v-model="username"
          outlined
          color="primary"
          :placeholder="$t('teamIdAdmin')"
          lazy-rules
          :rules="[val => val && val.length > 0 || $t('typeUsername')]"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="primary" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          outlined
          color="primary"
          type="password"
          :placeholder="$t('pinPassword')"
          lazy-rules
          :rules="[val => val !== null && val !== '' || $t('typePassword')]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="primary" />
          </template>
        </q-input>

        <div class="q-mt-xl">
          <q-btn class="full-width" color="primary" text-color="white" :label="$t('commenceHunt')" type="submit" size="lg" unelevated no-caps />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from 'components/LanguageSwitcher.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const username = ref('')
const password = ref('')

const onSubmit = async () => {
  try {
    const res = await api.post('/auth/login', { username: username.value, password: password.value })
    localStorage.setItem('token', res.data.access_token)
    if (res.data.role === 'ADMIN') {
      router.push('/admin')
    } else {
      router.push('/team/map')
    }
    $q.notify({
      color: 'positive',
      icon: 'check',
      message: t('loginSuccessful')
    })
  } catch (err) {
    let msg = t('authFailed')
    if (err.response && err.response.data && err.response.data.message) {
      msg = err.response.data.message
    }
    $q.notify({
      color: 'negative',
      icon: 'warning',
      message: msg
    })
  }
}
</script>

<style scoped>
.main-card {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  transition: background-color 0.3s, border-color 0.3s;
}

body.body--light .main-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
}
body.body--dark .main-card {
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

body.body--light .branded-title {
  color: #1A1A2E; 
}
body.body--dark .branded-title {
  color: #ffffff;
}

.opacity-80 {
  opacity: 0.8;
}
</style>
