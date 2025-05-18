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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { addPost } from "../nestjs/api";

const AddPost = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const { idUser } = useUser();
    console.log("User ID: ", idUser);

    // ============================= DESCRIPTION =============================
    const [description, setDescription] = useState("");
    // const handleDescriptionChange = (text: string) => {
    //     setDescription(text);
    //     //console.log('Description:', text);
    // };
    // console.log('Description:', description);



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
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

    };
    // console.log("Image path:"+ image);

    
    // ============================= TAGS =============================
    // const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const suggestedTags = ['Food', 'Drink', 'Recipe', 'Yoga', 'Gym', 'Jogging', 'Medicine' ];

    const handleAddTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
        }
    };
    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };
    
    //console.log("Tag:"+ selectedTags);

   

    const handleNextBtn = async () => {
        console.log("==================================///////")
        console.log("User ID: ", idUser);
        console.log('Description:', description);
        console.log("Image path:"+ image);
        console.log("Tag:"+ selectedTags);

        // const descriptionnn = "Hi";
        const tags= selectedTags+'';
        const imagee= image+'';
        try {
            const res = await addPost({
                description,
                image: imagee,
                tags: tags,
                idUser 
            });
            console.log("Add Post successfully !", res.data);
            navigation.navigate("Dashboard");
        } catch (err: any) {
            console.error('Add Post failed:', err?.response?.data || err.message);
        }
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.headerAddPost}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>⬅</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Your pretty post</Text>

                <TouchableOpacity style={styles.icon} onPress={handleNextBtn}>
                    <Image
                        source={require("../../assets/images/add_posts/next-icon.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                marginTop: 70,
                width: "100%",
                height: 120,
                backgroundColor: "#000",
                position: "absolute",
                }}
            ></View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <View style={styles.addPostContentDescription}>
                    <Text style= {styles.titleEachPostContent}>A little tale :</Text>
                    <TextInput
                        //onChangeText={handleDescriptionChange}
                        onChangeText= {setDescription}
                        style={styles.textDescription}
                        placeholder="Type Description"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>
                <View style={styles.addPostContentImage}>
                    <Text style= {styles.titleEachPostContent}>My snapshot:</Text>
                    <View style= {{ alignSelf: "center", alignItems: "center", flex: 1, width: 350}}>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonChooseImg}>
                            <Text style={styles.buttonChooseImgText}>Choose Image</Text>
                        </TouchableOpacity>
                        <View style= {{ alignSelf: "center",justifyContent: "center",alignItems: "center", alignContent: "center", flex: 1, width: 350, }}>
                            {image && <Image source={{ uri: image }} style={{ width: 350, height: 250, marginTop: 10 }} />}
                        </View>
                    </View>
                </View>
                <View style={styles.addPostContentTag}>
                    <Text style= {styles.titleEachPostContent}>Add Tags:</Text>
                    <View style={styles.tagContainer}>
                        {selectedTags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                            <Text style={styles.removeText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        ))}
                    </View>
                </View>
                <View style={styles.addPostContentSuggestTag}>
                    <Text style= {styles.titleEachPostContent}>Suggestion Tags:</Text>
                    <View style={styles.tagContainer}>
                        {suggestedTags.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAddTag(tag)} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <Text style={styles.removeText}>×</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* <Image
                    source={image ? { uri: image } : require('../../assets/images/add_posts/default-img.png')}
                    style={{ width: 350, height: 250, marginTop: 10 }}
                /> */}

            </ScrollView>
        </View>
    );
};

export default AddPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        position: "relative",
    },
    headerAddPost: {
        position: "relative",
        height: 70,
        alignItems: "center",
        backgroundColor: "#000",
        flexDirection: "row",
        zIndex: 10, // Thêm dòng này
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
    },
    button: {
        marginLeft: 0,
        width: 90,
        height: 70,
        backgroundColor: "#000",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // cho Android
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 33,
        fontWeight: "bold",
        marginTop: -17,
        textAlignVertical: "center",
        justifyContent: "center",
    },
    text: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "serif",
        //fontFamily: 'SpaceMono-Regular',
        color: "#fff",
    },
    icon: {
        position: "absolute",
        right: 15,
        width: 45,
        height: 40,
        marginLeft: 10,
        resizeMode: "contain",
    },
    addPostViewContent: {},
    addPostContentDescription: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 20,
        width: 380,
        height: 180,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 4,
        height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentImage: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        height: 400,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentTag: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        paddingBottom: 10,
        // height: 165,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentSuggestTag: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        height: 170,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },

    textDescription: {
        flex: 1,
        padding: 10,
        paddingTop: 33,
        margin: 10,
        fontSize: 16,
        color: "#000",
        borderBottomWidth: 1,       
        borderBottomColor: "#ccc",  
        textAlignVertical: "center",
    },
    titleEachPostContent: {
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 23,
        fontFamily: "serif",
        fontWeight: "700",
    },

    // ===================== CHOOSE IMG ======================
    buttonChooseImgText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlignVertical: "center",
        justifyContent: "center",
    },
    buttonChooseImg: {
        marginLeft: 0,
        marginTop: 20,
        width: 150,
        height: 40,
        backgroundColor: "#000",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // cho Android
        justifyContent: "center",
        alignItems: "center",
    },

    // ===================== TAG ======================
    tagContainer: {
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    }, 
    tag: {
        flexDirection: 'row',
        // backgroundColor: '#8c82fc',
        backgroundColor: '#666666',
        borderRadius: 8,
        paddingHorizontal: 11,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    tagText: {
        color: 'white',
        marginRight: 4,
    },
    removeText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
