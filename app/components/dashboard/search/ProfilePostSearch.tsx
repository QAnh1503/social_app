import {  ImageSourcePropType, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image , FlatList} from 'react-native';
// import { typeData, UserData } from "../../../utils/UserData";
import { useEffect, useState } from "react";
// import { typeData } from "../../utils/UserData";
// import { getAllPost, getAllPostWithIdUser } from "../../nestjs/api";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getAllPostWithIdUser } from "../../../nestjs/api";
import { typeData } from "../../../utils/UserData";
// import { getAllPostWithIdUser } from "../../../../nestjs/api";
// import { typeData } from "../../../../utils/UserData";
// import { useUser } from "../../screen/UserContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfilePostSearch() {
    // const { idUser } = useUser();
    // console.log("User ID: ", idUser);
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "UserProfileSearch"> = useRoute();
        
    console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
            //console.log(route.params.item)
    const selectedItem = route.params.user;
        
    console.log("ID USER SEARCH: " + selectedItem.idUser);
    const idUserSearch = selectedItem.idUser;
    

    const [selected, setSelected]= useState(1)
    const renderItem = (item: { item: { post: { image: ImageSourcePropType | undefined; }; }; }) => {
        return (
            <View>
                <Image style= {{height: 130.9, width: 137}} source={item.item.post.image}/>
            </View>
        )
    }
    // const renderItem = item => {
    //     return (
    //         <View>
    //             <Image source={item.item.post.image}/>
    //         </View>
    //     )
    // }
    console.log(selected)



    const [postsUser, setPostsUser] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPostWithIdUser({idUser: idUserSearch});
                setPostsUser(response.data); // set danh sách post
                console.log("Fetched posts:", response.data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);
    // console.log(postsUser);

    return (
        <View style={{ paddingTop: 25, backgroundColor: '#fff', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {typeData.map(item => {
                    return (
                        <View key={item.id} style={{ width: 196.36, paddingBottom: 15, borderBottomWidth: selected === item.id ? 1 : 0  }}>
                            <TouchableOpacity onPress={() => setSelected(item.id)}>
                                <Image 
                                    style={{ tintColor: 'black', alignSelf: 'center', width: 33, height: 35 }} 
                                    source={item.image} 
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            {/* {selected ==1 && (
                <FlatList 
                    data={UserData} 
                    renderItem={renderItem} 
                    keyExtractor={item => item.id.toString()} 
                    numColumns={3} 
                    showsHorizontalScrollIndicator= {false}
                />
            )} */}
            
            <View style= {{marginLeft: 4, marginTop: 5}}>
                {selected === 1 && (
                    <FlatList
                        data={postsUser}
                        renderItem={({ item }: { item: any }) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    console.log(item)
                                    navigation.navigate('ProfilePostDetail', {item})
                                }}>
                                <Image style={{ height: 130, width: 132, marginBottom: 3, marginRight: 3}} source={{ uri: item.image }} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.idPost.toString()}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                    />
                )}

            </View>
            

        </View>
    );
}


export default ProfilePostSearch;