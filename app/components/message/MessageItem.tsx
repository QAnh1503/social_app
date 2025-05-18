import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type MessageItemType = {
  id: string;
  text: string;
  isSent: boolean;
  timestamp?: string;
};

type MessageItemProps = {
  message: MessageItemType;
};

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <View style={styles.messageWrapper}>
      <View style={[
        styles.message,
        message.isSent ? styles.sentMessage : styles.receivedMessage
      ]}>
        <Text style={[
          styles.messageText,
          message.isSent ? styles.sentMessageText : styles.receivedMessageText
        ]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    marginVertical: 5,
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 2,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#000',
  },
}); 