import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Button, Image, Linking, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text } from 'react-native';
import { addCoins } from "../../nestjs/api";
import { useUser } from "../../screen/UserContext";

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


function ProfileHeader() {

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const userContext = useUser();
    

    const [open, setOpen] = useState(false)
    const handleModal = () => {
        console.log("modal")
        setOpen(true)
    }
    const handleCloseModal = () => {
        console.log("Closing modal");
        setOpen(false);
    };


    const [openPost_Story, setOpenPost_Story] = useState(false)
    const [displayAddCoinModal, setDisplayAddCoinModal] = useState(false);
    const handleModal_Post_Story = () => {
        console.log("modal of Adding Post / Story")
        setOpenPost_Story(true)
    }
    const handleCloseModal_Post_Story = () => {
        console.log("Closing modal of Adding Post / Story");
        setOpenPost_Story(false);
    };

    const handleFetchAddCoin = async (itemType: number) => {


        const response = await addCoins(userContext.idUser, itemType)
        console.log(response)
        const url = response.data.href;

        Linking.openURL(url).catch(error => console.error(error))
    }

    const handleAddCoinModel = () => {
        setDisplayAddCoinModal(true);
    }
    return (
        <View style={styles.headerProfile}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '500', color: 'black' }}>vibely.balance__</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity 
                        style={{ marginRight: 17 }} 
                        onPress={() => 
                            //navigation.navigate('AddPost')
                            // {navigation.navigate('Payment', {})}
                            {handleAddCoinModel()}
                        }>
                            {/* <Text>[More coins!]</Text> */}
                        <Image
                            style={{ height: 27, width: 27, opacity: 0.6}}
                            source={require('../../../assets/images/coin.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ marginRight: 17 }} 
                        onPress={() => 
                            //navigation.navigate('AddPost')
                            handleModal_Post_Story()
                        }>
                        <Image
                            style={{ height: 27, width: 27, opacity: 0.6}}
                            source={require('../../../assets/images/image/profile_user/add-post.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleModal}>
                        <Image
                            style={{ height: 27, width: 27, opacity: 0.6}}
                            source={require('../../../assets/images/image/profile_user/menu-details.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal 
                animationType="slide"
                transparent= {true}
                visible= {open}
                onRequestClose={() => {
                    setOpen(!open);
                }}
            >
                <View style= {{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style= {{backgroundColor: '#ffffff', height: 650, borderTopEndRadius: 25, borderTopStartRadius: 25}}>
                        <TouchableOpacity  onPress={handleCloseModal} accessibilityLabel="Close modal">
                            <Image 
                                style= {{alignSelf: 'center', height: 40, width: 60}} 
                                source={require('../../../assets/images/image/profile_user/menu_details_list/horizontal_line.png')}
                            />
                            <Text style= {{alignSelf: "center", fontSize: 17, fontWeight: "400", color:"#666", marginTop: 5}}>EXPLORE MORE</Text>
                            <View style= {{borderBottomWidth: 1, borderColor: "#eee", marginTop: 35}}></View>
                            <View style= {{paddingHorizontal: 20, paddingTop: 10}}>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/setting.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15, }}>Setting and privacy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/favourites.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Favourites</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 42, width: 42, marginLeft: -10}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/comments.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Replies</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 35, width: 35, marginLeft: -5}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/new-post.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>New Feed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/new-story.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Start a Story</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/about.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Get to Know Us</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/meta.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Meta Varified</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 27, width: 27}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/close-friends.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Close Friends</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        handleCloseModal();  
                                        setTimeout(() => {
                                            navigation.navigate('Login'); 
                                        }, 200);  
                                    }}
                                    //onPress={() => navigation.navigate('Login')}
                                    style= {{ flexDirection: "row"}}>
                                    <Image
                                        style= {{alignSelf: 'center', height: 25, width: 25, marginLeft: 2}} 
                                        source={require('../../../assets/images/image/profile_user/menu_details_list/log-out.png')}
                                    />
                                    <Text style= {{flex: 1,fontSize: 18, paddingVertical: 15, marginLeft: 15}}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
            animationType="slide"
            transparent= {true}
            visible= {displayAddCoinModal}
            onRequestClose={() => {
                setDisplayAddCoinModal(false)
            }}
            >
                <View style= {{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style= {{backgroundColor: '#ffffff', height: 650, borderTopEndRadius: 25, borderTopStartRadius: 25}}>
                    <TouchableOpacity  onPress={() => {setDisplayAddCoinModal(false)}} accessibilityLabel="Close modal">
                            <Image 
                                style= {{alignSelf: 'center', height: 40, width: 60}} 
                                source={require('../../../assets/images/image/profile_user/menu_details_list/horizontal_line.png')}
                            />
                            <Text style= {{alignSelf: "center", fontSize: 17, fontWeight: "400", color:"#666", marginTop: 5,}}>Add Coins</Text>
                            <View style= {{borderBottomWidth: 1, borderColor: "#eee", marginTop: 45}}></View>
                            <View style= {{paddingHorizontal: 20, paddingTop: 10}}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setDisplayAddCoinModal(false)
                                    }}
                                    style= {{ flexDirection: "column", gap: 20}}
                                >
                                    <Button onPress={() => {handleFetchAddCoin(1)}} title="10 coins" color={'#5459AC'}/>
                                    <Button onPress={() => {handleFetchAddCoin(2)}} title="30 coins" color={'#5459AC'}/>
                                    <Button onPress={() => {handleFetchAddCoin(3)}} title="50 coins" color={'#5459AC'}/>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                </View>
                </View>
            </Modal>

            <Modal 
                animationType="slide"
                transparent= {true}
                visible= {openPost_Story}
                onRequestClose={() => {
                    setOpenPost_Story(!openPost_Story);
                }}
            >
                <View style= {{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style= {{backgroundColor: '#ffffff', height: 350, borderTopEndRadius: 25, borderTopStartRadius: 25}}>
                        <TouchableOpacity  onPress={handleCloseModal_Post_Story} accessibilityLabel="Close modal">
                            <Image 
                                style= {{alignSelf: 'center', height: 40, width: 60}} 
                                source={require('../../../assets/images/image/profile_user/menu_details_list/horizontal_line.png')}
                            />
                            <Text style= {{alignSelf: "center", fontSize: 17, fontWeight: "400", color:"#666", marginTop: 5,}}>CREATE A PRETTY MEMORY</Text>
                            <View style= {{borderBottomWidth: 1, borderColor: "#eee", marginTop: 45}}></View>
                            <View style= {{paddingHorizontal: 20, paddingTop: 10}}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        handleCloseModal_Post_Story(); 
                                        setTimeout(() => {
                                            navigation.navigate('AddStory'); 
                                        }, 200);  
                                    }}
                                    style= {{ flexDirection: "row"}}
                                >
                                    <Image
                                        style= {{alignSelf: 'center', height: 30, width: 30, marginRight: 10}} 
                                        source={require('../../../assets/images/image/profile_user/add_post_story/new-story.png')}
                                    />
                                    <Text style= {{flex: 1,borderBottomWidth: 1, borderColor: "#eee",fontSize: 18, paddingVertical: 15, marginLeft: 15, }}>New Story</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        handleCloseModal_Post_Story();  // đóng modal
                                        setTimeout(() => {
                                            navigation.navigate('AddPost'); // delay để modal đóng trước
                                        }, 200);  // đợi 200ms cho hiệu ứng modal đóng
                                        //navigation.navigate('AddPost')
                                    }}
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
                </View>
            </Modal>
        </View>
    );
}


export default ProfileHeader;