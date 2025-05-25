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
import {
    addAns,
  getAllAnsWithQuestionId,
  // getAllAnsWithIdQues,
  getAllQuesWithTags,
  getOneUserById,
} from "../../nestjs/api";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";

interface AnswerWithUser {
  idAns: number;
  answer: string;
  created_at: string;
  idUser: number;
  name: string;
  avatar: string;
//   created_at_Ques: string;
}

function Answer() {
  const { email, idUser, avatar, name } = useUser();
  //   console.log("User email in UserProfile:", email);
  //   console.log("User ID in UserProfile:", idUser);
  //   console.log("User email in UserProfile:", avatar);
  //   console.log("User ID in UserProfile:", name);
  console.log("ANSWER");


  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "Answer"> = useRoute();
  const selectedItem = route.params.item;

  console.log("ID QUESTION: " + selectedItem.idQues);
  console.log("QUESTION: " + selectedItem.question);
  console.log("ID USER: " + selectedItem.idUser);
  console.log("TAGS: " + selectedItem.tags);
  console.log("USER NAME: " + selectedItem.userName);
  console.log("AVATAR: " + selectedItem.avatar);
console.log("CREATED AT QUESTION: " + selectedItem.created_at);

 
  const [answersWithUser, setAnswerWithUser] = useState<AnswerWithUser[]>([]);

//   useFocusEffect(
//     useCallback(() => {

    // ===== FETCH ANSWER W/ ID QUES =====
      const fetchUsers = async () => {
        try {
          const response = await getAllAnsWithQuestionId({
            question: selectedItem._id,
          });
          const ans = response.data;

          // Map qua từng question để lấy thêm thông tin user
          const enrichedAnswers = await Promise.all(
            ans.map(async (answer: any) => {
              try {
                const userRes = await getOneUserById({ user: answer.user._id });
                const user = userRes.data;
                return {
                  ...answer,
                  name: user.name,
                  avatar: user.avatar,
                  created_at_raw: answer.created_at, // giữ lại để sort
                   created_at: formatDistanceToNow(new Date(answer.created_at), { addSuffix: true }),
                };
              } catch (err) {
                console.error("Lỗi khi lấy user:", err);
                return {
                  ...answer,
                  name: "Unknown",
                  avatar: null,
                  created_at_raw: answer.created_at, // giữ lại để sort
                };
              }
            })
          );

          const sortedAnswers = enrichedAnswers.sort(
            (a, b) => new Date(b.created_at_raw).getTime() - new Date(a.created_at_raw).getTime()
          );

          setAnswerWithUser(sortedAnswers);
          //console.log("ANSWERS W USERS ", answersWithUser);
        } catch (error) {
          console.error("❌ Failed to fetch users:", error);
        }
      };

//       fetchUsers();
//     }, [selectedItem.idQues])
//   );

  useFocusEffect(
  useCallback(() => {
    fetchUsers();
  }, [selectedItem.idQues])
);


  const [comment, setComment] = useState('')
        const upLoatCmt = async () => {
            try {
                const res = await addAns({ 
                    answer: comment,
                    user: idUser,
                    question: selectedItem._id
                });
                    console.log("ADD ANSWER SUCCESSFULLY !")
                    setComment('')
                    await fetchUsers(); 
                    // await fetchQuestionsWithUser(); 
                    
                } catch (err) {
                console.error("Error when upload ans:", err);
            }
        };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewQues}>
        <View style={styles.viewQuesHeader}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.quesAvt}
              source={{ uri: selectedItem.avatar }}
            />
            <Text style={styles.quesUsername}>{selectedItem.userName}</Text>
          </View>
          <Text style={styles.quesCreatedAt}>{selectedItem.created_at}</Text>
        </View>
        <View style={styles.viewQuesDetails}>
          <Text style={styles.txtQues}>{selectedItem.question}</Text>
        </View>
      </View>

      <View style={styles.viewContentGroup}>
        <Text style={styles.thoughts}>Thoughts</Text>

        {answersWithUser.map((item) => (
          <View
            key={item.idAns}
            style={{ flexDirection: "row", marginTop: 45 }}
          >
            <Image style={styles.ansAvt} source={{ uri: item.avatar }} />
            <View style={{ position: "relative" }}>
              <Text style={styles.ansUsername}>{item.name}</Text>
              <Text style={styles.txtAns}>{item.answer}</Text>
              <View style={styles.viewAnsCreatedAt}>
                <Image
                  style={styles.imgTime}
                  source={require("../../../assets/images/image/community/clock.png")}
                />
                <Text style={styles.txtAnsCreatedAt}>{item.created_at}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.viewTextinputCmt}>
          <View style={styles.viewTextinputCmtComponents}>
            <View style={styles.viewAvtTextinputCmt}>
              <Image
                style={{ height: 39, width: 39, borderRadius: 50 }}
                source={{ uri: avatar }}
              />
            </View>
            <View style={{ maxWidth: 280, marginLeft: 60 }}>
              <Text style={styles.nameTextinputCmt}>{name}</Text>
              <TextInput
                value={comment} // thêm dòng này để TextInput sync với state
                onChangeText={setComment}
                style={styles.txtInput}
                placeholder="Your answer"
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
      </View>
    </ScrollView>
  );
}

export default Answer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewQues: {
    // position: "relative",
    backgroundColor: "#fff",
    //height: 300,
    paddingHorizontal: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingBottom: 35,
    //borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1, // tăng độ đậm bóng
    shadowRadius: 9, // lan tỏa xa hơn
    elevation: 6, // cần thiết cho Android
  },
  viewQuesHeader: {
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  quesAvt: {
    width: 50,
    height: 50,
    borderRadius: 80,
  },
  quesUsername: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    fontFamily: "serif",
    marginTop: 5,
    marginLeft: 17,
  },
  quesCreatedAt: {
    fontSize: 13,
    color: "#666",
    marginRight: 6,
  },
  viewQuesDetails: {
    marginTop: 15,
    height: 120,
    backgroundColor: "#ffe4e1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  txtQues: {
    fontFamily: "serif",
    fontSize: 17,
    color: "#f08080",
    lineHeight: 25,
  },

  thoughts: {
    fontSize: 14,
    fontFamily: "serif",
    position: "absolute",
    right: 20,
    top: 20,
  },
  ansAvt: {
    width: 40,
    height: 40,
    borderRadius: 80,
  },
  ansUsername: {
    fontSize: 13,
    fontWeight: "800",
    color: "#000",
    fontFamily: "serif",
    marginLeft: 17,
  },
  txtAns: {
    fontSize: 13,
    color: "#000",
    fontFamily: "serif",
    marginTop: 5,
    marginLeft: 17,
    maxWidth: 320,
    lineHeight: 17,
  },
  viewAnsCreatedAt: {
    position: "absolute",
    bottom: -20,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  imgTime: {
    width: 15,
    height: 15,
  },
  txtAnsCreatedAt: {
    color: "#666",
    fontSize: 12,
    marginLeft: 9,
  },
  viewContentGroup: {
    position: "relative",
    marginTop: 10,
    paddingTop: 15,
    backgroundColor: "#fff",
    height: 600,
    paddingHorizontal: 17,

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
    position: "absolute",
    width: 380,
    bottom: 20,
  },
  txtInput: {
    marginLeft: 10,
    fontSize: 16,
    maxWidth: 320,
    fontFamily: "serif",
    marginTop: -5,
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
});
