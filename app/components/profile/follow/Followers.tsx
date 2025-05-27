import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import {FlatList, Image,ImageSourcePropType,Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Platform, Text } from "react-native";
import { useUser } from "../../../screen/UserContext";
import { addFollower, addFollowing, checkIdUser_IdUserFollower, checkIdUser_IdUserFollowing, deleteFollowerByIdUserIdUserFollower, deleteFollowing, getAllFollowersWithIdUser, getOneUserById } from "../../../nestjs/api";
import { StackNavigationProp } from "@react-navigation/stack";



type UserFollowerDetail = {
    idFollower: string,
    idUserFollower: string,
    nameFollower: string;
    avatarFollower: string;
    //idUser: number;
};
type UserFollowerDetailWithStatus = UserFollowerDetail & {
  followed: boolean;
};

function Followers() {
    //const navigation: NavigationProp<RootStackParamList> = useNavigation();
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();

    const { idUser } = useUser();
    const [nameUserRecent, setNameUserRecent] = useState('');
    console.log("User ID: ", idUser);
    useEffect(() => {
        const userRecent = async () => {
            try {
                const res = await getOneUserById({ user: idUser });
                setNameUserRecent(res.data.name);
                console.log("User Name: ", res.data.name); // log đúng thời điểm
            } catch (error) {
                console.error("Lỗi khi lấy user:", error);
            }
        };

        if (idUser) {
            userRecent();
        }
    }, [idUser]);



    // ===== FETCH FOLLOWERS =====
    const [followers, setFollowers] = useState<UserFollowerDetail[]>([]);
    const followersWithUserFollowerDetail:
    {
        idFollower: any,
        idUserFollower: any,
        nameFollower: any,
        avatarFollower: any,
        //idUser: any,
      }[] = [];
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await getAllFollowersWithIdUser({user: idUser});
                
                const followersList = response.data
                //console.log("Fetched followers listtttttttttttt:", followersList);

                //console.log("------------------FOLLOWER DETAILS-----------------");
                for (const follower of followersList) {
                    const userFollower = {
                        idFollower: follower._id,
                        idUserFollower: follower.userFollower._id,
                        nameFollower: follower.userFollower.name,
                        avatarFollower: follower.userFollower.avatar,
                    };

                    followersWithUserFollowerDetail.push(userFollower);
                }
                //console.log("✅ Followers with user info:", followersWithUserFollowerDetail);
                setFollowers(followersWithUserFollowerDetail);
            } catch (error) {
                console.error("Failed to fetch followers w id user:", error);
            }
        };
        fetchFollowers();
    }, []);

    console.log("FETCH FOLLOWERS",followers)
    
    // ----- CLICK IN EACH FOLLOWER -----
    const clickAnyFolower = (follower: {
        idFollower: any;
        idUserFollower: any;
        nameFollower: any;
        avatarFollower: any;
    }) => {
        console.log("You have just click on follower:", follower);
        // Bạn có thể điều hướng tới profile tại đây nếu cần
        // navigation.navigate('ProfileScreen', { idUser: follower.idUser });
    };

    // ----- FOLLOW STATUS -----
    const [followersWithStatus, setFollowersWithStatus] = useState<UserFollowerDetailWithStatus[]>([]);
    useEffect(() => {
        const fetchFollowStatus = async () => {
            const updatedFollowers = await Promise.all(
                followers.map(async (item) => {
                    try {
                        console.log("Checking follow status for:", {
                            idUser: idUser,
                            idUserFollowing: item.idUserFollower,
                        });

                        const res = await checkIdUser_IdUserFollowing({
                            idUser: idUser,  
                            idUserFollowing: item.idUserFollower, // người đang theo dõi
                        });
                       
                        console.log("User", idUser, "follow", item.idUserFollower, ":", res.data);
                        
                        return { ...item, followed: res.data };
                    } catch (err) {
                        console.error("Error checking follow status", err);
                        return { ...item, followed: false }; // fallback nếu lỗi
                    }
                })
            );
            setFollowersWithStatus(updatedFollowers);
        };

        if (followers.length > 0) {
            fetchFollowStatus();
        }
    }, [followers]);
   

    const [searchText, setSearchText] = useState('');
    // const filteredFollowers = followersWithStatus.filter(follower =>
    //     follower.nameFollower.toLowerCase().includes(searchText.toLowerCase())
    // );
    const filteredFollowers = useMemo(() => {
        return followersWithStatus.filter(follower =>
            follower.nameFollower.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [followersWithStatus, searchText]);




    return (
        <View style={styles.container}>
            <View style={styles.headerProfile}>
                <View style={{ flexDirection: "row", alignItems: "center",position: "relative",}}
                >
                    {/* <TouchableOpacity
                        style={{ paddingRight: 17, backgroundColor: "red" }}
                        onPress={() => 
                            //navigation.goBack()
                            {
                                if (navigation.canGoBack()) {
                                    navigation.goBack();
                                } else {
                                navigation.replace("Dashboard"); // fallback nếu không quay lại được
                                }
                            }
                        }
                    >
                        <Image
                            style={styles.headerIconGoBack}
                            source={require("../../../../assets/images/image/profile_user/profile_post_detail/left-chevron.png")}
                        />
                    </TouchableOpacity> */}

                    <Text style={styles.headerNameUser} >
                        {nameUserRecent}
                    </Text>
                </View>
            </View>

            <View style={styles.search_outline_view}>
                <Image
                    style={styles.search_icon}
                    source={require("../../../../assets/images/image/searchIconOutline.png")}
                />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#909090"
                    style={styles.search_outline_input}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            
                    <FlatList
                        data={filteredFollowers}
                        keyExtractor={(item) => item.idFollower.toString()}
                        contentContainerStyle={{
                            backgroundColor: '#ffffff',
                            borderTopEndRadius: 25,
                            borderTopStartRadius: 25,
                            paddingTop: 30,
                        }}
                        renderItem={({ item }) => (
                            <View 
                                //key={follower.idFollower || index}
                                style= {{paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15}}
                                >
                                <TouchableOpacity 
                                    onPress={() => 
                                        {
                                            clickAnyFolower(item)
                                            navigation.navigate("UserProfileFollow", {item})
                                        }
                                    }
                                    style= {{ flexDirection: "row",width: 270, alignItems: "center"}}
                                    >
                                    <Image
                                        style= {{alignSelf: 'center', height: 70, width: 70, marginRight: 10, borderRadius: 50}} 
                                        source={
                                            item.avatarFollower
                                                ? { uri: item.avatarFollower }
                                                : require('../../../../assets/images/image/profile_user/add_post_story/new-story.png')
                                        }
                                        />
                                    <Text style= {{fontSize: 18, marginLeft: 10, }}>{item.nameFollower}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    onPress={async () => {
                                        const updatedFollowed = !item.followed;

                                        // Cập nhật UI ngay lập tức (tạm thời)
                                        setFollowersWithStatus(prev =>
                                            prev.map(f =>
                                            f.idFollower === item.idFollower ? { ...f, followed: updatedFollowed } : f
                                            )
                                        );

                                        if (item.followed===true)
                                        {
                                            try {
                                                await deleteFollowing({
                                                    idUser: idUser,
                                                    idUserFollowing: item.idUserFollower,
                                                });
                                                console.log("DELETE FOLLOWING SUCCESSFULLY !");
                                                } catch (error) {
                                                console.error("Failed to delete user following:", error);
                                            }
                                            try {
                                                await deleteFollowerByIdUserIdUserFollower({
                                                    idUser: item.idUserFollower,
                                                    idUserFollower: idUser,
                                                });
                                                console.log("DELETE FOLLOWER SUCCESSFULLY !");
                                                } catch (error) {
                                                console.error("Failed to delete user follower:", error);
                                            }
                                            
                                        }
                                        else {
                                                // Nếu chưa theo dõi → nhấn sẽ theo dõi
                                            try {
                                                await addFollowing({
                                                    user: idUser,
                                                    userFollowing: item.idUserFollower,
                                                    nameUserFollowing: item.nameFollower, 
                                                });
                                                console.log("ADD FOLLOWING SUCCESSFULLY!");
                                                } catch (error) {
                                                console.error("Failed to follow:", error);
                                                }
                                                
                                            try {
                                                await addFollower({
                                                    idUserFollower: idUser,
                                                    nameUserFollower: nameUserRecent,
                                                    idUser: item.idUserFollower, 
                                                });
                                                console.log("ADD FOLLOWER SUCCESSFULLY!");
                                                } catch (error) {
                                                console.error("Failed to follow:", error);
                                            }
                                        }
                                            
                                            
                                    }}
                                    style= 
                                    {{
                                        //backgroundColor: "#000", 
                                        backgroundColor: item.followed ? "#fff" : "#000",
                                        borderRadius: 10, height: 40, width: 90, justifyContent: "center",
                                        borderWidth: item.followed ? 1 : 0,
                                        borderColor: item.followed ? "#000" : "transparent"
                                    }}
                                    >
                                    <Text 
                                        style= {{
                                            //color: "#fff", 
                                            color: item.followed ? "#000" : "#fff", 
                                            fontSize: 17, textAlign: "center"
                                        }}>
                                            {item.followed ? "Followed" : "Follow"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                            
                </View>
       
    );
}

export default Followers;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerProfile: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 3,
        height: 50,
        justifyContent: "center"
    },
    headerNameUser: {
        fontSize: 24,
        fontWeight: "500",
        color: "black",
        position: "absolute",
        right: 0,
        left: 0,
        textAlign: "center",
    },
    headerIconGoBack: {
        height: 27, width: 27, opacity: 0.6 ,
    },
    search_outline_view: {
        // justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        // position: "relative",
        marginTop: 13,
        backgroundColor: "#EBEBEB",
        borderRadius: 20,
        paddingVertical: 4,
        marginHorizontal: 15,
        flexDirection: "row"
    },
    search_icon: {
        width: 20,
        height: 20,
        opacity: 0.3,
        // position: "absolute",
        zIndex: 1,
        // left: 25,
        // marginLeft: 18,
        // marginRight: 18,
        marginHorizontal: 18
    },
    search_outline_input : {
        // width: "94%",
        
        alignItems: "center",
        
        fontSize: 15,
        padding: 8,
        // paddingLeft: 40,
    }
});