import { View, Text, ScrollView } from "react-native"
import Stories from "../../components/dashboard/story/Stories";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Newsfeed from "../home/tabs/Following";
import { DUMMY_POSTS } from "../../data/dummyPost";
import PostList from "../home/PostList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUser } from "../UserContext";

const fetchUserData = () => {
    return {
        username: 'julylun',
        unreadNotification: 10,
    }
}

const fetchNewsfeedData = () => {
    return DUMMY_POSTS
}

const DashBoard = () => {
    const userData = fetchUserData();
    const newsfeedData = fetchNewsfeedData();

    // const route: RouteProp<RootStackParamList, 'Dashboard'> = useRoute();
    // console.log(route.params.email);
    const { email, idUser, avatar } = useUser();
    console.log("User email in UserProfile:", email);
    console.log("User ID in UserProfile:", idUser);
    console.log("User Avatar in UserProfile:", avatar);


    return (
        <View style={{ backgroundColor: '#fff' }}>
            <DashboardHeader unreadNotification={userData.unreadNotification} />
            <PostList />
            <View style={{ justifyContent: 'flex-end', flex: 1 }}></View>
        </View>

    )
}

export default DashBoard;