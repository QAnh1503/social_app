import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../../../App';
import ChatItem from '../../components/chats/ChatItem';
import { DUMMY_CHATS } from '../../data/dummyChat';
import BackIcon from '../../../assets/images/chats/back.svg'
import NewChatIcon from '../../../assets/images/chats/newChat.svg'
import NewVideoCallIcon from '../../../assets/images/chats/videoCall.svg'


export default function Chats() {
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigation: NavigationProp<RootStackParamList> = useNavigation();


  const handleBackPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          {/* <Text>←</Text> */}
          <BackIcon width={24} height={24}/>
          <Text style={styles.nickname}>nickname</Text>
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <NewVideoCallIcon width={24} height={24}/>
            {/* <Text>📹</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
          <NewChatIcon width={24} height={24}/>
            {/* <Text>✏️</Text> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Requests</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView>
        {DUMMY_CHATS.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    color: '#999',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
}); 