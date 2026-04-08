import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamEventStore = defineStore('teamEvent', () => {
  const allDone = ref(false)
  const startTime = ref(null) // ISO string or null
  const endTime = ref(null)   // ISO string or null
  return { allDone, startTime, endTime }
})
