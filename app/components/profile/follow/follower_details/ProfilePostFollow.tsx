import {  ImageSourcePropType, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text, Image , FlatList} from 'react-native';
import { useEffect, useState } from "react";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getAllPostWithIdUser } from "../../../../nestjs/api";
import { typeData } from "../../../../utils/UserData";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


function ProfilePostFollow() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "UserProfileFollow"> = useRoute();
        
    console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
            //console.log(route.params.item)
    const selectedItem = route.params.item;
        
    console.log("ID USER FOLLOWER: " + selectedItem.idUserFollower);
    const idUserFollow = selectedItem.idUserFollower;
    

    const [selected, setSelected]= useState(1)
    const renderItem = (item: { item: { post: { image: ImageSourcePropType | undefined; }; }; }) => {
        return (
            <View>
                <Image style= {{height: 130.9, width: 137}} source={item.item.post.image}/>
            </View>
        )
    }
   
    console.log(selected)



    const [postsUser, setPostsUser] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPostWithIdUser({user: idUserFollow});
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
                        keyExtractor={(item) => item.idPost}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                    />
                )}

            </View>
            

        </View>
    );
}


export default ProfilePostFollow;