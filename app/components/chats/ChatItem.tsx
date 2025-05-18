import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CameraIcon from '../../../assets/images/chats/camera.svg'
// import { RootStackParamList } from '../../../App';

export type ChatItemType = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
};

type ChatItemProps = {
  chat: ChatItemType;
};

export default function ChatItem({ chat }: ChatItemProps) {
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();


  const handlePress = () => {
    navigation.navigate('Message', { chat });
  };

  return (
    <TouchableOpacity style={styles.chatItem} onPress={handlePress}>
      <View style={styles.chatAvatar}>
        {chat.avatar ? (
          <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
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