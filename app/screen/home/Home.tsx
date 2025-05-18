// import React from 'react';
// import { StyleSheet, SafeAreaView } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import BottomNavigator from '../../components/BottomNavigator';
// import Following from './tabs/Following';
// import ForYou from './tabs/ForYou';
// import ForwardChats from './tabs/ForwardChats';
// import Header from '../head/Header';
// import DashBoard from '../dashboard/DashBoard';

// const Tab = createMaterialTopTabNavigator();

// export default function Home() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Header/> */}
//       <DashBoard/>
//       <Following/>
//       {/* <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: styles.tabLabel,
//           tabBarStyle: styles.tabBar,
//           tabBarIndicatorStyle: styles.tabIndicator,
//         }}
//       >
//         <Tab.Screen name="Following" component={Following} />
//         <Tab.Screen name="For you" component={ForYou} />
//         <Tab.Screen name="Chats" component={ForwardChats} />
//       </Tab.Navigator>

//       <BottomNavigator currentRoute="Home" /> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   tabBar: {
//     backgroundColor: '#fff',
//     elevation: 0,
//     shadowOpacity: 0,
//     borderBottomWidth: 0,
//   },
//   tabLabel: {
//     textTransform: 'none',
//     fontWeight: '600',
//   },
//   tabIndicator: {
//     backgroundColor: '#000',
//     height: 2,
//   }
// }); 