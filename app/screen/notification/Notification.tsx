import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationHeader from '../../components/notification/NotificationHeader';
import NotificationElement from '../../components/notification/NotificationElement';

const Notification = () => {
  const [activeTab, setActiveTab] = useState<'following' | 'you'>('you');

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar Time */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
      </View>

      <NotificationHeader
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <ScrollView style={styles.content}>
        {/* Follow Requests Section */}
        <Text style={styles.sectionTitle}>Follow Requests</Text>

        {/* New Section */}
        <Text style={styles.sectionTitle}>New</Text>
        <NotificationElement
          type="like"
          usernames={['karennne']}
          timeAgo="1h"
          postImage="https://picsum.photos/200/300?landscape"
        />

        {/* Today Section */}
        <Text style={styles.sectionTitle}>Today</Text>
        <NotificationElement
          type="multiple_like"
          usernames={['kiero_d', 'zackjohn']}
          othersCount={26}
          timeAgo="3h"
          postImage="https://picsum.photos/200/300?landscape"
        />

        {/* This Week Section */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <NotificationElement
          type="comment"
          usernames={['craig_love']}
          timeAgo="2d"
          commentText="@jacob_w exactly.."
          postImage="https://picsum.photos/200/300?night"
          onActionPress={() => {}}
        />

        {/* Follow notifications */}
        <NotificationElement
          type="follow"
          usernames={['martini_rond']}
          timeAgo="3d"
          onActionPress={() => {}}
        />
        <NotificationElement
          type="follow"
          usernames={['maxjacobson']}
          timeAgo="3d"
          onActionPress={() => {}}
        />
        <NotificationElement
          type="follow"
          usernames={['mis_potter']}
          timeAgo="3d"
          onActionPress={() => {}}
        />

        <Text style={styles.sectionTitle}>This Month</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default Notification;