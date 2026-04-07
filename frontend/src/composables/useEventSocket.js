import { onUnmounted, ref } from 'vue'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Connect to the WebSocket gateway and join a specific event room.
 * Returns { socket, isConnected } so callers can react to connection state.
 *
 * Usage:
 *   const { socket, isConnected } = useEventSocket(eventId)
 *   socket.on('scan:created', handler)
 */
export function useEventSocket(eventId) {
  const isConnected = ref(false)

  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: { token: localStorage.getItem('token') },
  })

  socket.on('connect', () => {
    isConnected.value = true
    socket.emit('join', Number(eventId))
  })

  socket.on('disconnect', () => {
    isConnected.value = false
  })

  socket.on('connect_error', () => {
    isConnected.value = false
  })

  onUnmounted(() => {
    socket.emit('leave', Number(eventId))
    socket.disconnect()
  })

  return { socket, isConnected }
}
