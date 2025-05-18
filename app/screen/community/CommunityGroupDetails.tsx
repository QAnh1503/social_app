import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Platform, Text } from "react-native";
import { useUser } from "../UserContext";
import { useState } from "react";

function CommunityGroupDetails() {
  const { email, idUser, avatar, name } = useUser();
  console.log("User email in UserProfile:", email);
  console.log("User ID in UserProfile:", idUser);
  console.log("User email in UserProfile:", avatar);
  console.log("User ID in UserProfile:", name);
  console.log("Community Groups DETAILS");

  const [comment, setComment] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewImgMainGroup}>
        <Image
          style={{ width: "100%", height: 230, position: "absolute" }}
          source={require("../../../assets/images/image/avatar.png")}
        />
        <Image
          style={{
            width: 120,
            height: 120,
            position: "absolute",
            borderRadius: 80,
            top: 160,
            left: 20,
          }}
          source={require("../../../assets/images/image/avatar.png")}
        />
        <View
          style={{
            position: "absolute",
            top: 250,
            right: 20,
            width: 230,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#000",
              fontFamily: "serif",
            }}
          >
            title group
          </Text>
          <View style={styles.viewContentMembers}>
            <Image
              style={styles.numMembers}
              source={require("../../../assets/images/image/community/members.png")}
            />
            <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
              5 members
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewContentGroup}>
        <View
          style={styles.viewTextinputCmt}
        >
          <View
            style={styles.viewTextinputCmtComponents}
          >
            <View
              style={styles.viewAvtTextinputCmt}
            >
              <Image
                style={{ height: 39, width: 39, borderRadius: 50 }}
                source={{ uri: avatar }}
              />
            </View>
            <View style={{ maxWidth: 280, marginLeft: 60 }}>
              <Text
                style={styles.nameTextinputCmt}
              >
                {name}
              </Text>
              <TextInput
                //onChangeText={handleDescriptionChange}
                value={comment} // thêm dòng này để TextInput sync với state
                onChangeText={setComment}
                style={{ marginLeft: 10, fontSize: 16, maxWidth: 320, fontFamily: "serif" , marginTop: -5}}
                placeholder="What's on your mind?"
                placeholderTextColor="#ccc"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              //onPress={upLoatCmt}
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
    height: 730,
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
            marginTop: 10,
            marginBottom: 30,
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
  }
});
