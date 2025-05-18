import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';

export default function ForwardChats() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const navigateToChats = navigation.getParent()?.navigate;
      if (navigateToChats) {
        navigateToChats('Chats');
      }
    }
  }, [navigation, isFocused]);

  return <View/>; // Return empty view while redirecting
} 