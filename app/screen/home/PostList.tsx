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

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{

// interface PostListProps {
//   postList: PostType[];
// }

// const PostList: React.FC<PostListProps> = ({ postList }) => {
//   const renderPost = ({ item }: { item: PostType }) => (
//     <View>
//       <ScrollView>
//         {/* <Post item={item} /> */}
//         <PostContent item={item} />
//       </ScrollView>
//     </View>
//   );

// return (
//   <FlatList
//     data={postList}
//     renderItem={renderPost}
//     keyExtractor={item => item.id}
//     showsVerticalScrollIndicator={false}
//   />
// );

// }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

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

  

  console.log("THIS IS POST LIST");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  // const [likesCount, setLikesCount] = useState(0);
  //
  // const handleLike = () => {
  //   if (isLiked) {
  //     setLikesCount((prev) => prev - 1);
  //   } else {
  //     setLikesCount((prev) => prev + 1);
  //   }
  //   setIsLiked(!isLiked);
  // };
  const handleLike = async (postId: string) => {
    let updatedPost: { idPost: number; likes: number } | null = null;

    setPostsUser((prevPosts) =>
      prevPosts.map((post) => {
        if (post.idPost === postId) {
          console.log("ID POST: " + post.idPost);
          console.log("LIKES: " + post.likes);

          const updatedLiked = !post.isLiked;
          const updatedLikesCount = post.likesCount + (updatedLiked ? 1 : -1);

          console.log("UPDATE LIKES: " + updatedLikesCount);
          // Lưu thông tin để cập nhật sau
          updatedPost = {
            idPost: Number(post.idPost),
            likes: updatedLikesCount,
          };
          return {
            ...post,
            isLiked: updatedLiked,
            likesCount: updatedLikesCount,
          };
        }
        return post;
      })
    );
    if (updatedPost) {
      try {
        console.log("Sending to API:", updatedPost);
        await updatePost(updatedPost);
        console.log("Update likescount in Post successfully !")
      } catch (error) {
        console.error("Lỗi khi cập nhật like:", error);
      }
    }
  };

  //====================== POSTS =======================

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

  // useEffect(() => {
  useFocusEffect(
  useCallback(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPost();
        const posts = response.data;

        // const postsWithUser = [];

        console.log("------------------POST-----------------");
        console.log(posts);

        console.log("------------------POST DETAILS-----------------");
        for (const post of posts) {
          const userResponse = await getOneUserById({ idUser: post.idUser });
          const user = userResponse.data;
          const cmtResponse = await getAllCommentWithIdPost({ idPost:  post.idPost});


          const postUser = {
            idPost: post.idPost,
            image: post.image,
            likes: post.likes,
            // number_of_comments: post.number_of_comments,
            number_of_comments: cmtResponse.data.length,
            description: post.description,
            tags: post.tags,
            // created_at: post.created_at,
            created_at: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),

            idUser: post.idUser,
            name: user.name,
            avatar: user.avatar,
            isLiked: false, // thêm
            likesCount: post.likes, // thêm
          };

          postsWithUser.push(postUser);
        }

        console.log("/////////////////HIIIIIII============");
        console.log("✅ Posts with user info:", postsWithUser);
        setPostsUser(postsWithUser);
      } catch (error) {
        console.error("❌ Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []));

  const [numColumns, setNumColumns] = useState(1); 

  const handleUpdatePost = (postId: string, newLikes: number, newCmtCount: number) => {
    setPostsUser((prev) =>
      prev.map((post) =>
        post.idPost === postId
          ? { ...post, likesCount: newLikes, number_of_comments: newCmtCount }
          : post
      )
    );
  };


  return (
    <>
      <FlatList
        //data={postsWithUser}
        key={numColumns} // 💡 Thêm dòng này
        data={postsUser}
        renderItem={({ item }: { item: any }) => (
          // <View>
          //   <Image
          //     style={{ height: 130, width: 132, marginBottom: 3, marginRight: 3 }}
          //     source={{ uri: item.image }}
          //   />
          // </View>
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
                    {/* {item.user.name}{" "} */}
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
              {/* <TouchableOpacity
              style={styles.statButton}
              onPress={handleLike}
              activeOpacity={0.7}
            >
              {isLiked ? (
                <LikedIcon width={24} height={24} />
              ) : (
                <LikeIcon width={24} height={24} />
              )}
              <Text style={styles.statText}>{likesCount}{item.likes} likes</Text>
            </TouchableOpacity> */}
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
                onPress={() => {
                  const updatedItem = postsUser.find((post) => post.idPost === item.idPost);
                  navigation.navigate("PostListDetails", {
                    item: updatedItem || item,
                    onUpdatePost: handleUpdatePost
                  })
                }}
                
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
