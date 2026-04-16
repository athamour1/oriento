import { defineBoot } from '#q-app/wrappers'
import { ref } from 'vue'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    cb({ token: localStorage.getItem('token') })
  },
})

const isConnected = ref(false)

socket.on('connect', () => {
  isConnected.value = true
})

socket.on('disconnect', () => {
  isConnected.value = false
})

socket.on('connect_error', () => {
  isConnected.value = false
})

function connectSocket() {
  if (!socket.connected) {
    socket.connect()
  }
}

function disconnectSocket() {
  socket.disconnect()
}

export default defineBoot(() => {
  // Auto-connect if user already has a token (page reload / returning visit)
  if (localStorage.getItem('token')) {
    connectSocket()
  }
})

export { socket, isConnected, connectSocket, disconnectSocket }
