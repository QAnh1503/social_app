import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../screen/UserContext';

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
    console.log('Initializing socket connection...');
    // Khởi tạo kết nối socket khi component mount
    const socketInstance = io('http://10.0.2.2:3000/chat', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      path: '/socket.io',
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected successfully');
      console.log('Socket ID:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('connection_success', (data) => {
      console.log('📡 Server connection success:', data);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected. Reason:', reason);
      setIsConnected(false);
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
    });

    socketInstance.on('reconnect_error', (error) => {
      console.error('❌ Socket reconnection error:', error.message);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('❌ Socket reconnection failed after all attempts');
    });

    setSocket(socketInstance);

    // Cleanup khi component unmount
    return () => {
      console.log('Cleaning up socket connection...');
      socketInstance.disconnect();
    };
  }, []);

  // Khi user đăng nhập thành công và có idUser, emit sự kiện user_login
  useEffect(() => {
    if (socket && idUser) {
      console.log('👤 Emitting user_login with id:', idUser);
      socket.emit('user_login', idUser, (response: any) => {
        console.log('📬 Server response to user_login:', response);
      });
    }
  }, [socket, idUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}; 