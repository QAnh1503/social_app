import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/images/chats/back.svg';
import VideoCallIcon from '../../assets/images/chats/videoCall.svg';
import MessageItem, { MessageItemType } from '../components/message/MessageItem';
import axios from 'axios';
import { useUser } from './UserContext';
import { getAiChat, getLearnMorePost, getMessages, getOneUserById } from '../nestjs/api';
import { SocketProvider, useSocket } from '../context/SocketContext';
import { MessageStyle } from '../styles/Messages.styles';
const AiLogo = require('../../assets/images/aiLogo.png')

type ChatBotProps = {
    route: {
        params: {
            backgroundInfo: string,
            question: string,
        }
    }
};

export default function ChatBot({ route }: ChatBotProps) {
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const scrollViewRef = useRef();
    const { idUser } = useUser();
    const { backgroundInfo, question } = route.params;


    const handleSendMessage = async () => {
        console.log('sent message')
        const history: any[] = [];
        messages.forEach((message: { senderId: string, content: string, isRead: boolean }) => {
            history.push({ role: message.senderId, message: message.content })
        })

        setMessages(prevmessages => {
            return (prevmessages.length != 0) ?
                [...prevmessages, { senderId: 'User', content: messageText, isRead: false }] :
                [{ senderId: 'User', content: messageText, isRead: false }]
        })

        setMessageText('')

        const response = await getAiChat(history, messageText);

        console.log(response.data)
        setMessages(prevmessages => {
            return (prevmessages.length != 0) ?
                [...prevmessages, { senderId: 'AI', content: response.data.answer, isRead: false }] :
                [{ senderId: 'AI', content: response.data.answer, isRead: false }]
        })
    }

    const handleAnswerQuestion = async () => {
        setMessages(prevmessages => {
            return (prevmessages.length != 0) ?
                [...prevmessages, { senderId: 'User', content: question, isRead: false }] :
                [{ senderId: 'User', content: question, isRead: false }]
        })
        const response = await getLearnMorePost(backgroundInfo, question);

        setMessages(prevmessages => {
            return (prevmessages.length != 0) ?
                [...prevmessages, { senderId: 'AI', content: response.data.answer, isRead: false }] :
                [{ senderId: 'AI', content: response.data.answer, isRead: false }]
        })
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        console.log('[ChatBot] backgroundInfo: ', backgroundInfo)
        if (backgroundInfo != '' && question != '') {
            handleAnswerQuestion();
        }
    }, [])

    return (
        <View style={MessageStyle.container}>
            {/* Header */}
            <View style={MessageStyle.header}>
                <View style={MessageStyle.headerLeft}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <BackIcon width={24} height={24} />
                    </TouchableOpacity>
                    <View style={MessageStyle.userInfo}>
                        <Image source={AiLogo} style={MessageStyle.avatar} />
                        <View>
                            <Text style={MessageStyle.userName}>{'QA Bot'}</Text>
                            <Text style={MessageStyle.activeStatus}>Active </Text>
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
                    return (<MessageItem key={index} text={message.content} isSent={(message.senderId === 'User') ? true : false} timestamp='' />)
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
                </View>
            </View>
        </View>
    );
}


