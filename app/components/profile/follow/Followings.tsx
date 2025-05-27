import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {FlatList, Image,ImageSourcePropType,Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Platform, Text } from "react-native";
import { useUser } from "../../../screen/UserContext";
import { addFollower, addFollowing, checkIdUser_IdUserFollower, checkIdUser_IdUserFollowing, deleteFollowerByIdUserIdUserFollower, deleteFollowing, getAllFollowersWithIdUser, getAllFollowingWithIdUser, getOneUserById } from "../../../nestjs/api";
import { StackNavigationProp } from "@react-navigation/stack";



type UserFollowingDetail = {
    idFollowing: string,
    idUserFollowing: string,
    nameFollowing: string;
    avatarFollowing: string;
    //idUser: number;
};
type UserFollowerDetailWithStatus = UserFollowingDetail & {
  followed: boolean;
};

function Followings() {
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


    // ===== FETCH FOLLOWING =====
    const [following, setFollowing] = useState<UserFollowingDetail[]>([]);
    const followersWithUserFollowerDetail:
    {
        idFollowing: any,
        idUserFollowing: any,
        nameFollowing: any,
        avatarFollowing: any,
        //idUser: any,
      }[] = [];
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                //console.log("aaaaaaaaaaaaaaaaaa")
                const response = await getAllFollowingWithIdUser({user: idUser});
                
                const followingList = response.data
                //console.log("Fetched followers listtttttttttttt:", followersList);

                //console.log("------------------FOLLOWER DETAILS-----------------");
                for (const following of followingList) {
                    // const userResponse = await getOneUserById({ user: follower.userFollower });
                    // const user_follower = userResponse.data;
                    // console.log("user_follower: ",user_follower)
                    const userFollower = {
                        idFollowing: following._id,
                        idUserFollowing: following.userFollowing._id,
                        nameFollowing: following.userFollowing.name,
                        avatarFollowing: following.userFollowing.avatar,
                    };

                    followersWithUserFollowerDetail.push(userFollower);
                    // console.log("aaaaaaaaaaaaaaaaa")
                }
                //console.log("✅ Followers with user info:", followersWithUserFollowerDetail);
                setFollowing(followersWithUserFollowerDetail);
                console.log("FETCH FOLLOWING",following)

            } catch (error) {
                console.error("Failed to fetch followings w id user:", error);
            }
        };
        fetchFollowers();
    }, []);
    
    // ----- CLICK IN EACH FOLLOWER -----
    const clickAnyFolowing = (following: {
        idFollowing: any;
        idUserFollowing: any;
        nameFollowing: any;
        avatarFollowing: any;
    }) => {
        console.log("You have just click on follower:", following);
        // Bạn có thể điều hướng tới profile tại đây nếu cần
        // navigation.navigate('ProfileScreen', { idUser: follower.idUser });
    };

    // ----- FOLLOW STATUS -----
    // const [followersWithStatus, setFollowersWithStatus] = useState<UserFollowerDetailWithStatus[]>([]);
    // useEffect(() => {
    //     const fetchFollowStatus = async () => {
    //         const updatedFollowers = await Promise.all(
    //             following.map(async (item) => {
    //                 try {
    //                     console.log("Checking follow status for:", {
    //                         idUser: idUser,
    //                         idUserFollowing: item.idUserFollowing,
    //                     });

    //                     const res = await checkIdUser_IdUserFollowing({
    //                         idUser: idUser,  // người được theo dõi
    //                         idUserFollowing: item.idUserFollowing, // người đang theo dõi
    //                     });
    //                     console.log("abcbkasbkajb")
    //                     return { ...item, followed: res.data.exists };
    //                 } catch (err) {
    //                     console.error("Error checking follow status", err);
    //                     return { ...item, followed: false }; // fallback nếu lỗi
    //                 }
    //             })
    //         );
    //         setFollowersWithStatus(updatedFollowers);
    //     };

    //     if (following.length > 0) {
    //         fetchFollowStatus();
    //     }
    // }, [following]);

    // const [searchText, setSearchText] = useState('');
    // const filteredFollowers = followersWithStatus.filter(follower =>
    //     follower.nameFollowing.toLowerCase().includes(searchText.toLowerCase())
    // );
    const [searchText, setSearchText] = useState('');
    const filteredFollowing = following.filter(following =>
        following.nameFollowing.toLowerCase().includes(searchText.toLowerCase())
    );



    return (
        <View style={styles.container}>
            <View style={styles.headerProfile}>
                <View style={{ flexDirection: "row", alignItems: "center",position: "relative",}}
                >
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
                    // placeholder="Search"
                    // placeholderTextColor="#909090"
                    // style={styles.search_outline_input}
                    placeholder="Search"
                    placeholderTextColor="#909090"
                    style={styles.search_outline_input}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            
                    <FlatList
                        //data={followers}
                        //data= {followersWithStatus}
                        data={filteredFollowing}
                        keyExtractor={(item) => item.idFollowing.toString()}
                        contentContainerStyle={{
                            backgroundColor: '#ffffff',
                            borderTopEndRadius: 25,
                            borderTopStartRadius: 25,
                            paddingTop: 30,
                            //paddingBottom: 20,
                        }}
                        renderItem={({ item }) => (
                            <View 
                                //key={follower.idFollower || index}
                                style= {{paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15}}
                                >
                                <TouchableOpacity 
                                    onPress={() => 
                                        {
                                            clickAnyFolowing(item)
                                            navigation.navigate("UserProfileFollow", {item})
                                        }
                                    }
                                    style= {{ flexDirection: "row",width: 270, alignItems: "center"}}
                                    >
                                    <Image
                                        style= {{alignSelf: 'center', height: 70, width: 70, marginRight: 10, borderRadius: 50}} 
                                        source={
                                            item.avatarFollowing
                                                ? { uri: item.avatarFollowing }
                                                : require('../../../../assets/images/image/profile_user/add_post_story/new-story.png')
                                        }
                                        />
                                    <Text style= {{fontSize: 18, marginLeft: 10, }}>{item.nameFollowing}</Text>
                                </TouchableOpacity>
                                
                                {/* <TouchableOpacity 
                                    onPress={async () => {
                                        const updatedFollowed = !item.followed;

                                        // Cập nhật UI ngay lập tức (tạm thời)
                                        setFollowersWithStatus(prev =>
                                            prev.map(f =>
                                            f.idFollowing === item.idFollowing ? { ...f, followed: updatedFollowed } : f
                                            )
                                        );

                                        if (item.followed===true)
                                        {
                                            try {
                                                await deleteFollowing({
                                                    idUser: idUser,
                                                    idUserFollowing: item.idUserFollowing,
                                                });
                                                console.log("DELETE FOLLOWING SUCCESSFULLY !");
                                                } catch (error) {
                                                console.error("Failed to delete user following:", error);
                                            }
                                            try {
                                                await deleteFollowerByIdUserIdUserFollower({
                                                    idUser: item.idUserFollowing,
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
                                                    userFollowing: item.idUserFollowing,
                                                    nameUserFollowing: item.nameFollowing, 
                                                });
                                                console.log("ADD FOLLOWING SUCCESSFULLY!");
                                                } catch (error) {
                                                console.error("Failed to follow:", error);
                                                }
                                                
                                            try {
                                                await addFollower({
                                                    idUserFollower: idUser,
                                                    nameUserFollower: nameUserRecent,
                                                    idUser: item.idUserFollowing, 
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
                                </TouchableOpacity> */}
                            
                            </View>
                        )}
                    />
                            
                </View>
       
    );
}

export default Followings;



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