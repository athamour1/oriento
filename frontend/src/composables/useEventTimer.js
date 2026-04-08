import { ref, computed, onMounted, onUnmounted } from 'vue'

function pad(n) { return String(n).padStart(2, '0') }

function formatDuration(ms) {
  if (ms <= 0) return '00:00:00'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

/**
 * Reactive event countdown/status based on startTime / endTime ISO strings.
 * Returns: { timerLabel, timerColor, timerVisible }
 */
export function useEventTimer(startTime, endTime) {
  const now = ref(Date.now())
  let interval = null

  onMounted(() => { interval = setInterval(() => { now.value = Date.now() }, 1000) })
  onUnmounted(() => clearInterval(interval))

  const timerVisible = computed(() => !!(startTime.value || endTime.value))

  const timerLabel = computed(() => {
    const start = startTime.value ? new Date(startTime.value).getTime() : null
    const end = endTime.value ? new Date(endTime.value).getTime() : null
    const t = now.value

    if (start && t < start) {
      return `Starts in ${formatDuration(start - t)}`
    }
    if (end && t > end) {
      return 'Event Ended'
    }
    if (end) {
      return `Ends in ${formatDuration(end - t)}`
    }
    if (start && t >= start) {
      return 'Event in progress'
    }
    return ''
  })

  const timerColor = computed(() => {
    const start = startTime.value ? new Date(startTime.value).getTime() : null
    const end = endTime.value ? new Date(endTime.value).getTime() : null
    const t = now.value
    if (end && t > end) return 'negative'
    if (start && t < start) return 'warning'
    return 'positive'
  })

  return { timerLabel, timerColor, timerVisible }
}
