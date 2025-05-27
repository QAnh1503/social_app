import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../screen/UserContext';

const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WEBSOCKET_URL;

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { idUser } = useUser();

  useEffect(() => {
    console.log('= = = = WEBSOCKET INITILIZATING = = = =')
    console.log('[SocketContext] Initializing socket connection...');
    console.log('[SocketContext] Websocket server address: ', WEBSOCKET_URL);

    const socketInstance = io(WEBSOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      path: '/socket.io',
    });

    socketInstance.on('connect', () => {
      console.log('[SocketContext] Socket connected successfully ✅');
      console.debug('[SocketContext] Socket ID:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('connection_success', (data) => {
      console.log('[SocketContext📡  Server connection success:', data);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('[SocketContext] ❌ Socket connection error:', error.message);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('[SocketContext] ❌ Socket disconnected. Reason:', reason);
      setIsConnected(false);
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log('[SocketContext] 🔄 Socket reconnected after', attemptNumber, 'attempts');
    });

    socketInstance.on('reconnect_error', (error) => {
      console.error('[SocketContext] ❌ Socket reconnection error:', error.message);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('[SocketContext] ❌ Socket reconnection failed after all attempts');
    });

    setSocket(socketInstance);

    console.log('= = = = = = = = = =')

    // Cleanup khi component unmount
    return () => {
      console.log('[SocketContext] Cleaning up socket connection...');
      socketInstance.disconnect();
    };
  }, []);

  // Khi user đăng nhập thành công và có idUser, emit sự kiện user_login
  useEffect(() => {
    if (socket && idUser) {
      console.log('[SocketContext] 👤 Emitting user_login with id:', idUser);
      socket.emit('[SocketContext] user_login', idUser, (response: any) => {
        console.log('[SocketContext] 📬 Server response to user_login:', response);
      });
    }
  }, [socket, idUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}; 