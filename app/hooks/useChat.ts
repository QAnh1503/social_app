import { useEffect, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { useUser } from '../screen/UserContext';

export const useChat = () => {
  const { socket, isConnected } = useSocket();
  const { idUser } = useUser();

  // Gửi tin nhắn private
  const sendPrivateMessage = useCallback((receiverId: string, message: string) => {
    if (socket && idUser) {
      socket.emit('private_message', {
        senderId: idUser,
        receiverId,
        message,
      });
    }
  }, [socket, idUser]);

  // Lắng nghe tin nhắn đến
  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (data: any) => {
      console.log('New private message:', data);
      // Xử lý tin nhắn đến ở đây
    };

    const handleMessageSent = (data: any) => {
      console.log('Message sent successfully:', data);
      // Xử lý xác nhận tin nhắn đã gửi
    };

    const handleMessageError = (data: any) => {
      console.log('Message error:', data);
      // Xử lý lỗi khi gửi tin nhắn
    };

    const handleUserStatusChange = (data: any) => {
      console.log('User status changed:', data);
      // Xử lý thay đổi trạng thái người dùng
    };

    socket.on('private_message', handlePrivateMessage);
    socket.on('message_sent', handleMessageSent);
    socket.on('message_error', handleMessageError);
    socket.on('user_status_change', handleUserStatusChange);

    return () => {
      socket.off('private_message', handlePrivateMessage);
      socket.off('message_sent', handleMessageSent);
      socket.off('message_error', handleMessageError);
      socket.off('user_status_change', handleUserStatusChange);
    };
  }, [socket]);

  return {
    isConnected,
    sendPrivateMessage,
  };
}; 