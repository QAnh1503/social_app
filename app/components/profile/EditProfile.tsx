import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image } from 'react-native';
import { useUser } from "../../screen/UserContext";
import { getOneUserById, loginUser, updateAvatar, updateUserProfile } from "../../nestjs/api";
import { useCallback, useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function EditProfile() {
    
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    
    const { idUser } = useUser();
    const { email } = useUser();
    const { name } = useUser();
    const { avatar } = useUser();
    const [websiteFirst, setWebsiteFirst] = useState('');
    const [bioFirst, setBioFirst] = useState('');
    const [phoneFirst, setPhoneFirst] = useState('');
    const [genderFirst, setGenderFirst] = useState('');


    useEffect(() => {
        const fetchUser  = async () => {
        try {
            const response = await getOneUserById({ user: idUser });
            //console.log('User data:', response.data);
            setWebsiteFirst(response.data.website);
            setBioFirst(response.data.bio);
            setPhoneFirst(response.data.phone);
            setGenderFirst(response.data.gender);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        };
        fetchUser();
    }, []);

    
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
            aspect: [1, 1],
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
            } catch (error) {
                console.error("❌ Error updating avatar:", error);
            }
        }

      
    };

    const [avatarr, setAvatar] = useState('');

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //             console.log("📌 Navigation focus triggered"); // 👈 kiểm tra event này có chạy không

    //     const fetchStories = async () => {
    //         try {
    //             const storyResponse = await getOneUserById({ user: idUser });
    //             const user = storyResponse.data;
    //             console.log("📦 Full user object: ", user);
    //             console.log("📷 Avatar inside user: ", user.avatar);
    //             setAvatar(user.avatar)                
    //         } catch (err) {
    //             console.error("Lỗi khi lấy stories:", err);
    //         }
    //     };
    
    //     fetchStories();
    //   });
    
    //   return unsubscribe; // cleanup
    // }, [navigation]);
   
    useFocusEffect(
    useCallback(() => {
        console.log("📌 useFocusEffect triggered"); // dòng này sẽ xuất hiện nếu chạy OK

        const fetchStories = async () => {
        try {
            console.log("⚠️ idUser:", idUser);
            const storyResponse = await getOneUserById({ user: idUser });
            const user = storyResponse.data;
            console.log("👤 User avatar:", user.avatar);
            setAvatar(user.avatar || '');
        } catch (err) {
            console.error("❌ Lỗi khi lấy stories:", err);
        }
        };

        fetchStories();
    }, [avatarr]) 
    );
    console.log("AVT: ", avatarr)
    
    // ============================= UPDATE =============================
    const [namee, setName] = useState(name);
    const [emaill, setEmail] = useState(email);
    // const [avatarr, setAvatar] = useState(avatar);
    const [websitee, setWebsite] = useState(websiteFirst);
    const [bioo, setBio] = useState(bioFirst);
    const [phonee, setPhone] = useState(phoneFirst);
    const [genderr, setGender] = useState(genderFirst);

    const updateProfileUser = async () => {
        console.log("User ID: ", idUser);
        console.log("User Email: ", email);
        console.log("User Name: ", name);
        console.log("User Avatar: ", avatar);
        console.log("User Namee: ", namee);
        console.log("User Emaill: ", emaill);
        console.log("User Avatarr: ", avatarr);

        console.log("Webiste: ", websitee);
        console.log("Bio: ", bioo);
        console.log("Phone: ", phonee);
        console.log("Gender: ", genderr);

        try {
            const res = await updateUserProfile({
                idUser,
                name: namee,
                email: emaill,
                phone: phonee,
                avatar: avatarr,
                website: websitee,
                bio: bioo,
                gender: genderr
            });
            console.log("Update successfully !")
            navigation.goBack()
             } catch (err: any) {
            console.error('Register failed:', err?.response?.data || err.message);
        }
    }

    useEffect(() => {
        setWebsite(websiteFirst);
        setBio(bioFirst)
        setPhone(phoneFirst)
        setGender(genderFirst)
    },);


    return (
        <View style={{ paddingHorizontal: 15 , backgroundColor: "#fff", flex: 1, alignItems: "center"}}>

            <View style= {{flexDirection: "row", width: "100%", height: 58, backgroundColor: "#fff0f5", justifyContent: "space-between", borderRadius: 15, padding: 10}}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style= {{justifyContent: "center"}}
                >
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: '300', }}>Cancel</Text>
                </TouchableOpacity >
                <Text  style= {{fontSize: 18, color: '#000', fontWeight: '600', alignSelf: "center" }}>Edit Profile</Text>
                <TouchableOpacity 
                    onPress={updateProfileUser}
                    style= {{justifyContent: "center"}}
                >
                    <Text  style= {{fontSize: 18, color: '#f08080', fontWeight: '500', }}>Done</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , marginTop: 60}}>
                <View style= {{position: "relative"}}>
                    <TouchableOpacity onPress={pickAvatar}>
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 70 }}
                            source={
                                image 
                                    ? {uri: image}
                                    : {uri: avatarr}}
                        />
                        <Text style= {{ position:"absolute", end: 0, bottom: 0, width: 35, height: 35, borderRadius: 70, borderWidth: 5, borderColor: "#eee", backgroundColor: "#f08080", textAlign: "center", color: "#fff0f5", fontSize: 18, }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style= {{fontSize: 18, color: '#f08080', fontWeight: '500', marginTop: 10}}>Chage Profile Photo</Text>
            
            <View style= {{ width: "100%",borderBottomWidth: 1, borderColor: "#eee", marginTop: 40, marginBottom: 20}}></View>

            <View style= {{ alignItems: "flex-start", flex: 1, width: "100%"}}>
                <View style= {{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Username: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#000',}}>{name}</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000',}}
                            placeholder={name}
                            placeholderTextColor="#999"
                            value={namee}
                            onChangeText={setName}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
                <View style= {{flexDirection: "row", justifyContent: "center", marginTop: 15,  alignItems: "center",}}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Website: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#ccc',}}>Website</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000',}}
                            placeholder="Website"
                            placeholderTextColor='#999'
                            value={websitee}
                            onChangeText={setWebsite}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
                <View style= {{flexDirection: "row", justifyContent: "center", marginTop: 15,  alignItems: "center"}}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Bio: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#000', width: 240,}}>Digital goodies designer @pixcellz. Everything is designed.</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000', maxWidth: 241}}
                            placeholder={ bioo!=='' ? bioo : "Bio"}
                            placeholderTextColor={bioo === '' ? '#999' : '#000'}
                            value={bioo}
                            onChangeText={setBio}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
            </View>
           
            
            <View style= {{ alignItems: "flex-start", flex: 1, width: "100%"}}>
                <Text style= {{fontSize: 19, color: '#000',fontWeight: "500", marginBottom: 10, marginTop: 20}}>Private Information</Text>

                <View style= {{flexDirection: "row", justifyContent: "center", marginTop: 15,  alignItems: "center", }}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Email: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#000',}}>{email}</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000',maxWidth: 241}}
                            placeholder={ email!=='' ? email : "Email"}
                            placeholderTextColor={email === '' ? '#999' : '#000'}
                            value={emaill}
                            onChangeText={setEmail}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
                <View style= {{flexDirection: "row", justifyContent: "center", marginTop: 15,  alignItems: "center"}}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Phone: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#ccc',}}>+84</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000',maxWidth: 241}}
                            placeholder={ phonee!=='' ? phonee : "+84"}
                            placeholderTextColor={phonee === '' ? '#999' : '#000'}
                            value={phonee}
                            onChangeText={setPhone}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
                <View style= {{flexDirection: "row", justifyContent: "center", marginTop: 15,  alignItems: "center"}}>
                    <Text style= {{fontSize: 18, color: '#000', fontWeight: 400, width: 140, marginTop: -7}}>Gender: </Text>
                    <View style= {{  height: 40}}>
                        {/* <Text style= {{fontSize: 18, color: '#ccc',}}>Male / Female</Text> */}
                        <TextInput
                            style= {{fontSize: 18, color: '#000',maxWidth: 241}}
                            placeholder={ genderr!=='' ? genderr : "Male / Female"}
                            placeholderTextColor={genderr === '' ? '#999' : '#000'}
                            value={genderr}
                            onChangeText={setGender}
                        />
                        <View style= {{borderBottomWidth: 1, borderColor: "#eee", width: 240, marginTop: 3}}></View>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default EditProfile;