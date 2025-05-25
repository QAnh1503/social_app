import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/images/chats/back.svg';
import VideoCallIcon from '../../assets/images/chats/videoCall.svg';
import MessageItem, { MessageItemType } from '../components/message/MessageItem';
import axios from 'axios';
import { useUser } from './UserContext';
import { getMessages, getOneUserById } from '../nestjs/api';
import { SocketProvider, useSocket } from '../context/SocketContext';
const DUMMY_MESSAGES: MessageItemType[] = [
  {
    id: '1',
    text: 'This is the main chat template',
    isSent: true,
    timestamp: 'Nov 30, 2023, 9:41 AM'
  },
  {
    id: '2',
    text: 'Oh?',
    isSent: false,
  },
  {
    id: '3',
    text: 'Cool',
    isSent: false,
  },
  {
    id: '4',
    text: 'How does it work?',
    isSent: false,
  },
  {
    id: '5',
    text: 'You just edit any text to type in the conversation you want to show, and delete any bubbles you don\'t want to use',
    isSent: true,
  },
  {
    id: '6',
    text: 'Boom!',
    isSent: true,
  },
  {
    id: '7',
    text: 'Hmmm',
    isSent: false,
  },
  {
    id: '8',
    text: 'I think I get it',
    isSent: false,
  },
  {
    id: '9',
    text: 'Will head to the Help Center if I have more questions tho',
    isSent: false,
  },
];

type MessageProps = {
  route: {
    params: {
      targetId: string
    }
  }
};

export default function Message({ route }: MessageProps) {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState({avatar: '', name: '', lastActive: ''});
  const [messageText, setMessageText] = useState('');
  const { socket } = useSocket();
  
  const { idUser } = useUser();
  const targetId = route.params.targetId;
  console.log('target id: ', targetId)

  const fetchGetTargetUser = async () => {
    const user = await getOneUserById({idUser: targetId});
    // console.log(user)
    if(user) setTargetUser(user.data);
  }

  const handleSendMessage = () => {
    console.log('sent message')
    setMessages(prevmessages => {
      return (prevmessages.length != 0) ?
      [...prevmessages, {_id: idUser, content: messageText, isRead: false}] :
      [{_id: idUser, content: messageText, isRead: false}]
    })
    socket?.emit('private_message', {senderId: idUser, receiverId: targetId, message: messageText})

    setMessageText('')
  }

  const handleGetMessage = async () => {
    socket?.on('private_message', async (response) => {
        await handleGetMessage();
    })
    const response = await getMessages(idUser, targetId)
    setMessages(response.data);
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchGetTargetUser();
    handleGetMessage();
  }, [])

  useEffect(() => {
    console.log(targetUser)
  }, [targetUser])
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBackPress}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            {targetUser.avatar ? (
              <Image source={{ uri: targetUser.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderAvatar} />
            )}
            <View>
              <Text style={styles.userName}>{targetUser.name}</Text>
              <Text style={styles.activeStatus}>Active {targetUser.lastActive || '11m ago'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <VideoCallIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer}>
        <View style={styles.messageDate}>
          <Text style={styles.dateDivider}>Nov 30, 2023, 9:41 AM</Text>
        </View>
        
        {/* {DUMMY_MESSAGES.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))} */}

        {messages.map((message: any, index) => {
          console.log(message)
          return (<MessageItem key={index} text={message.content}  isSent={(message.senderId == idUser) ? true : false} timestamp='' />)
        })}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor="#999"
          onChangeText={setMessageText}
          value={messageText}
          multiline
        />
        <View style={styles.inputActions}>
          <TouchableOpacity
          onPress={handleSendMessage}>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>😊</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>🖼️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeStatus: {
    fontSize: 12,
    color: '#666',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageDate: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateDivider: {
    color: '#666',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  inputActions: {
    flexDirection: 'row',
    gap: 15,
  },
}); 