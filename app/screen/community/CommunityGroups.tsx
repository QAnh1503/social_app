import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { View, Platform, Text } from "react-native";
import { useUser } from "../UserContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getAllPost, getAllQues } from "../../nestjs/api";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "serif",
    letterSpacing: 1,
  },
  viewEachGroup: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    position: "relative",
    borderWidth: 1,
    borderColor: "#ddd", // Màu đường viền nhẹ
    borderRadius: 12, // Bo góc
    padding: 10,
    backgroundColor: "#fff", // Nên dùng để hiển thị shadow rõ hơn
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Cho Android
  },
  viewContentText: {
    flexDirection: "row",
    position: "absolute",
    right: 21,
    top: 20,
    alignItems: "center",
  },
  
  imgEachGroup: {
    height: 110,
    width: 110,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  titleEachGroup: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    // textAlign: 'center',
    // marginVertical: 10,
    fontFamily: "serif",
    // letterSpacing: 1,
    // marginLeft: 15,
    // marginTop: 10
  },
  numPostsCommunity: {
    fontSize: 15,
    color: "#000",
    fontFamily: "serif",
  },
  joinBtn: {
    color: "#f08080",
    backgroundColor: "#fff0f5",
    width: 217,

    padding: 7,
    borderRadius: 10,
    marginTop: 10,
    textAlign: "center",
  },
  viewContentMembers: {
    flexDirection: "row",
    position: "absolute",
    right: 21,
    top: 20,
    alignItems: "center",
  },
  numMembers: {
    width: 25,
    height: 25,
    marginRight: 3,
  },
});

