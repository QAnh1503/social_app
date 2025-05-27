import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CameraIcon from '../../../assets/images/chats/camera.svg'
import { getOneUserById } from '../../nestjs/api';
// import { RootStackParamList } from '../../../App';

export type ChatItemType = {
  id: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  receiverId: string
};

type ChatItemProps = {
  chat: ChatItemType;
};

export default function ChatItem({ lastMessage, receiverId, time, avatar }: ChatItemType) {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [receiver, setReceiver] = useState<any>(null);

  const handlePress = () => {
    console.debug('[ChatItem] navigate to Message with receveiverId = ', receiver)
    navigation.navigate('Message', {targetId: receiverId});
  };

  const fetchReceiverData = async () => {
    const receiver = await getOneUserById({user: receiverId});

    console.debug('[ChatItem] Receiver data: ', receiver.data)
    if (receiver) setReceiver(receiver.data);
  }

  useEffect(() => {
    fetchReceiverData();
  }, [])

  return (
    <TouchableOpacity style={styles.chatItem} onPress={handlePress}>
      <View style={styles.chatAvatar}>
        {receiver ? (
          <Image source={{ uri: receiver.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{(receiver) ? receiver.name : 'Loading'}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
      <TouchableOpacity style={styles.cameraButton}>
        <CameraIcon width={24} height={24} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatAvatar: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  lastMessage: {
    color: '#999',
  },
  cameraButton: {
    padding: 5,
  },
}); 