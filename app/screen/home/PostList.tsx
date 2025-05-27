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
import { getAllCommentWithIdPost, getAllPost, getOneUserById, updatePost } from "../../nestjs/api";

import { formatDistanceToNow } from "date-fns";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";


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

  //console.log("THIS IS POST LIST");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  

  //====================== FETCH POSTS =======================
  const [postsUser, setPostsUser] = useState<PostUser[]>([]);
  // const postsWithUser:
  //   | ((prevState: PostUser[]) => PostUser[])
  //   | {
  //       idPost: any;
  //       image: any;
  //       idUser: any;
  //       name: any;
  //       avatar: any;
  //       likes: number;
  //       number_of_comments: any;
  //       description: any;
  //       tags: any;
  //       created_at: any;

  //       isLiked: any;
  //       likesCount: any;
  //     }[] = [];

  const [skipFetch, setSkipFetch] = useState(false);
  useFocusEffect(
  useCallback(() => {
    if (skipFetch) {
      console.log("⏭ Skip fetching posts...");
      return;
    }
    // const fetchPosts = async () => {
    //   const postsWithUser:
    // | ((prevState: PostUser[]) => PostUser[])
    // | {
    //     idPost: any;
    //     image: any;
    //     idUser: any;
    //     name: any;
    //     avatar: any;
    //     likes: number;
    //     number_of_comments: any;
    //     description: any;
    //     tags: any;
    //     created_at: any;

    //     isLiked: any;
    //     likesCount: any;
    //   }[] = [];
    //   try {
    //     const response = await getAllPost();
    //     const posts = response.data;

    //     // console.log("------------------POST-----------------");
    //     // console.log("FETCH POSTS: ", posts)

    //     //console.log("------------------POST DETAILS-----------------");
    //     for (const post of posts) {
    //       // const userResponse = await getOneUserById({ idUser: post.idUser });
    //       // const user = userResponse.data;
    //       const cmtResponse = await getAllCommentWithIdPost({ idPost:  post._id});

    //       const postUser = {
    //         idPost: post._id,
    //         image: post.image,
    //         likes: post.likes,
    //         number_of_comments: cmtResponse.data.length,
    //         description: post.description,
    //         tags: post.tags,
    //         // created_at: post.created_at,
    //         created_at: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
    //         idUser: post.user._id,
    //         name: post.user.name,
    //         avatar: post.user.avatar,
    //         isLiked: false, // thêm
    //         likesCount: post.likes, // thêm
    //       }; 

    //       postsWithUser.push(postUser);
    //     }
    //     //console.log("✅ Posts with user info:", postsWithUser);
    //     setPostsUser(postsWithUser);
    //   } catch (error) {
    //     console.error("❌ Failed to fetch posts:", error);
    //   }
    // };

    const fetchPosts = async () => {
    try {
      const response = await getAllPost();
      const posts = response.data;

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

      setPostsUser(postsWithUser);
    } catch (error) {
      console.error("❌ Failed to fetch posts:", error);
    }
  };

    fetchPosts();
  }, [skipFetch]));

  // ===================== HANDLE LIKE ======================
  // const handleLike = async (postId: string) => {
  //   setSkipFetch(true); // 👈 chặn refetch ngay sau like
  //   let updatedPost: { idPost: string; likes: number } | null = null;

  //   setPostsUser((prevPosts) =>
  //     prevPosts.map((post) => {
  //       if (post.idPost === postId) {
  //         console.log("ID POST: " + post.idPost);
  //         console.log("LIKES: " + post.likes);

  //         const updatedLiked = !post.isLiked;
  //         const updatedLikesCount = post.likesCount + (updatedLiked ? 1 : -1);

  //         console.log("UPDATE LIKES: " + updatedLikesCount);
  //         // Lưu thông tin để cập nhật sau
  //         updatedPost = {
  //           idPost: post.idPost,
  //           likes: updatedLikesCount,
  //         };
  //         return {
  //           ...post,
  //           isLiked: updatedLiked,
  //           likesCount: updatedLikesCount,
  //         };
  //       }
  //       return post;
  //     })
  //   );
  //   console.log("updatedPost after setPostsUser:", updatedPost);
  //   if (updatedPost) {
  //     console.log("UPDATED POST---------------------")
  //     try {

  //       console.log("Sending to APIIIIIIIIIIIIIIIII:", updatedPost);
  //       await updatePost(updatedPost);
  //       console.log("Update likescount in Post successfully !")
  //     } catch (error) {
  //       console.error("Lỗi khi cập nhật like:", error);
  //     }
  //   }
  //   // Sau vài giây mới cho phép fetch lại
  //   setTimeout(() => {
  //     setSkipFetch(false);
  //   }, 15000); // thời gian tuỳ bạn
  // };
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


  const [numColumns, setNumColumns] = useState(1); 

  return (
    <>
      <FlatList
        key={numColumns} // 💡 Thêm dòng này
        data={postsUser}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.postContainer}>
            {/* <Modal
            animationType="fade"
            transparent={true}
            visible={isImageModalVisible}
            onRequestClose={() => setIsImageModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => setIsImageModalVisible(false)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Modal> */}

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
                  //navigation.navigate("PostListDetails", {item})
                  navigation.navigate("PostListDetails", { idPost: item.idPost , idUser: item.idUser, isLike: item.isLiked})
                }
                
                style={styles.statButton} 
              >
                <CommentIcon width={24} height={24} />
                <Text style={styles.statText}>
                  {item.number_of_comments} comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.idPost.toString()}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // ❗ Tắt scroll riêng của FlatList
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
