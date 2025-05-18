import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import HomeIcon from '../../assets/images/bottomNavigation/home.svg';
import SearchIcon from '../../assets/images/bottomNavigation/search.svg';
import AddIcon from '../../assets/images/bottomNavigation/post.svg';
import NotificationIcon from '../../assets/images/bottomNavigation/notification.svg';
import ProfileIcon from '../../assets/images/bottomNavigation/profile.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type BottomNavigatorProps = {
  currentRoute: keyof RootStackParamList;
};

export default function BottomNavigator({ currentRoute }: BottomNavigatorProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigation = (route: keyof RootStackParamList) => {
    if (route !== currentRoute) {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navButton, currentRoute === 'Home' && styles.activeNavButton]}
        onPress={() => handleNavigation('Home')}
      >
        <HomeIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <AddIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <NotificationIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <ProfileIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navButton: {
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
}); 