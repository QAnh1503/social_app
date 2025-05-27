import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image } from 'react-native';
// import { useUser } from "../../screen/UserContext";
// import { getOneUserById, loginUser, updateAvatar } from "../../nestjs/api";
import { useCallback, useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getAllFollowersWithIdUser, getAllFollowingWithIdUser, getAllPostWithIdUser, getOneUserById } from "../../../nestjs/api";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfileDetailsSearch() {
        const navigation: NavigationProp<RootStackParamList> = useNavigation();
        const route: RouteProp<RootStackParamList, "UserProfileSearch"> = useRoute();

        console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
        //const selectedItem = route.params;
        const selectedItem = route.params.user;

        // =============== NUM OF FOLLOWERS, FOLLOWING, POSTS ===================
        const [numFollowers, setNumFollower]= useState(0);
        const [numFollowing, setNumFollowing]= useState(0);
        useEffect(() => {
                const fetchNumFollow = async () => {
                    try {
                        const response1 = await getAllFollowersWithIdUser({user: selectedItem._id});
                        const response2 = await getAllFollowingWithIdUser({user: selectedItem._id});
        
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
                            const response = await getAllPostWithIdUser({user: selectedItem._id});
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
                            source={ {uri: selectedItem.avatar}}
                        />
                        {/* <Text style= {{ position:"absolute", end: 0, bottom: 0, width: 35, height: 35, borderRadius: 70, borderWidth: 5, borderColor: "#eee", backgroundColor: "#f08080", textAlign: "center", color: "#fff0f5", fontSize: 18, }}>+</Text> */}
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
                {selectedItem.name}
            </Text>
            <Text style= {{color: 'black'}}>React Native</Text>
            <Text style= {{color: 'black'}}>Nest Js</Text>
            <Text style= {{color: 'black', fontSize: 16, fontWeight: '500'}}>See translation</Text>

            <View style= {{flexDirection: 'row', marginTop: 13,justifyContent: 'space-between'}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Message", {targetId: selectedItem._id})}
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


export default ProfileDetailsSearch;