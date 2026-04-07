import { onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Connect to the WebSocket gateway and join a specific event room.
 * Returns the socket so callers can add their own listeners.
 *
 * Usage:
 *   const socket = useEventSocket(eventId)
 *   socket.on('scan:created', handler)
 *   socket.on('location:updated', handler)
 */
export function useEventSocket(eventId) {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: { token: localStorage.getItem('token') },
  })

  socket.on('connect', () => {
    socket.emit('join', Number(eventId))
  })

  onUnmounted(() => {
    socket.emit('leave', Number(eventId))
    socket.disconnect()
  })

  return socket
}
