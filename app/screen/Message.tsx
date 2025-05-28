import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/images/chats/back.svg';
import VideoCallIcon from '../../assets/images/chats/videoCall.svg';
import MessageItem, { MessageItemType } from '../components/message/MessageItem';
import axios from 'axios';
import { UserProvider, useUser } from './UserContext';
import { getMessages, getOneUserById, getSumaryConversation } from '../nestjs/api';
import { SocketProvider, useSocket } from '../context/SocketContext';
import { MessageStyle } from '../styles/Messages.styles';

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
  const [targetUser, setTargetUser] = useState({ avatar: '', name: '', lastActive: '' });
  const [messageText, setMessageText] = useState('');
  const { socket } = useSocket();
  const scrollViewRef = useRef();

  const { idUser, name } = useUser();
  const targetId = route.params.targetId;
  console.log('target id: ', targetId)

  const fetchGetTargetUser = async () => {
    const user = await getOneUserById({ user: targetId });
    // console.log(user)
    if (user) setTargetUser(user.data);
  }

  const handleSumaryConversation = async () => {
    console.log('umg')
    const conversation: any[] = [];

    messages.forEach((message: any, index) => {
      if (message.senderId != 'sumary') {
        console.log('a')
        conversation.push({
          name: (message.senderId == targetId) ? targetUser.name : name,
          content: message.content
        })
      }
    })

    const response = await getSumaryConversation(conversation)
    setMessages(prevmessages => {
      return (prevmessages.length != 0) ?
        [...prevmessages, { senderId: 'sumary', content: response.data.answer, isRead: false }] :
        [{ senderId: 'sumary', content: response.data.answer, isRead: false }]
    })


  }

  const handleSendMessage = () => {
    console.log('sent message')
    setMessages(prevmessages => {
      return (prevmessages.length != 0) ?
        [...prevmessages, { senderId: idUser, content: messageText, isRead: false }] :
        [{ senderId: idUser, content: messageText, isRead: false }]
    })
    socket?.emit('private_message', { senderId: idUser, receiverId: targetId, message: messageText })

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
    <View style={MessageStyle.container}>
      {/* Header */}
      <View style={MessageStyle.header}>
        <View style={MessageStyle.headerLeft}>
          <TouchableOpacity onPress={handleBackPress}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
          <View style={MessageStyle.userInfo}>
            {targetUser.avatar ? (
              <Image source={{ uri: targetUser.avatar }} style={MessageStyle.avatar} />
            ) : (
              <View style={MessageStyle.placeholderAvatar} />
            )}
            <View>
              <Text style={MessageStyle.userName}>{targetUser.name}</Text>
              <Text style={MessageStyle.activeStatus}>Active {targetUser.lastActive || '11m ago'}</Text>
            </View>
          </View>
        </View>
        <View style={MessageStyle.headerRight}>
          <TouchableOpacity style={MessageStyle.iconButton}>
            <VideoCallIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={MessageStyle.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >


        {messages.map((message: any, index) => {
          console.log(message)
          return (message.senderId === 'sumary') ?
            (<View key={index} style={MessageStyle.messageDate}>
              <Text style={MessageStyle.dateDivider}>{"- - Sumary conversation - -"}</Text>
              <Text style={MessageStyle.dateDivider}>{message.content}</Text>

            </View>) :
            (<MessageItem key={index} text={message.content} isSent={(message.senderId === idUser) ? true : false} timestamp='' />)
        })}
        <View style={{ height: 20, width: 10 }}></View>
      </ScrollView>

      {/* Message Input */}
      <View style={MessageStyle.inputContainer}>
        <TextInput
          style={MessageStyle.input}
          placeholder="Message..."
          placeholderTextColor="#999"
          onChangeText={setMessageText}
          value={messageText}
          multiline
        />
        <View style={MessageStyle.inputActions}>
          <TouchableOpacity
            onPress={handleSendMessage}>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { handleSumaryConversation() }}
          >
            <Text>✨</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

