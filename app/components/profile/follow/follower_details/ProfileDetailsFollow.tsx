import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image } from 'react-native';
import { useCallback, useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getAllFollowersWithIdUser, getAllFollowingWithIdUser, getAllPostWithIdUser, getOneUserById } from "../../../../nestjs/api";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfileDetailsFollow() {
    
    // ============================= IMAGE =============================
   
    // ----------- INFORMATION OF EACH POST -------------------
        const navigation: NavigationProp<RootStackParamList> = useNavigation();
        const route: RouteProp<RootStackParamList, "UserProfileFollow"> = useRoute();
    
        console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
        console.log(route.params.item)
        const selectedItem = route.params.item;
    
        console.log("ID FOLLOWER: " + selectedItem.idFollower);
        console.log("ID USER FOLLOWER: " + selectedItem.idUserFollower);
        console.log("DESCRIPTION: " + selectedItem.nameFollower);
        console.log("AVATAR FOLLOWER: " + selectedItem.avatarFollower);
       

        // ================ NUM FOLLOWER, FOLLOWING, POSTS =====================
        const [numFollowers, setNumFollower]= useState(0);
        const [numFollowing, setNumFollowing]= useState(0);
        useEffect(() => {
                const fetchNumFollow = async () => {
                    try {
                        const response1 = await getAllFollowersWithIdUser({user: selectedItem.idUserFollower});
                        const response2 = await getAllFollowingWithIdUser({user: selectedItem.idUserFollower});
        
                        setNumFollower(response1.data.length);
                        setNumFollowing(response2.data.length);
                        } catch (error) {
                            console.error("Failed to fetch followers:", error);
                        }
                    };
                    fetchNumFollow();
            }, []);
            const [numPosts, setNumPosts] = useState(0);
                useEffect(() => {
                    const fetchNumPosts = async () => {
                        try {
                            const response = await getAllPostWithIdUser({user: selectedItem.idUserFollower});
                            setNumPosts(response.data.length); 
                        } catch (error) {
                            console.error("Failed to fetch posts:", error);
                        }
                    };
            
                fetchNumPosts();
        }, []);

        
    return (
        <View style={{ paddingHorizontal: 15 , paddingTop: 20, backgroundColor: '#fff',}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style= {{position: "relative"}}>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 107, width: 107, borderRadius: 50 }}
                            source={ {uri: selectedItem.avatarFollower}}
                        />
                        <Text style= {{ position:"absolute", end: 0, bottom: 0, width: 35, height: 35, borderRadius: 70, borderWidth: 5, borderColor: "#eee", backgroundColor: "#f08080", textAlign: "center", color: "#fff0f5", fontSize: 18, }}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>
                        {/* {posts} */}
                        {numPosts}
                    </Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Posts</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Followers")}
                    style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>
                        {/* {followers} */}
                        {numFollowers}
                    </Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>
                        {/* {following} */}
                        {numFollowing}
                    </Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Following</Text>
                </TouchableOpacity>
            </View>
            <Text style= {{fontSize: 18, color: 'black', fontWeight: '500', marginTop: 10}}>
                {/* {name} */}
                {selectedItem.nameFollower}
            </Text>
            <Text style= {{color: 'black'}}>React Native</Text>
            <Text style= {{color: 'black'}}>Insta Clone</Text>
            <Text style= {{color: 'black', fontSize: 16, fontWeight: '500'}}>See translation</Text>

            <View style= {{flexDirection: 'row', marginTop: 13,justifyContent: 'space-between'}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Message", {targetId: selectedItem.idUserFollower})}
                    style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#B2D8CE',borderRadius: 3, width: 185,paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#E1E1E1',borderRadius: 3, width: 185, paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Share Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ProfileDetailsFollow;