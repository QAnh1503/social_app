import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationHeaderProps {
  activeTab: 'following' | 'you';
  onTabPress?: (tab: 'following' | 'you') => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.headerTabs}>
      <Text
        style={[styles.tabText, activeTab === 'following' && styles.activeTab]}
        onPress={() => onTabPress?.('following')}
      >
        Following
      </Text>
      <Text
        style={[styles.tabText, activeTab === 'you' && styles.activeTab]}
        onPress={() => onTabPress?.('you')}
      >
        You
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    paddingVertical: 15,
  },
  activeTab: {
    color: '#000',
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});

export default NotificationHeader; 