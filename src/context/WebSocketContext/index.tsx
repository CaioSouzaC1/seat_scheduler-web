import io from 'socket.io-client'
import { createContext, useEffect } from "react"
import { getSession } from 'next-auth/react'

interface INotification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  data: object
}

const WebSocketContext = createContext(undefined)

export const WebSocketProvider = () => {
  useEffect(() => {
    const socket = io(process.env.API_URL as string)

    const connectionSocket = async () => {
      try {
        const session = await getSession()

        socket.on('connect', () => {
          console.log('Connected to server')
        })
        socket.on(`notify.${session!.user.id}`, (e: INotification) => {
          console.log(e)
        })
      } catch (error) {
        console.error(error)
      }
    }

    connectionSocket()

    return () => {
      socket.disconnect()
    }

  }, [])

  return (
    <WebSocketContext.Provider value={undefined}>
    </WebSocketContext.Provider>
  )
}
