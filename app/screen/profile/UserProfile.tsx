import { SafeAreaView, StyleSheet } from "react-native";

import { View, Platform, Text } from 'react-native';
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileDetails from "../../components/profile/ProfileDetails";
import ProfilePost from "../../components/profile/ProfilePost";
import { useUser } from "../UserContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfileMain() {
 
  const { email, idUser } = useUser();
  console.log("User email in UserProfile:", email);
  console.log("User ID in UserProfile:", idUser);
  console.log("user profile");


  return (
    <View>
      <ProfileHeader/>
      <ProfileDetails/>
      <ProfilePost/>
    </View>
  );
}


export default ProfileMain;