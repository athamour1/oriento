import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamEventStore = defineStore('teamEvent', () => {
  const allDone = ref(false)
  return { allDone }
})
