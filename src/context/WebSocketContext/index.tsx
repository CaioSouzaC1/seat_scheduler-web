import io from 'socket.io-client'
import { createContext, ReactNode, useEffect } from "react"
import { getSession } from 'next-auth/react'

interface INotification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  data: object
}

const socket = io(process.env.API_URL as string)

const WebSocketContext = createContext(socket)

interface WebSocketContextProps {
  children: ReactNode
}

export const WebSocketProvider = ({ children }: WebSocketContextProps) => {
  useEffect(() => {


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
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
}
