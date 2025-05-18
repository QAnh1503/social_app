import { SafeAreaView, StyleSheet } from "react-native";

import { View, Platform, Text } from 'react-native';
import ProfileHeaderFollow from "./ProfileHeaderFollow";
import ProfileDetailsFollow from "./ProfileDetailsFollow";
import ProfilePostFollow from "./ProfilePostFollow";
// import ProfileHeader from "../../components/profile/ProfileHeader";
// import ProfileDetails from "../../components/profile/ProfileDetails";
// import ProfilePost from "../../components/profile/ProfilePost";
// import { useUser } from "../UserContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function UserProfileFollow() {
 
  //const { email, idUser } = useUser();
//   console.log("User email in UserProfile:", email);
//   console.log("User ID in UserProfile:", idUser);
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