import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image } from 'react-native';
// import { useUser } from "../../screen/UserContext";
// import { getOneUserById, loginUser, updateAvatar } from "../../nestjs/api";
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
    

    // const { idUser } = useUser();
    // console.log("User ID: ", idUser);
    // const { avatar } = useUser();
    // console.log("User Avatar: ", avatar);
    // const { name } = useUser();
    // console.log("User Name: ", name);
    // const { following } = useUser();
    // console.log("User Following: ", following);
    // const { followers } = useUser();
    // console.log("User Fllowers: ", followers);
    // const { posts } = useUser();
    // console.log("User Posts: ", posts);

    // const [avtUser, setAvtUser] = useState(avatar);
    // const avatarUser = async () => {
    //     try {
    //         const storyResponse = await getOneUserById({ idUser: idUser });
    //         const user = storyResponse.data;
    //         const avtUserr= user.avatar;
    //         console.log("✅ AVATAR USER: ", avtUserr);
    //         setAvtUser(avtUserr);
    
    //     } catch (err) {
    //         console.error("Lỗi khi lấy stories:", err);
    //     }
    // }
    // useFocusEffect(
    // useCallback(() => {
    //     const fetchUserAvatar = async () => {
    //     try {
    //         const res = await getOneUserById({ idUser });
    //         const avt = res.data.avatar;
    //         console.log("✅ Updated avatar:", avt);
    //         setAvtUser(avt); // cập nhật avatar mới từ DB
    //     } catch (err) {
    //         console.error("❌ Lỗi khi lấy avatar:", err);
    //     }
    //     };

    //     fetchUserAvatar();
    // }, []) // không cần idUser nếu nó không thay đổi
    // );


    // ============================= IMAGE =============================
   
    // ----------- INFORMATION OF EACH POST -------------------
        const navigation: NavigationProp<RootStackParamList> = useNavigation();
        const route: RouteProp<RootStackParamList, "UserProfileFollow"> = useRoute();
    
        console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
        //console.log(route.params.item)
        const selectedItem = route.params.item;
    
        console.log("ID FOLLOWER: " + selectedItem.idFollower);
        console.log("ID USER FOLLOWER: " + selectedItem.idUserFollower);
        console.log("DESCRIPTION: " + selectedItem.nameFollower);
        console.log("AVATAR FOLLOWER: " + selectedItem.avatarFollower);
       
        // const [numFollowers, setNumFollowers] = useState('');
        // const [numFollowing, setNumFollowing] = useState('');
        // const [numPosts, setNumPosts] = useState('');
        // useEffect(() => {
        //     const userRecent = async () => {
        //         try {
        //             const res = await getOneUserById({ idUser: selectedItem.idUserFollower });
        //             setNumFollowers(res.data.followers);
        //             setNumFollowing(res.data.following);
        //             setNumPosts(res.data.posts);

        //             console.log("numFollowers: ", res.data.followers);
        //             console.log("numFollowing: ", res.data.following);
        //             console.log("numPosts: ", res.data.posts);
        //         } catch (error) {
        //             console.error("Lỗi khi lấy user:", error);
        //         }
        //     };    
        //         if (selectedItem.idUserFollower) {
        //             userRecent();
        //         }
        //     }, [selectedItem.idUserFollower]);

        const [numFollowers, setNumFollower]= useState(0);
        const [numFollowing, setNumFollowing]= useState(0);
        useEffect(() => {
                const fetchNumFollow = async () => {
                    try {
                        const response1 = await getAllFollowersWithIdUser({idUser: selectedItem.idUserFollower});
                        const response2 = await getAllFollowingWithIdUser({idUser: selectedItem.idUserFollower});
        
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
                            const response = await getAllPostWithIdUser({idUser: selectedItem.idUserFollower});
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
                    onPress={() => navigation.navigate("EditProfile")}
                    style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#E1E1E1',borderRadius: 3, width: 185,paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#E1E1E1',borderRadius: 3, width: 185, paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Share Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ProfileDetailsFollow;