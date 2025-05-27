import React, { useEffect, useState } from "react";
import {
  View,
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
import { getAllPost, getOneUserById } from "../../nestjs/api";



type PostUser = {
  idPost: string;     // hoặc number, tùy vào dữ liệu thực tế
  image: string;
  idUser: string;
  name: string;
};


export type PostType = {
  id: string;
  user: {
    name: string;
    avatar: string;
    group: string;
  };
  timeAgo: string;
  content: {
    text?: string;
    image?: string;
  };
  stats: {
    likes: number;
    comments: number;
  };
};


interface PostProps {
  item: PostType;
}

const Post: React.FC<PostProps> = ({ item }) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.stats.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  
  //====================== POSTS =======================
  // const [postsUser, setPostsUser] = useState([]);
  // const [users, setUsers] = useState('');
  //     useEffect(() => {
  //         const fetchPosts = async () => {
  //             try {
  //                 const response = await getAllPost();
  //                 setPostsUser(response.data);
  //                 console.log("===================================================")
  //                 //console.log("Fetched POSTS IN HOME DASHBOARD:", response.data);

  //                 console.log("Fetched POSTS (idPost, image, idUser):");

  //                 response.data.forEach(async (post: any) => {
  //                   console.log({
  //                     idPost: post.idPost,
  //                     image: post.image,
  //                     idUser: post.idUser
  //                   });
  //                   const responseUserId = await getOneUserById({idUser:  post.idUser});
  //                   setUsers(responseUserId.data);
                   
  //                   console.log({
  //                     idUser: responseUserId.data.idUser,
  //                     name: responseUserId.data.name
  //                   });


  //                 });
  //             } catch (error) {
  //                 console.error("Failed to fetch posts:", error);
  //             }
  //         };

  //         fetchPosts();
  //     }, []);

  



// const [postsUser, setPostsUser] = useState([]);
//       useEffect(() => {
//       const fetchPosts = async () => {
//         try {
//           const response = await getAllPost();
//           const posts = response.data;

//           console.log("Fetched POSTS (idPost, image, idUser, name):");

//           for (const post of posts) {
//             const userResponse = await getOneUserById({ idUser: post.idUser });
//             const user = userResponse.data;

//             console.log({
//               idPost: post.idPost,
//               image: post.image,
//               idUser: post.idUser,
//               name: user.name,
//             });
//           }

//           setPostsUser(posts);
//         } catch (error) {
//           console.error("Failed to fetch posts:", error);
//         }
//       };

//       fetchPosts();
//     }, []);

// const [postsUser, setPostsUser] = useState([]);
  const [postsUser, setPostsUser] = useState<PostUser[]>([]);
  const postsWithUser: ((prevState: PostUser[]) => PostUser[]) | { idPost: any; image: any; idUser: any; name: any; }[] = [];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPost();
        const posts = response.data;

        // const postsWithUser = [];

        for (const post of posts) {
          const userResponse = await getOneUserById({ user: post.idUser });
          const user = userResponse.data;

          const postUser = {
            idPost: post.idPost,
            image: post.image,
            idUser: post.idUser,
            name: user.name,
          };

          postsWithUser.push(postUser);
        }
        
        console.log("[Post] Posts with user info:", postsWithUser);
        setPostsUser(postsWithUser);
      } catch (error) {
        console.error("❌ Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);



  //     const idFake= 1;
  //     const [users, setUsers] = useState([]);
  //     useEffect(() => {
  //         const fetchUsers = async () => {
  //             try {
  //                 const responseUserId = await getOneUserById({idUser: idFake});
  //                 setUsers(responseUserId.data);
  //                 console.log("=======================")
  //                 //console.log("Fetched POSTS IN HOME DASHBOARD:", response.data);

  //                 console.log("Fetched USERS: (idUser)");

  //                 // responseUserId.data.forEach((users: any) => {
  //                   console.log({
  //                     // idUser: users.idUser,
  //                     // name: users.name
  //                     idUser: responseUserId.data.idUser,
  //               name: responseUserId.data.name
  //                   // });
  //                 });
  //             } catch (error) {
  //                 console.error("Failed to fetch users:", error);
  //             }
  //         };

  //         fetchUsers();
  //     }, []);





  // const [postsUser, setPostsUser] = useState([]);
  // const [userMap, setUserMap] = useState<{ [key: number]: string }>({});

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await getAllPost();
  //       const posts = response.data;
  //       console.log("Dữ liệu gốc từ API:", posts); // Kiểm tra dữ liệu gốc
  //       setPostsUser(posts);

  //       console.log("=======================");
  //       console.log("Fetched POSTS (idPost, image, idUser, name):");

  //       const userNameMap: { [key: number]: string } = {};

  //       for (const post of posts) {
  //         const { idPost, image, idUser } = post;

  //         // Nếu chưa có name cho idUser, thì gọi API
  //         if (!userNameMap[idUser]) {
  //           try {
  //             const userRes = await getOneUserById({ idUser });
  //             const name = userRes.data?.name || "Unknown";
  //             userNameMap[idUser] = name;
  //           } catch (err) {
  //             console.error(`Error fetching user ${idUser}`, err);
  //             userNameMap[idUser] = "Unknown";
  //           }
  //         }

  //         // In ra
  //         console.log({
  //           idPost,
  //           image,
  //           idUser,
  //           name: userNameMap[idUser],
  //         });
  //       }

  //       // Lưu lại map để dùng sau nếu cần
  //       setUserMap(userNameMap);
  //     } catch (error) {
  //       console.error("Failed to fetch posts:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);


  

  return (
    <View style={styles.postContainer}>
      <Modal
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
            source={{ uri: item.content.image }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>
              {item.user.name}{" "}
              
              <Text style={styles.inGroup}>in {item.user.group}</Text>
            </Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.moreButton}>...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {item.content.image && (
          <TouchableOpacity onPress={() => setIsImageModalVisible(true)}>
            <Image
              source={{ uri: item.content.image }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        {item.content.text && (
          <Text style={styles.postText}>{item.content.text}</Text>
        )}
      </View>

      <View style={styles.postStats}>
        <TouchableOpacity
          style={styles.statButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          {isLiked ? (
            <LikedIcon width={24} height={24} />
          ) : (
            <LikeIcon width={24} height={24} />
          )}
          <Text style={styles.statText}>{likesCount} likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton} activeOpacity={0.7}>
          <CommentIcon width={24} height={24} />
          <Text style={styles.statText}>{item.stats.comments} comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  postContainer: {
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

export default Post;
