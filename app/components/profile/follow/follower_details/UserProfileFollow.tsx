import { SafeAreaView, StyleSheet } from "react-native";

import { View, Platform, Text } from 'react-native';
import ProfileHeaderFollow from "./ProfileHeaderFollow";
import ProfileDetailsFollow from "./ProfileDetailsFollow";
import ProfilePostFollow from "./ProfilePostFollow";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function UserProfileFollow() {
 
  console.log("user profile follow");


  return (
    <View style= {{flex: 1, backgroundColor: "#fff"}}>
      <ProfileHeaderFollow/>
      <ProfileDetailsFollow/>
      <ProfilePostFollow/>
    </View>
  );
}


export default UserProfileFollow;