import { SafeAreaView, StyleSheet } from "react-native";

import { View, Platform, Text } from 'react-native';
import ProfileHeaderSearch from "./ProfileHeaderSearch";
import ProfileDetailsSearch from "./ProfileDetailsSearch";
import ProfilePostSearch from "./ProfilePostSearch";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function UserProfileSearch({route}) {
 
 
  console.log("user profile search");
  const user = route.params.user;
  console.log('profile search', user._id)


  return (
    <View style= {{flex: 1, backgroundColor: "#fff"}}>
      <ProfileHeaderSearch/>
      <ProfileDetailsSearch profile={user}/>
      <ProfilePostSearch/>
    </View>
  );
}


export default UserProfileSearch;