function CommunityGroups() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    // const { email, idUser } = useUser();
    // console.log("User email in UserProfile:", email);
    // console.log("User ID in UserProfile:", idUser);
    // console.log("Community Groups");


    // const [foodGroup, setFoodGroup] = useState([]);
    // const [drinkGroup, setDrinkGroup] = useState([]);
    // const [recipeGroup, setRecipeGroup] = useState([]);
    // const [yogaGroup, setYogaGroup] = useState([]);
    // const [gymGroup, setGymGroup] = useState([]);
    // const [joggingGroup, setJoggingGroup] = useState([]);
    // const [medicineGroup, setMedicineGroup] = useState([]);
    // Food
    const [numPostFood, setNumPostFood] = useState(0);
    const [numMemsFood, setNumMemsFood] = useState(0);

    // Drink
    const [numPostDrink, setNumPostDrink] = useState(0);
    const [numMemsDrink, setNumMemsDrink] = useState(0);

    // Recipe
    const [numPostRecipe, setNumPostRecipe] = useState(0);
    const [numMemsRecipe, setNumMemsRecipe] = useState(0);

    // Yoga
    const [numPostYoga, setNumPostYoga] = useState(0);
    const [numMemsYoga, setNumMemsYoga] = useState(0);

    // Gym
    const [numPostGym, setNumPostGym] = useState(0);
    const [numMemsGym, setNumMemsGym] = useState(0);

    // Jogging
    const [numPostJogging, setNumPostJogging] = useState(0);
    const [numMemsJogging, setNumMemsJogging] = useState(0);

    // Medicine
    const [numPostMedicine, setNumPostMedicine] = useState(0);
    const [numMemsMedicine, setNumMemsMedicine] = useState(0);

    // useEffect(() => {
    //         const fetchPosts = async () => {
    //             try {
    //                 const response = await getAllPost();
    //                 const posts = response.data;
                    
    //                 let countFood = 0;
    //                 let countDrink = 0;
    //                 let countRecipe = 0;
    //                 let countYoga = 0;
    //                 let countGym = 0;
    //                 let countJogging = 0;
    //                 let countMedicine = 0;

    //                 let memFood = new Set();
    //                 let memDrink = new Set();
    //                 let memRecipe = new Set();
    //                 let memYoga = new Set();
    //                 let memGym = new Set();
    //                 let memJogging = new Set();
    //                 let memMedicine = new Set();

    //                 posts.forEach((post :{ idUser: number; tags: string }) => {
    //                     const userId = post.idUser;
    //                     switch (post.tags) {
    //                         case 'Food':
    //                             countFood++;
    //                             memFood.add(userId);
    //                             break;
    //                         case 'Drink':
    //                             memDrink.add(userId);
    //                             countDrink++;
    //                             break;
    //                         case 'Recipe':
    //                             memRecipe.add(userId);
    //                             countRecipe++;
    //                             break;
    //                         case 'Yoga':
    //                             countYoga++;
    //                             memYoga.add(userId);
    //                             break;
    //                         case 'Gym':
    //                             countGym++;
    //                             memGym.add(userId);
    //                             break;
    //                         case 'Jogging':
    //                             countJogging++;
    //                             memJogging.add(userId);
    //                             break;
    //                         case 'Medicine':
    //                             countMedicine++;
    //                             memMedicine.add(userId);
    //                             break;
    //                         default:
    //                             break;
    //                     }
    //                 });

    //                 setNumPostFood(countFood);
    //                 setNumPostDrink(countDrink);
    //                 setNumPostRecipe(countRecipe);
    //                 setNumPostYoga(countYoga);
    //                 setNumPostGym(countGym);
    //                 setNumPostJogging(countJogging);
    //                 setNumPostMedicine(countMedicine);

    //                 setNumMemsFood(memFood.size);
    //                 setNumMemsDrink(memDrink.size);
    //                 setNumMemsRecipe(memRecipe.size);
    //                 setNumMemsYoga(memYoga.size);
    //                 setNumMemsGym(memGym.size);
    //                 setNumMemsJogging(memJogging.size);
    //                 setNumMemsMedicine(memMedicine.size);

    //                 //console.log("Fetched posts:", response.data);
    //             } catch (error) {
    //                 console.error("Failed to fetch posts:", error);
    //             }
    //         };
    
    //         fetchPosts();
    //     }, []);

    useEffect(() => {
            const fetchQues = async () => {
                try {
                    const response = await getAllQues();
                    const quess = response.data;
                    
                    let countFood = 0;
                    let countDrink = 0;
                    let countRecipe = 0;
                    let countYoga = 0;
                    let countGym = 0;
                    let countJogging = 0;
                    let countMedicine = 0;

                    let memFood = new Set();
                    let memDrink = new Set();
                    let memRecipe = new Set();
                    let memYoga = new Set();
                    let memGym = new Set();
                    let memJogging = new Set();
                    let memMedicine = new Set();

                    quess.forEach((ques :{ idUser: number; tags: string }) => {
                        const userId = ques.idUser;
                        switch (ques.tags) {
                            case 'Food':
                                countFood++;
                                memFood.add(userId);
                                break;
                            case 'Drink':
                                memDrink.add(userId);
                                countDrink++;
                                break;
                            case 'Recipe':
                                memRecipe.add(userId);
                                countRecipe++;
                                break;
                            case 'Yoga':
                                countYoga++;
                                memYoga.add(userId);
                                break;
                            case 'Gym':
                                countGym++;
                                memGym.add(userId);
                                break;
                            case 'Jogging':
                                countJogging++;
                                memJogging.add(userId);
                                break;
                            case 'Medicine':
                                countMedicine++;
                                memMedicine.add(userId);
                                break;
                            default:
                                break;
                        }
                    });

                    setNumPostFood(countFood);
                    setNumPostDrink(countDrink);
                    setNumPostRecipe(countRecipe);
                    setNumPostYoga(countYoga);
                    setNumPostGym(countGym);
                    setNumPostJogging(countJogging);
                    setNumPostMedicine(countMedicine);

                    setNumMemsFood(memFood.size);
                    setNumMemsDrink(memDrink.size);
                    setNumMemsRecipe(memRecipe.size);
                    setNumMemsYoga(memYoga.size);
                    setNumMemsGym(memGym.size);
                    setNumMemsJogging(memJogging.size);
                    setNumMemsMedicine(memMedicine.size);

                    //console.log("Fetched posts:", response.data);
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            };
    
            fetchQues();
        }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Community Groups</Text>

            {/* ====== FOOD ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/foodAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Food</Text>
                <Text style={styles.numPostsCommunity}>{numPostFood} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Food"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentMembers}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsFood} members
                </Text>
                </View>
            </View>

            {/* ====== DRINK ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/drinkAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Drink</Text>
                <Text style={styles.numPostsCommunity}>{numPostDrink} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Drink"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsDrink} members
                </Text>
                </View>
            </View>
            {/* ====== RECIPE ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/recipeAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Recipe</Text>
                <Text style={styles.numPostsCommunity}>{numPostRecipe} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Recipe"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsRecipe} members
                </Text>
                </View>
            </View>
            {/* ====== YOGA ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/yogaAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Yoga</Text>
                <Text style={styles.numPostsCommunity}>{numPostYoga} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Yoga"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsYoga} members
                </Text>
                </View>
            </View>
            {/* ====== GYM ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/gymAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Gym</Text>
                <Text style={styles.numPostsCommunity}>{numPostGym} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Gym"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsGym} members
                </Text>
                </View>
            </View>
            {/* ====== JOGGING ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/joggingAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Jogging</Text>
                <Text style={styles.numPostsCommunity}>{numPostJogging} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Jogging"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsJogging} members
                </Text>
                </View>
            </View>
            {/* ====== MEDICINE ====== */}
            <View style={styles.viewEachGroup}>
                <Image
                style={styles.imgEachGroup}
                source={require("../../../assets/images/image/community/medicineAvt.png")}
                />
                <View style={{ marginLeft: 15, marginTop: 10 }}>
                <Text style={styles.titleEachGroup}>Medicine</Text>
                <Text style={styles.numPostsCommunity}>{numPostMedicine} posts</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CommunityGroupDetails", {item: "Medicine"})
                    }}
                >
                    <Text style={styles.joinBtn}>Join</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.viewContentText}>
                <Image
                    style={styles.numMembers}
                    source={require("../../../assets/images/image/community/members.png")}
                />
                <Text style={{ color: "#333", fontFamily: "serif", marginLeft: 3 }}>
                    {numMemsMedicine} members
                </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default CommunityGroups;
