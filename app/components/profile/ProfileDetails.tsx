import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image, Share, Linking  } from 'react-native';
import { useUser } from "../../screen/UserContext";
import { getAllFollowersWithIdUser, getAllFollowingWithIdUser, getAllPostWithIdUser, getOneUserById, loginUser, updateAvatar } from "../../nestjs/api";
import { useCallback, useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfileDetails() {
    
    const navigation: NavigationProp<RootStackParamList> = useNavigation();


    const { idUser } = useUser();
    console.log("User ID: ", idUser);

    const { avatar } = useUser();
    console.log("User Avatar: ", avatar);
    //const avatarUser= avatar;
    const { name } = useUser();
    console.log("User Name: ", name);
    const { following } = useUser();
    console.log("User Following: ", following);
    const { followers } = useUser();
    console.log("User Fllowers: ", followers);
    const { posts } = useUser();
    console.log("User Posts: ", posts);

    const [avtUser, setAvtUser] = useState(avatar);
    const avatarUser = async () => {
        try {
            const storyResponse = await getOneUserById({ idUser: idUser });
            const user = storyResponse.data;
            const avtUserr= user.avatar;
            console.log("✅ AVATAR USER: ", avtUserr);
            setAvtUser(avtUserr);
    
        } catch (err) {
            console.error("Lỗi khi lấy stories:", err);
        }
    }
    useFocusEffect(
    useCallback(() => {
        const fetchUserAvatar = async () => {
        try {
            const res = await getOneUserById({ idUser });
            const avt = res.data.avatar;
            console.log("✅ Updated avatar:", avt);
            setAvtUser(avt); // cập nhật avatar mới từ DB
        } catch (err) {
            console.error("❌ Lỗi khi lấy avatar:", err);
        }
        };

        fetchUserAvatar();
    }, []) // không cần idUser nếu nó không thay đổi
    );

    // const imgPath = "../../../assets/images/userAvatar/"+avatarUser;
    // console.log(imgPath);

    // ============================= IMAGE =============================
    const [image, setImage] = useState<string | null>(null);
    const pickAvatar = async () => {
        // Yêu cầu quyền
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }
        // Mở thư viện
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);

            // Gọi API cập nhật avatar
            const updatedAvatar = {
                idUser: idUser,
                avatar: result.assets[0].uri, // dùng trực tiếp uri thay vì image
            };
            console.log("result.assets[0].uri :", result.assets[0].uri);
            console.log("HIIIIIIIIIII")
            try {
                const res = await updateAvatar(updatedAvatar);
                console.log("UPDATE AVATAR: ",updatedAvatar)
                console.log("✅ Avatar updated successfully!");
                // const storyResponse = await getOneUserById({ idUser: idUser });
                // const user = storyResponse.data;
                // const avtUserr= user.avatar;
                // console.log("✅ AVATAR USER: ", avtUserr);
                // setAvtUser(avtUserr);
            } catch (error) {
                console.error("❌ Error updating avatar:", error);
            }
        }

      
    };
    //console.log("Image path:"+ image);
    
    // ============================= NUMBER OF FOLLOWER, FOLLOWING, POSTS =============================
    const [numFollowers, setNumFollower]= useState(0);
    const [numFollowing, setNumFollowing]= useState(0);
    useEffect(() => {
        const fetchNumFollow = async () => {
            try {
                const response1 = await getAllFollowersWithIdUser({idUser});
                const response2 = await getAllFollowingWithIdUser({idUser});

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
                    const response = await getAllPostWithIdUser({idUser});
                    setNumPosts(response.data.length); 
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            };
    
            fetchNumPosts();
    }, []);


    const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Check out my profile at https://example.com/myprofile', // link profile hoặc nội dung bạn muốn share
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type: ', result.activityType);
      } else {
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    //alert(error.message);
    console.log("error")
  }
  const openGmail = () => {
  const email = 'example@gmail.com';
  const subject = 'Check out this profile';
  const body = 'Here is my profile: https://example.com/myprofile';
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  Linking.openURL(url).catch(err => console.error('Error opening mail app', err));
};
};

    return (
        <View style={{ paddingHorizontal: 15 , paddingTop: 20, backgroundColor: '#fff',}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style= {{position: "relative"}}>
                    <TouchableOpacity onPress={pickAvatar}>
                        <Image
                            style={{ height: 107, width: 107, borderRadius: 50 }}
                            source={
                                image 
                                    ? {uri: image}
                                    : {uri: avtUser}}
                        />
                        <Text style= {{ position:"absolute", end: 0, bottom: 0, width: 35, height: 35, borderRadius: 70, borderWidth: 5, borderColor: "#eee", backgroundColor: "#f08080", textAlign: "center", color: "#fff0f5", fontSize: 18, }}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>{numPosts}</Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Posts</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Followers")}
                    style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>{numFollowers}</Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{width: 75, alignItems: 'center'}}>
                    <Text style= {{fontSize: 24, fontWeight: '400', color: 'black'}}>{numFollowing}</Text>
                    <Text style= {{fontSize: 16, color: 'black'}}>Following</Text>
                </TouchableOpacity>
            </View>
            <Text style= {{fontSize: 18, color: 'black', fontWeight: '500', marginTop: 10}}>{name}</Text>
            <Text style= {{color: 'black'}}>React Native</Text>
            <Text style= {{color: 'black'}}>Nest Js</Text>
            <Text style= {{color: 'black', fontSize: 16, fontWeight: '500'}}>See translation</Text>

            <View style= {{flexDirection: 'row', marginTop: 13,justifyContent: 'space-between'}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("EditProfile")}
                    style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#E1E1E1',borderRadius: 3, width: 185,paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={onShare}
                    style= {{justifyContent: "center",alignItems: 'center', height: 40}}>
                    <Text style= {{backgroundColor: '#E1E1E1',borderRadius: 3, width: 185, paddingHorizontal: 11, paddingVertical: 6, textAlign: 'center', color: 'black'}}>Share Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ProfileDetails;