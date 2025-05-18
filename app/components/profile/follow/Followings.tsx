import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerProfile: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        // paddingTop: 30,
        height: 45
    }
});


function Followings() {

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    
    return (
        <View style={styles.headerProfile}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '500', color: 'black' }}>vibely.balance__</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity 
                        style={{ marginRight: 17 }} 
                        onPress={() => 
                            navigation.goBack()
                            
                        }>
                        {/* <Image
                            style={{ height: 27, width: 27, opacity: 0.6}}
                            source={require('../../../assets/images/image/profile_user/add-post.png')}
                        /> */}
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={handleModal}>
                        <Image
                            style={{ height: 27, width: 27, opacity: 0.6}}
                            source={require('../../../assets/images/image/profile_user/menu-details.png')}
                        />
                    </TouchableOpacity> */}
                </View>
            </View>

            {/* <View style= {{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style= {{backgroundColor: '#ffffff', height: 350, borderTopEndRadius: 25, borderTopStartRadius: 25}}>
                        <TouchableOpacity>
                            <Image 
                                style= {{alignSelf: 'center', height: 40, width: 60}} 
                                source={require('../../../assets/images/image/profile_user/menu_details_list/horizontal_line.png')}
                            />
                            <Text style= {{alignSelf: "center", fontSize: 17, fontWeight: "400", color:"#666", marginTop: 5,}}>CREATE A PRETTY MEMORY</Text>
                            <View style= {{borderBottomWidth: 1, borderColor: "#eee", marginTop: 45}}></View>
                            <View style= {{paddingHorizontal: 20, paddingTop: 10}}>
                                <TouchableOpacity 
                                   
                                    style= {{ flexDirection: "row"}}
                                >
                                    <Image
                                        style= {{alignSelf: 'center', height: 30, width: 30, marginRight: 10}} 
                                        source={require('../../../assets/images/image/profile_user/add_post_story/new-story.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15, }}>New Story</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  
                                    style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27, marginLeft: 2,  marginRight: 10}} 
                                        source={require('../../../assets/images/image/profile_user/add_post_story/grid.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>New Post</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style= {{alignSelf: "center", fontSize: 15, fontWeight: "400", color:"#666", marginTop: 75,}}>www.vibely.balance__</Text>
                        </TouchableOpacity>
                    </View>
            </View> */}
            
        </View>
    );
}


export default Followings;