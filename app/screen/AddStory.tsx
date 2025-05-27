import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { useUser } from "./UserContext";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from "react";
import { addPost, addStory, getOneUserById } from "../nestjs/api";
import { AddStoryStyle } from "../styles/AddStory.styles";

const AddStory = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const { idUser } = useUser();
    console.log("User ID: ", idUser);

    const [avtUser, setAvtUser] = useState('');
    const [nameUser, setNameUser] = useState('');
    useFocusEffect(
        useCallback(() => {
            const fetchUserAvatar = async () => {
            try {
                const res = await getOneUserById({ user: idUser });
                const avt = res.data.avatar;
                const na = res.data.name;
                console.log("✅ Avatar:", avt);
                console.log("✅ Name:", na);
                setAvtUser(avt);
                setNameUser(na);
            } catch (err) {
                console.error("❌ Lỗi khi lấy avatar:", err);
            }
            };
    
            fetchUserAvatar();
        }, []) 
    );

    // ============================= DESCRIPTION =============================
    const [content, setContent] = useState("");


    // ============================= IMAGE =============================
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
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
            aspect: [4, 6],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };
    
    

    const handleNextBtn = async () => {
        console.log("==================================///////")
        console.log("User ID: ", idUser);
        console.log('Content:', content);
        console.log("Image path:"+ image);

        const imagee= image+'';
        try {
            const res = await addStory({
                content,
                image: imagee,
                user: idUser 
            });
            console.log("Add Story successfully !", res.data);
            navigation.navigate("Dashboard");
        } catch (err: any) {
            console.error('Add Story failed:', err?.response?.data || err.message);
        }
    }


    // ===================== CURRENT TIME ======================
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime(); // cập nhật ngay khi component mount

        const timer = setInterval(updateTime, 60000); // cập nhật mỗi phút

        return () => clearInterval(timer); // clear interval khi component unmount
    }, []);

    

    return (
        <View style={AddStoryStyle.container}>
            <View style={AddStoryStyle.headerAddPost}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AddStoryStyle.button}
                    activeOpacity={0.7}
                >
                    <Text style={AddStoryStyle.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <Text style={AddStoryStyle.text}>A little Story</Text>

                {/* <TouchableOpacity style={styles.icon} onPress={handleNextBtn}>
                    <Text>Upload</Text>
                    <Image
                        source={require("../../assets/images/add_posts/next-icon.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity> */}
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <View style= {{flexDirection: "row",marginTop: 45, marginHorizontal: 22 }}>
                <Image
                    style={{ height: 70, width: 70, borderRadius: 50}}
                    source={{uri: avtUser}}
                />
                <View>
                    <View style= {{flexDirection: "row", justifyContent: "space-between", width: 306 }}>
                        <View>
                            <View style= {{flexDirection: "row", height: 35, alignItems: "center", marginLeft: 7}}>
                                <Text style= {{fontSize: 20, marginLeft: 10, fontWeight: 500, marginRight: 5,}}>
                                    {nameUser}
                                </Text>
                                <Image
                                    style={{ height: 25, width: 25, borderRadius: 50}}
                                    source={require("../../assets/images/image/profile_user/add_post_story/right-arrow.png")}
                                />
                            </View>
                            <Text style= {{color: "#ccc", fontSize: 17, marginLeft: 18, fontFamily: "serif",}}>What's News ?</Text>
                        </View>
                        <Text style= {{color: "#ccc", fontSize: 18, marginTop: 3, marginRight: 16}}>{currentTime}</Text>
                    </View>
                </View>
                </View>
                <View style={AddStoryStyle.addPostContentDescription}>
                    {/* <Text style= {styles.titleEachPostContent}>Add a few Vibes here:</Text> */}
                    <TextInput
                        //onChangeText={handleDescriptionChange}
                        onChangeText= {setContent}
                        style={AddStoryStyle.textDescription}
                        placeholder="Add a few Vibes here:"
                        
                        placeholderTextColor="#ccc"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                    
                </View>
                <View style={AddStoryStyle.addPostContentImage}>
                    <View style= {{flexDirection: "row", alignItems: "center"}}>
                        <Text style= {AddStoryStyle.titleEachPostContent}>My snapshot:</Text>
                        <TouchableOpacity 
                            onPress={pickImage} 
                            >
                            
                            <Image
                                style={{ 
                                    height: 50, 
                                    width: 50, 
                                    // borderRadius: 50, 
                                    // borderWidth: 1,
                                    borderColor: '#ccc',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3.84,
                                }}
                                source={require("../../assets/images/image/profile_user/add_post_story/camera.png")}
                            />
                          
                        </TouchableOpacity>
                    </View>
                    <View style= {{ alignSelf: "center", alignItems: "center", flex: 1, width: 350}}>
                        {/* <TouchableOpacity 
                            onPress={pickImage} 
                            >
                            <Image
                                style={{ height: 25, width: 25, borderRadius: 50}}
                                source={require("../../assets/images/image/profile_user/add_post_story/camera.png")}
                            />
                        </TouchableOpacity> */}
                        <View style= {{ alignSelf: "center",justifyContent: "center",alignItems: "center", alignContent: "center", flex: 1, width: 350, }}>
                            {image && <Image source={{ uri: image }} style={{ width: 350, height: 550, marginTop: 10 }} />}
                        </View>
                    </View>
                </View>
                
            
            </ScrollView>

            <View style={AddStoryStyle.footerAddPost}>
                <TouchableOpacity style={AddStoryStyle.iconUpload} onPress={handleNextBtn}>
                    <Image
                        source={require("../../assets/images/image/profile_user/add_post_story/upload.png")}
                        style={AddStoryStyle.iconUpload}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddStory;
