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
import { AddPostStyle } from "../styles/AddPost.styles";

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
                user: idUser 
            });
            console.log("Add Post successfully !", res.data);
            navigation.navigate("Dashboard");
        } catch (err: any) {
            console.error('Add Post failed:', err?.response?.data || err.message);
        }
    }

    

    return (
        <View style={AddPostStyle.container}>
            <View style={AddPostStyle.headerAddPost}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={AddPostStyle.button}
                    activeOpacity={0.7}
                >
                    <Text style={AddPostStyle.buttonText}>⬅</Text>
                </TouchableOpacity>

                <Text style={AddPostStyle.text}>Your pretty post</Text>

                <TouchableOpacity style={AddPostStyle.icon} onPress={handleNextBtn}>
                    <Image
                        source={require("../../assets/images/add_posts/next-icon.png")}
                        style={AddPostStyle.icon}
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
                <View style={AddPostStyle.addPostContentDescription}>
                    <Text style= {AddPostStyle.titleEachPostContent}>A little tale :</Text>
                    <TextInput
                        //onChangeText={handleDescriptionChange}
                        onChangeText= {setDescription}
                        style={AddPostStyle.textDescription}
                        placeholder="Type Description"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>
                <View style={AddPostStyle.addPostContentImage}>
                    <Text style= {AddPostStyle.titleEachPostContent}>My snapshot:</Text>
                    <View style= {{ alignSelf: "center", alignItems: "center", flex: 1, width: 350}}>
                        <TouchableOpacity onPress={pickImage} style={AddPostStyle.buttonChooseImg}>
                            <Text style={AddPostStyle.buttonChooseImgText}>Choose Image</Text>
                        </TouchableOpacity>
                        <View style= {{ alignSelf: "center",justifyContent: "center",alignItems: "center", alignContent: "center", flex: 1, width: 350, }}>
                            {image && <Image source={{ uri: image }} style={{ width: 350, height: 250, marginTop: 10 }} />}
                        </View>
                    </View>
                </View>
                <View style={AddPostStyle.addPostContentTag}>
                    <Text style= {AddPostStyle.titleEachPostContent}>Add Tags:</Text>
                    <View style={AddPostStyle.tagContainer}>
                        {selectedTags.map((tag, index) => (
                        <View key={index} style={AddPostStyle.tag}>
                            <Text style={AddPostStyle.tagText}>{tag}</Text>
                            <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                            <Text style={AddPostStyle.removeText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        ))}
                    </View>
                </View>
                <View style={AddPostStyle.addPostContentSuggestTag}>
                    <Text style= {AddPostStyle.titleEachPostContent}>Suggestion Tags:</Text>
                    <View style={AddPostStyle.tagContainer}>
                        {suggestedTags.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAddTag(tag)} style={AddPostStyle.tag}>
                            <Text style={AddPostStyle.tagText}>{tag}</Text>
                            <Text style={AddPostStyle.removeText}>×</Text>
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
