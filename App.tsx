import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'react-native';
import Login from './app/screen/Login';
import Chats from './app/screen/chats/Chats';
import Message from './app/screen/Message';
import { ChatItemType } from './app/components/chats/ChatItem';
import StackNavigation from './app/components/navigator/StackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './FirebaseConfig';
import Register from './app/screen/Register';
import { UserProvider } from './app/screen/UserContext';
import { SocketProvider } from './app/context/SocketContext';

export type RootStackParamList = {
  Dashboard: undefined
  //Dashboard: { email: string }; // <-- thêm email
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Example: undefined;
  Chats: undefined;
  Message: {
    chat: {
      name: string;
      avatar?: string;
      lastActive?: string;
    }
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <UserProfile/> */}
      {/* <DashBoard/> */}


      <UserProvider>
        <SocketProvider>
          <StackNavigation/>
        </SocketProvider>
      </UserProvider>
      
      {/* <Register/> */}
     </SafeAreaView>
  );
}

registerRootComponent(App);
export default App;
