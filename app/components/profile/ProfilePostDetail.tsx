import {
    Button,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Platform, Text, Image, FlatList } from "react-native";
// import { typeData, UserData } from "../../../utils/UserData";
import { useCallback, useEffect, useRef, useState } from "react";
import { typeData } from "../../utils/UserData";
import { addComment, getAllCommentWithIdPost, getAllPost, getOneUserById, updatePost, updatePostCmt } from "../../nestjs/api";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../../screen/UserContext";
import LikeIcon from "../../../assets/images/home/likeIcon.svg";
import LikedIcon from "../../../assets/images/home/likedIcon.svg";
import CommentIcon from "../../../assets/images/home/commentIcon.svg";



type CommentUser = {
    idPost: string;
    comment: string;
    created_at: string;
    idUser: string;
    name: string;
    avatar: string;
}

function ProfilePostDetail() {
    
    const { idUser } = useUser();
    const [nameRecent, setNameRecent] = useState('')
    const [avtRecent, setAvtRecent] = useState('')
    const idUserRecent= idUser;
    console.log(idUserRecent);

    // ----------- GET NAMERECENT, AVTRECENT FROM IDUSER -------------------
    useFocusEffect(
        useCallback(() => {
        const fetchUserRecent = async () => {
            try {
            // Giả sử selectedItem được truyền từ props hoặc state
            const res = await getOneUserById({ user: idUserRecent });
            const user = res.data;

            const userRecent = {
                name: user.name,
                avatar: user.avatar,
            };
            setNameRecent(user.name);
            setAvtRecent(user.avatar);
            } catch (err) {
            console.error("Lỗi khi lấy user recent:", err);
            }
        };

        fetchUserRecent();   
        }, [idUserRecent]) 
    );
    

    // ----------- INFORMATION OF EACH POST -------------------
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "ProfilePostDetail"> = useRoute();

    console.log("---------------- PARAMS ITEM OF PROFILE POST DETAIL --------");
    //console.log(route.params.item)
    const selectedItem = route.params.item;

    console.log("ID POST: " + selectedItem._id);
    console.log("IMAGE POST: " + selectedItem.image);
    console.log("DESCRIPTION: " + selectedItem.description);
    console.log("TAGS: " + selectedItem.tags);
    console.log("LIKES: " + selectedItem.likes);
    console.log("NUMBER OF COMMENTS: " + selectedItem.number_of_comments);
    console.log("CREATE_AT: " + selectedItem.created_at);
    console.log("ID USER: " + idUser); // id of user create post
    console.log("CREATE_AT: " + selectedItem.created_at);
    console.log("USER AVATAR: " + selectedItem.user.avatar);
    console.log("USER NAME: " + selectedItem.user.avatar);
    const name = selectedItem.user.name;
    const avatar = selectedItem.user.avatar;
    
    const create_atPost = formatDistanceToNow(new Date(selectedItem.created_at), {
        addSuffix: true,
    });
    console.log(create_atPost);
  
    // ----------- UPLOAD COMMENT WITH COMMENT, IDPOST, IDUSER -------------------
    const [cmtsUser, setCmtsUser] = useState<CommentUser[]>([]);
        const cmtsWithUser:
        {
            idPost: any;
            comment: any;
            created_at: any;
            idUser: any; // id of user comment
            name: any;
            avatar: any;
        }[] = [];
    
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        const fetchCmts = async () => {
            try {
                const response = await getAllCommentWithIdPost({idPost: selectedItem._id})
                const cmts = response.data;
    
    
                console.log("------------------COMMENTS DETAILS-----------------");

                console.log("CMT W ID POST: ", cmts)
                for (const cmt of cmts) {
                const cmtUser= {
                        idPost: cmt._id,
                        comment: cmt.comment,
                        created_at: formatDistanceToNow(new Date(cmt.created_at), { addSuffix: true }),
                        idUser: cmt.user._id, // id of user create comment
                        name: cmt.user.name,
                        avatar: cmt.user.avatar,
                }
                cmtsWithUser.push(cmtUser);
            }
                   
                
    
            console.log("✅ Comments with user info:", cmtsWithUser);
            setCmtsUser(cmtsWithUser);
          } catch (error) {
            console.error("❌ Failed to fetch cmts w/ id post:", error);
          }
        };
    
        fetchCmts();
    }, [trigger]);
   
   // -------------------- UPLOAD CMT -------------------------
    const [comment, setComment] = useState('')
    const upLoatCmt = async () => {
        try {
            const res = await addComment({ 
                comment,
                idPost: selectedItem._id,
                idUser: idUser
            });
                console.log("UPLOAD COMMENT SUCCESSFULLY !")
                setComment('')
                setTrigger(prev => !prev);

                // Cập nhật DB (nếu cần thiết)
                await updatePostCmt({
                    id: selectedItem._id,
                    number_of_comments: cmtsUser.length + 1
                });
            } catch (err) {
            console.error("Lỗi khi upload cmt:", err);
        }
    };

    // ------------------- HANDLE LIKES ------------------------
    const [isLiked, setIsLiked] = useState(false); // Mặc định là chưa like
    const [likeCount, setLikeCount] = useState(selectedItem.likes); // Thêm state đếm like
    const handleLike = async (postId: string) => {
        let newLikeCount = likeCount;

         if (!isLiked) {
            newLikeCount += 1;
            setIsLiked(true);
        } else {
            newLikeCount -= 1;
            setIsLiked(false);
        }
        setLikeCount(newLikeCount); // Cập nhật hiển thị giao diện
        console.log("LIKE COUNT",likeCount)
        await updatePost({
            id: selectedItem._id,
            likes: newLikeCount
        })
        console.log("UPDATE LIKES SUCCESSFULLY !!!")
    };
    
    const scrollViewRef = useRef<ScrollView>(null);;


    return (
        <ScrollView 
            ref={scrollViewRef}
            style={styles.scrlview}>
            {/* ======  HEADER ====== */}
            <View style={{ flexDirection: "row", position: "relative", height: 50}}>
                <TouchableOpacity 
                    style= {{flexDirection: "row", alignItems: "center"}}
                    onPress={() => navigation.goBack()}
                    >
                    <Image style={{ height: 17, width: 30, marginRight: 3}} source={require("../../../assets/images/image/profile_user/profile_post_detail/left-chevron.png")} />
                    <Text style= {{fontSize: 18}}>Go Back</Text>
                </TouchableOpacity>
                <Text style= {{position: "absolute", left: 5, right: 0, textAlign: "center",top: "50%",transform: [{ translateY: -13 }], fontSize: 20, fontWeight: "500"}}>vibely.balance</Text>
                <Image style={{ position: "absolute",height: 30, width: 30, right: 12, top: "50%",transform: [{ translateY: -15 }],}} source={require("../../../assets/images/image/profile_user/profile_post_detail/flower.png")} />
            </View>

            {/* ======  HEADER CONTENT ====== */}
            <View style= {{flexDirection: "row",marginTop: 20, marginHorizontal: 12 , }}>
                <Image
                    style={{ height: 70, width: 70, borderRadius: 50}}
                    source={{uri: avatar}}
                />
                <View>
                    <View style= {{ justifyContent: "space-between", width: 315,position: "relative",}}>
                        <View>
                            <View style= {{flexDirection: "row", height: 35, alignItems: "center", marginLeft: 7}}>
                                <Text style= {{fontSize: 18, marginLeft: 10, fontWeight: 500, marginRight: 5,}}>
                                    {name}
                                </Text>
                                <Image
                                    style={{ height: 25, width: 25, borderRadius: 50}}
                                    source={require("../../../assets/images/image/profile_user/add_post_story/right-arrow.png")}
                                />
                                <Text style= {{fontSize: 18, marginLeft: 2, fontWeight: 500, marginRight: 5, color: "#999"}}>
                                    in {selectedItem.tags}
                                </Text>
                                {/* <TouchableOpacity style= {{backgroundColor: "#000", borderRadius: 10, right: 0, position: "absolute"}}>
                                    <Text style= {{color: "#fff", padding: 7, paddingHorizontal: 15, fontSize: 17}}>Follow</Text>
                                </TouchableOpacity> */}
                            </View>
                            <Text style= {{color: "#ccc", fontSize: 16, marginLeft: 15}}>{create_atPost}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* ======  CONTENT ====== */}
            <View style= {{marginHorizontal: 15}}>
                <Text style= {{fontSize: 18, marginLeft: 3, marginTop: 7, fontWeight: 400, marginRight: 5,}}>
                    {selectedItem.description}
                </Text>
                <Image style={{ height: 400, width: "100%", marginBottom: 3, marginRight: 3, marginTop: 12, borderRadius: 10}} source={{ uri: selectedItem.image }} />
                
                {/* === LIKES, CMTS, SHARE === */}
                <View style= {{marginTop: 15, flexDirection: "row", alignItems: "center"}}>
                    <View style= {{flexDirection: "row", marginRight: 30}}>
                        <TouchableOpacity onPress={() => handleLike(selectedItem.idPost)}>
                            <Image 
                                style={{ height: 27, width: 27, }} 
                                source={
                                    isLiked
                                        ? require("../../../assets/images/image/profile_user/profile_post_detail/heart-filled.png")
                                        : require("../../../assets/images/image/profile_user/profile_post_detail/heart-outline.png")
                                }
                                //source={require("../../../assets/images/image/profile_user/profile_post_detail/heart-outline.png")} 
                            />
                        </TouchableOpacity>
                        <Text style= {{fontSize: 18, marginLeft: 4,  fontWeight: 400, marginRight: 5,}}>
                            {likeCount}
                        </Text>
                    </View>

                    <View style= {{flexDirection: "row", marginRight: 30}}>
                        <TouchableOpacity onPress={() => {
                            scrollViewRef.current?.scrollToEnd({ animated: true });
                        }}>
                            <Image style={{ height: 29, width: 28,  }} source={require("../../../assets/images/image/profile_user/profile_post_detail/comment.png")} />
                        </TouchableOpacity>
                        <Text style= {{fontSize: 18, marginLeft: 4,  fontWeight: 400, marginRight: 5,}}>
                            {/* {selectedItem.number_of_comments} */}
                             {cmtsUser.length}
                        </Text>
                    </View>
                    <View style= {{flexDirection: "row", marginRight: 30}}>
                        <Image style={{ height: 26, width: 26,  }} source={require("../../../assets/images/image/profile_user/profile_post_detail/share.png")} />
                    </View>                    
                </View>
                {/* === LIST COMMENTS === */}
                <View style= {{marginTop: 15}}>
                    <View style= {{borderWidth: 0.5, borderColor: "#ccc"}}></View>
                    <Text style= {{color: "#000", fontSize: 19, marginTop: 10,marginBottom: 10, fontWeight: "500"}}>Vibely reply</Text>
                    <View style= {{borderWidth: 0.5, borderColor: "#ccc"}}></View>
                    {cmtsUser.map((item, index) => (
                        <View key={index}>
                        <View style= {{flexDirection: "row",marginTop: 20 }}>
                            <Image
                                style={{ height: 55, width: 55, borderRadius: 50}}
                                source={{uri: item.avatar}}
                            />
                            <View>
                                <View style= {{flexDirection: "row", justifyContent: "space-between", width: 315 }}>
                                    <View style= {{flexDirection: "row", height: 35, alignItems: "center", marginLeft: 7}}>
                                        <Text style= {{fontSize: 18, marginLeft: 10, fontWeight: 500, marginRight: 5,}}>
                                            {item.name}
                                        </Text>
                                        <Text style= {{color: "#ccc", fontSize: 16, marginLeft: 5}}>{item.created_at}</Text>
                                    </View>
                                </View>
                                <Text style= {{fontSize: 18, marginLeft: 15,  fontWeight: 400, marginRight: 5, maxWidth: 309}}>
                                    {item.comment}
                                </Text>
                                {/* <View style= {{marginTop: 12,marginLeft: 15, flexDirection: "row", alignItems: "center"}}>
                                    <View style= {{flexDirection: "row", marginRight: 30}}>
                                        <Image style={{ height: 20, width: 20, }} source={require("../../../assets/images/image/profile_user/profile_post_detail/heart-outline.png")} />
                                        <Text style= {{fontSize: 18, marginLeft: 4,  fontWeight: 400, marginRight: 5,}}>
                                            {selectedItem.likes}
                                        </Text>
                                    </View>
                                    <View style= {{flexDirection: "row", marginRight: 30}}>
                                        <Image style={{ height: 22, width: 22,  }} source={require("../../../assets/images/image/profile_user/profile_post_detail/comment.png")} />
                                        <Text style= {{fontSize: 18, marginLeft: 4,  fontWeight: 400, marginRight: 5,}}>
                                            {selectedItem.number_of_comments}
                                        </Text>
                                    </View>
                                    <View style= {{flexDirection: "row", marginRight: 30}}>
                                        <Image style={{ height: 20, width: 20,  }} source={require("../../../assets/images/image/profile_user/profile_post_detail/share.png")} />
                                    </View>                    
                                </View> */}
                            </View>
                        </View>
                        </View>
                    ))}
                </View>
                
            </View>

            {/* ===== TEXT INPUT COMMENT ===== */}
            <View style= {{backgroundColor: "#f5f5f5",  marginHorizontal: 13, borderRadius: 25, marginTop: 70, marginBottom: 30}}>
                <View style= {{flexDirection: "row", alignItems: "center", position :"relative"}}>
                    <View style={styles.viewAvtTxtInput}>
                        <Image
                            style={{ height: 39, width: 39, borderRadius: 50,}}
                            source={{uri: avtRecent}}
                        />
                    </View>
                    <View style= {{maxWidth: 280, marginLeft: 60}}>
                        <Text style= {{fontSize: 16, marginLeft: 14, fontWeight: 500, marginTop: 8,}}>
                            {nameRecent}
                        </Text>
                        <TextInput
                            value={comment} // thêm dòng này để TextInput sync với state
                            onChangeText= {setComment}
                            style={{ marginLeft: 10, fontSize: 15 ,maxWidth: 320,}}
                            placeholder="Add a few Vibes here:"
                            placeholderTextColor="#ccc"
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={upLoatCmt}
                        style={styles.touchUpload}>
                        <Image
                            style={styles.imgUpload}
                            source={require('../../../assets/images/image/profile_user/profile_post_detail/up-arrow.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfilePostDetail;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    statButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 5,
    },
    statText: {
        color: "#000",
    },

    scrlview: {
        paddingTop: 15, backgroundColor: "#fff" , flex: 1
    },

    viewAvtTxtInput: {
        height: 51, // 45 (image) + 2 * 3 (border)
        width: 51,
        borderRadius: 50,
        borderWidth: 2.5,
        borderColor: "#f08080",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 9,
        position: "absolute",
        top: 10
    },
    touchUpload : {
        position: "absolute", right:5, top: 15
    },
    imgUpload: {
        height: 39, width: 39, borderRadius: 50,
    }
});