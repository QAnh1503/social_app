import React, { useCallback } from "react";
import { FlatList, ScrollView, View } from "react-native";
import Post, { PostType } from "../../components/dashboard/Post";
import PostContent from "../../components/dashboard/PostContent";
// import DashboardHeader from '../../components/dashboard/DashboardHeader';

import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import LikeIcon from "../../../assets/images/home/likeIcon.svg";
import LikedIcon from "../../../assets/images/home/likedIcon.svg";
import CommentIcon from "../../../assets/images/home/commentIcon.svg";
import { getAllCommentWithIdPost, getAllPost, getOneUserById, getPostAdvices, updatePost } from "../../nestjs/api";

import { formatDistanceToNow } from "date-fns";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Stories from "../../components/dashboard/story/Stories";
const AiLogo = require('../../../assets/images/aiLogo.png')


type PostUser = {
  idPost: string; // hoặc number, tùy vào dữ liệu thực tế
  image: string;
  likes: number;
  number_of_comments: number;
  description: string;
  tags: string;
  // created_at: Date;
  created_at: string;

  idUser: string;
  name: string;
  avatar: string;
  // Thêm 2 dòng này:
  isLiked: boolean;
  likesCount: number;
};

function PostList() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [advices, setAdvices] = useState<any[] | null>(null);
  const [postsUser, setPostsUser] = useState<PostUser[]>([]);
  const postsWithUser:
    | ((prevState: PostUser[]) => PostUser[])
    | {
      idPost: any;
      image: any;
      idUser: any;
      name: any;
      avatar: any;
      likes: number;
      number_of_comments: any;
      description: any;
      tags: any;
      created_at: any;

      isLiked: any;
      likesCount: any;
    }[] = [];

  const [skipFetch, setSkipFetch] = useState(false);
  useFocusEffect(
    useCallback(() => {
      console.log('================== FETCH POSTS =======================')
      if (skipFetch) {
        console.log("⏭ Skip fetching posts...");
        return;
      }

      const fetchGetAdvices = async (captions: string[]) => {
        // const captions: string[] = []
        for (const post of postsWithUser) {
          captions.push(post.description)
        }


        const responseAdvices = await getPostAdvices(captions);

        console.log('[PostList] = = = response Advices = = =')
        console.log(responseAdvices.data.questions);

        setAdvices(responseAdvices.data.questions);
        console.log('abc')
      }


      const fetchPosts = async () => {
        try {
          const response = await getAllPost();
          const posts = response.data;
          const captions: string[] = [];


          const postsWithUser = posts.map((post: { _id: string; image: any; likes: any; number_of_comments: any; description: any; tags: any; created_at: string | number | Date; user: { _id: any; name: any; avatar: any; }; }) => {
            const oldPost = postsUser.find(p => p.idPost === post._id);
            return {
              idPost: post._id,
              image: post.image,
              likes: post.likes,
              number_of_comments: post.number_of_comments,
              description: post.description,
              tags: post.tags,
              created_at: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
              idUser: post.user._id,
              name: post.user.name,
              avatar: post.user.avatar,
              isLiked: oldPost ? oldPost.isLiked : false,  // Giữ lại trạng thái cũ nếu có
              likesCount: post.likes,
            };
          });

          for (const post of posts) {
            captions.push(post.description)
          }

          fetchGetAdvices(captions)
          setPostsUser(postsWithUser);
        } catch (error) {
          console.error("❌ Failed to fetch posts:", error);
        }
      };

      fetchPosts();
    }, [skipFetch]));

  const handleLike = async (postId: string) => {
    setSkipFetch(true);

    // Tìm post hiện tại
    const currentPost = postsUser.find(post => post.idPost === postId);
    if (!currentPost) {
      console.warn("Không tìm thấy bài post có id:", postId);
      return;
    }

    const updatedLiked = !currentPost.isLiked;
    const updatedLikesCount = currentPost.likesCount + (updatedLiked ? 1 : -1);

    const updatedPost = {
      id: postId,
      likes: updatedLikesCount,
    };

    // Cập nhật state
    setPostsUser((prevPosts) =>
      prevPosts.map((post) =>
        post.idPost === postId
          ? { ...post, isLiked: updatedLiked, likesCount: updatedLikesCount }
          : post
      )
    );

    console.log("Sending to API:", updatedPost);
    try {
      await updatePost(updatedPost);
      console.log("Update likescount in Post successfully!");
    } catch (error) {
      console.error("Lỗi khi cập nhật like:", error);
    }

    setTimeout(() => {
      setSkipFetch(false);
    }, 15000);
  };




  // useEffect(() => {
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchPosts = async () => {
  //       try {
  //         const response = await getAllPost();
  //         const posts = response.data;
  //         const captions: string[] = [];

  //         console.log("------------------POST-----------------");
  //         console.log("FETCH POSTS: ", posts)
  //         // const postsWithUser = [];

  //         if (postsWithUser.length > -1)
  //           postsWithUser.slice(postsWithUser.length, 1)
  //         console.log("------------------POST DETAILS-----------------");

  //         for (const post of posts) {
  //           // const userResponse = await getOneUserById({ idUser: post.idUser });
  //           // const user = userResponse.data;
  //           const cmtResponse = await getAllCommentWithIdPost({ idPost: post._id });

  //           let postUser = {
  //             idPost: post._id,
  //             image: post.image,
  //             likes: post.likes,
  //             // number_of_comments: post.number_of_comments,
  //             number_of_comments: cmtResponse.data.length,
  //             description: post.description,
  //             tags: post.tags,
  //             // created_at: post.created_at,
  //             created_at: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),

  //             idUser: post.idUser,
  //             name: post.user.name,
  //             avatar: post.user.avatar,
  //             isLiked: false, // thêm
  //             likesCount: post.likes, // thêm,
  //           };

  //           captions.push(post.description)
  //           postsWithUser.push(postUser);
  //         }



  //         fetchGetAdvices(captions)
  //         console.log(' = = = = = = = = = ')
  //         console.log("/////////////////HIIIIIII============");
  //         console.log("✅ Posts with user info:", postsWithUser);
  //         setPostsUser(postsWithUser);
  //       } catch (error) {
  //         console.error("❌ Failed to fetch posts:", error);
  //       }
  //     };

  //     fetchPosts();
  //     // fetchGetAdvices();
  //   }, []));

  const [numColumns, setNumColumns] = useState(1);

  return (
    <>
      <TouchableOpacity
        style={{ width: 60, height: 60, borderRadius: 10000, padding: 10, backgroundColor: '#FFF2EB', position: "absolute", zIndex: 100, right: 20, bottom: 60 }}
        onPress={() => { navigation.navigate('ChatBot', { backgroundInfo: '', question: '' }) }}
      >
        <Image style={{ width: 40, height: 40, borderRadius: 100 }} source={AiLogo}></Image>
      </TouchableOpacity>
      <FlatList
        key={numColumns} // 💡 Thêm dòng này
        data={postsUser}
        ListHeaderComponent={<Stories />}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <Image
                  //source={require("../../../assets/images/userAvatar/avatar.png")}
                  source={{ uri: item.avatar }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.userName}>
                    {item.name}{" "}
                    <Text style={styles.inGroup}>in {item.tags} Group</Text>
                  </Text>
                  <Text style={styles.timeAgo}>{item.created_at}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.moreButton}>...</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              {item.image && (
                <TouchableOpacity
                  onPress={() =>
                    //setIsImageModalVisible(true)}
                    setSelectedImage(item.image)
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              {/* {item.content.text && ( */}
              <Text style={styles.postText}>{item.description}</Text>
              {/* )} */}
            </View>

            <View style={styles.postStats}>
              <TouchableOpacity
                style={styles.statButton}
                onPress={() => handleLike(item.idPost)}
                activeOpacity={0.7}
              >
                {item.isLiked ? (
                  <LikedIcon width={24} height={24} />
                ) : (
                  <LikeIcon width={24} height={24} />
                )}
                <Text style={styles.statText}>{item.likesCount} likes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate("PostListDetails", { item })
                  //Use this line if we get any error with above line
                  navigation.navigate("PostListDetails", { idPost: item.idPost, idUser: item.idUser, isLike: item.isLiked })
                }

                style={styles.statButton}
              >
                <CommentIcon width={24} height={24} />
                <Text style={styles.statText}>
                  {item.number_of_comments} comments
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{ paddingStart: 20, paddingTop: 10 }}
              contentContainerStyle={{}}
            >
              {
                (advices) ? advices.at(index).map((element: any) => {
                  console.log(element)
                  return (
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('ChatBot', { backgroundInfo: `this is a post in a social media with these infomation:\n Username: ${item.name}\nPost at time: ${item.created_at}\nCaption (content of post): ${item.description}\nLikes:${item.likes}\ncomments number: ${item.number_of_comments}`, question: element.question }) }}
                    >
                      <View
                        style={{ borderRadius: 30, borderWidth: 2, padding: 10, marginRight: 10 }}
                      >
                        <Text>{element.question}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }) : <></>
              }
              <View style={{ width: 40, height: 1 }}></View>
            </ScrollView>
          </View>
        )}
        keyExtractor={(item) => item.idPost.toString()}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true} // ❗ Tắt scroll riêng của FlatList
        nestedScrollEnabled={true} // ✅ Cho phép lồng trong ScrollView
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={selectedImage !== null}
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            source={{ uri: selectedImage! }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default PostList;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginTop: 15,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: windowWidth,
    height: windowHeight,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentContainer: {
    marginLeft: 50,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
  },
  inGroup: {
    fontWeight: "400",
    color: "#666",
  },
  timeAgo: {
    color: "#666",
    fontSize: 12,
  },
  moreButton: {
    fontSize: 24,
    color: "#666",
  },
  postText: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  postStats: {
    flexDirection: "row",
    gap: 20,
    marginLeft: 50,
    marginTop: 10,
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
  icon: {
    width: 24,
    height: 24,
  },
});
