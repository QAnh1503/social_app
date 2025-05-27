import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Platform, Text } from "react-native";
import { useUser } from "../UserContext";
import { useCallback, useEffect, useState } from "react";
import { addQues, getAllQuesWithTags, getOneUserById } from "../../nestjs/api";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";

interface QuestionWithUser {
  idQues: number;
  question: string;
  idUser: number;
  tags: string;
  created_at: string;
  userName: string;
  avatar: string;
}

function CommunityGroupDetails() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "CommunityGroupDetails"> =
    useRoute();
  console.log(route.params.item);
  const tags = route.params.item;

  const { email, idUser, avatar, name } = useUser();
  // console.log("User email in UserProfile:", email);
  // console.log("User ID in UserProfile:", idUser);
  // console.log("User email in UserProfile:", avatar);
  // console.log("User ID in UserProfile:", name);
  // console.log("Community Groups DETAILS");
  const [avtUser, setAvtUser] = useState(avatar);
      
  useFocusEffect(
    useCallback(() => {
        const fetchUserAvatar = async () => {
        try {
            const res = await getOneUserById({ user: idUser });
            const avt = res.data.avatar;
            console.log("✅ Updated avatar:", avt);
            setAvtUser(avt);
        } catch (err) {
            console.error("❌ Lỗi khi lấy avatar:", err);
        }
      };
  
        fetchUserAvatar();
    }, []) 
  );


  const getImageByTag = (tags: string) => {
    switch (tags) {
      case "Food":
        return {
          big: require("../../../assets/images/image/community/foodBigImg.png"),
          small: require("../../../assets/images/image/community/foodSmallImg.png"),
        };
      case "Drink":
        return {
          big: require("../../../assets/images/image/community/drinkBigImg.png"),
          small: require("../../../assets/images/image/community/drinkSmallImg.png"),
        };
      case "Medicine":
        return {
          big: require("../../../assets/images/image/community/medicineBigImg.png"),
          small: require("../../../assets/images/image/community/medicineSmallImg.png"),
        };
      case "Recipe":
        return {
          big: require("../../../assets/images/image/community/recipeBigImg.png"),
          small: require("../../../assets/images/image/community/recipeSmallImg.png"),
        };
      case "Yoga":
        return {
          big: require("../../../assets/images/image/community/yogaBigImg.png"),
          small: require("../../../assets/images/image/community/yogaSmallImg.png"),
        };
      case "Gym":
        return {
          big: require("../../../assets/images/image/community/gymBigImg.png"),
          small: require("../../../assets/images/image/community/gymSmallImg.png"),
        };
      default:
        return {
          big: require("../../../assets/images/image/community/joggingBigImg.png"),
          small: require("../../../assets/images/image/community/joggingSmallImg.png"),
        };
    }
  };
  const { big, small } = getImageByTag(tags);


  const [numMems, setNumMems] = useState(0);

  // ====== FETCH QUESTION ======
  const [questionsWithUser, setQuestionsWithUser] = useState<
    QuestionWithUser[]
  >([]);
  const fetchQuestionsWithUser = async () => {
    try {
      const res = await getAllQuesWithTags({ tags: tags });

      const questions = res.data;
      console.log("ALL QUES W/ TAGS: ", res.data)

      let mems = new Set();

      const enrichedQuestions = await Promise.all(
        questions
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map(async (q: any) => {
          try {
            const userRes = await getOneUserById({ user: q.user._id });
            mems.add(q.user._id);

            const user = userRes.data;
            return {
              ...q,
              created_at: formatDistanceToNow(new Date(q.created_at), {
                addSuffix: true,
              }),
              userName: user.name,
              avatar: user.avatar,
            };
          } catch (err) {
            console.error("Lỗi khi lấy user:", err);
            return {
              ...q,
              userName: "Unknown",
              avatar: null,
            };
          }
        })
      );

      setQuestionsWithUser(enrichedQuestions);
      //console.log("Question w/ user:", enrichedQuestions);
      setNumMems(mems.size);
    } catch (error) {
      console.error("Lỗi khi lấy câu hỏi có tag Food:", error);
    }
  };

  useEffect(() => {
    fetchQuestionsWithUser();
  }, []);


  // ===== UPLOAD QUESTION =====
  const [comment, setComment] = useState("");
  const upLoatCmt = async () => {
    try {
      const res = await addQues({
        question: comment,
        user: idUser,
        tags: tags,
      });
      console.log("ADD QUESTION SUCCESSFULLY !");
      setComment("");
      await fetchQuestionsWithUser();
    } catch (err) {
      console.error("Error when upload ques:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewImgMainGroup}>
        <Image
          style={styles.imgBig}
          //source={require("../../../assets/images/image/community/foodBigImg.png")}
          source={big}
        />
        <Image
          style={styles.imgSmall}
          //source={require("../../../assets/images/image/community/foodSmallImg.png")}
          source={small}
        />
        <View style={styles.headerGroup}>
          <Text style={styles.tagCommunity}>{tags} community</Text>
          <View style={styles.viewContentMembers}>
            <Image
              style={styles.numMembers}
              source={require("../../../assets/images/image/community/members.png")}
            />
            <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
              {numMems} members
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewContentGroup}>
        <View style={styles.viewTextinputCmt}>
          <View style={styles.viewTextinputCmtComponents}>
            <View style={styles.viewAvtTextinputCmt}>
              <Image
                style={{ height: 39, width: 39, borderRadius: 50 }}
                source={{ uri: avtUser }}
              />
            </View>
            <View style={{ maxWidth: 280, marginLeft: 60 }}>
              <Text style={styles.nameTextinputCmt}>{name}</Text>
              <TextInput
                //onChangeText={handleDescriptionChange}
                value={comment} // thêm dòng này để TextInput sync với state
                onChangeText={setComment}
                style={styles.txtInputQues}
                placeholder="What's on your mind?"
                placeholderTextColor="#ccc"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              onPress={upLoatCmt}
              style={{ position: "absolute", right: 5, top: 15 }}
            >
              <Image
                style={{ height: 39, width: 39, borderRadius: 50 }}
                source={require("../../../assets/images/image/profile_user/profile_post_detail/up-arrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.line}></View>
        <View style={{ paddingHorizontal: 18 }}>
          <Text style={{ fontSize: 18, fontFamily: "serif", marginTop: 10 }}>
            What's on your mind?
          </Text>
          {/* <FlatList
                nestedScrollEnabled={true}
                data={questionsWithUser}
                keyExtractor={(item) => item.idQues.toString()}
                renderItem={({ item }) => ( */}
          {questionsWithUser.map((item) => (
            <View
              key={item.idQues}
              style={{ flexDirection: "row", marginTop: 40 }}
            >
              <Image
                style={styles.avtQues}
                source={
                  item.avatar
                    ? { uri: item.avatar }
                    : require("../../../assets/images/image/avatar.png")
                }
              />
              <View style={styles.viewCntQues}>
                <View style={styles.username_time}>
                  <Text style={styles.txtUsername}>{item.userName}</Text>
                  <View style={styles.viewTime}>
                    <Image
                      style={styles.clock}
                      source={require("../../../assets/images/image/community/clock.png")}
                    />
                    <Text
                      style={{ color: "#666", fontSize: 12, marginLeft: 8 }}
                    >
                      {item.created_at}
                    </Text>
                  </View>
                </View>

                <View style={styles.viewEachQues}>
                  <Text style={styles.txtEachQues}>{item.question}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Answer", { item });
                  }}
                  style={styles.viewAnsEachQues}
                >
                  <Text style={styles.txtAnsEachQues}>See the answer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default CommunityGroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewImgMainGroup: {
    position: "relative",
    backgroundColor: "#fff",
    height: 330,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    //borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1, // tăng độ đậm bóng
    shadowRadius: 9, // lan tỏa xa hơn
    elevation: 6, // cần thiết cho Android
  },
  imgBig: {
    width: "100%",
    height: 230,
    position: "absolute",
  },
  imgSmall: {
    width: 120,
    height: 120,
    position: "absolute",
    borderRadius: 80,
    top: 160,
    left: 20,
  },
  headerGroup: {
    position: "absolute",
    top: 250,
    right: 20,
    width: 230,
  },
  tagCommunity: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    fontFamily: "serif",
  },
  viewContentMembers: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    top: 40,
    alignItems: "center",
  },
  numMembers: {
    width: 25,
    height: 25,
    marginRight: 3,
  },

  viewContentGroup: {
    position: "relative",
    marginTop: 20,
    backgroundColor: "#fff",
    paddingBottom: 40,
    //height: 730,
    // borderTopEndRadius: 20,
    // borderTopStartRadius: 20,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1, // tăng độ đậm bóng
    shadowRadius: 9, // lan tỏa xa hơn
    elevation: 6, // cần thiết cho Android
  },

  // Text input comment
  viewTextinputCmt: {
    backgroundColor: "#f5f5f5",
    marginHorizontal: 13,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  viewTextinputCmtComponents: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  viewAvtTextinputCmt: {
    height: 51, // 45 (image) + 2 * 3 (border)
    width: 51,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: "#f08080",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
    position: "absolute",
    top: 10,
  },
  nameTextinputCmt: {
    fontSize: 16,
    marginLeft: 14,
    fontWeight: 500,
    marginTop: 8,
  },
  txtInputQues: {
    marginLeft: 10,
    fontSize: 16,
    maxWidth: 320,
    fontFamily: "serif",
    marginTop: -5,
  },

  line: {
    borderBottomWidth: 1,
    marginHorizontal: 17,
    marginTop: 10,
    borderColor: "#ccc",
  },

  avtQues: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  viewCntQues: {
    paddingLeft: 10,
    flex: 1,
    position: "relative",
    paddingBottom: 22,
  },
  username_time: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtUsername: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "serif",
  },
  viewTime: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
  },
  clock: {
    width: 15,
    height: 15,
  },
  viewEachQues: {
    marginTop: 10,
    backgroundColor: "#ffe4e1",
    borderRadius: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  txtEachQues: {
    fontFamily: "serif",
    fontSize: 15,
    color: "#f08080",
  },
  viewAnsEachQues: {
    position: "absolute",
    left: 15,
    bottom: 0,
  },
  txtAnsEachQues: {
    fontFamily: "serif",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 13,
    color: "#696969",
  },
});
