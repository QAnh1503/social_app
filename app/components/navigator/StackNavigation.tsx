import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View , Text, SafeAreaView} from "react-native"
// import UserProfile from "../componets/screen/dashboard/UserProfile";
// import DashBoard from "../componets/screen/dashboard/DashBoard";
// import StoryView from "../componets/screen/story/StoryView";
import BottomNavigation from "./BottomNavigation";
import DashBoard from "../../screen/dashboard/DashBoard";
import StoryView from "../dashboard/story/StoryView";
import Chats from "../../screen/chats/Chats";
import Message from "../../screen/Message";
import Login from "../../screen/Login";
import Register from "../../screen/Register";
import AddPost from "../../screen/AddPost";
import EditProfile from "../profile/EditProfile";
import AddStory from "../../screen/AddStory";
import ProfilePostDetail from "../profile/ProfilePostDetail";
import PostListDetails from "../../screen/home/PostListDetails";
import Followers from "../profile/follow/Followers";
// import Followingss from "../profile/follow/Followingss";
import Followings from "../profile/follow/Followings";
import UserProfileFollow from "../profile/follow/follower_details/UserProfileFollow";
import UserProfileSearch from "../../components/dashboard/search/UserProfileSearch";
import CommunityGroupDetails from "../../screen/community/CommunityGroupDetails";
import CommunityFood from "../../screen/community/CommunityFood";
import Answer from "../../screen/community/Answer";
import Payment from "../../screen/Payment";



// const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (

        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false, }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Dashboard"  component={BottomNavigation}/>

                {/* <Stack.Screen name="Home" component={DashBoard} /> */}
                <Stack.Screen name="Story" component={StoryView}/>
                <Stack.Screen name="ChatScreen" component={Chats}/>
                <Stack.Screen name="Message" component={Message}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>

                <Stack.Screen name="Payment" component={Payment}/>

                <Stack.Screen name="AddPost" component={AddPost}/>
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="AddStory" component={AddStory}/>

                <Stack.Screen name="ProfilePostDetail" component={ProfilePostDetail}/>
                <Stack.Screen name="PostListDetails" component={PostListDetails}/>

                <Stack.Screen name="Followers" component={Followers}/>
                <Stack.Screen name="Followings" component={Followings}/>
                <Stack.Screen name="UserProfileFollow" component={UserProfileFollow}/>
                <Stack.Screen name="UserProfileSearch" component={UserProfileSearch}/>

                <Stack.Screen name="CommunityGroupDetails" component={CommunityGroupDetails}/>
                <Stack.Screen name="CommunityFood" component={CommunityFood}/>
                {/* <Stack.Screen name="CommunityDrink" component={CommunityDrink}/>
                <Stack.Screen name="CommunityRecipe" component={CommunityRecipe}/>
                <Stack.Screen name="CommunityYoga" component={CommunityYoga}/>
                <Stack.Screen name="CommunityGym" component={CommunityGym}/>
                <Stack.Screen name="CommunityJogging" component={CommunityJogging}/>
                <Stack.Screen name="CommunityRecipe" component={CommunityRecipe}/> */}
                <Stack.Screen name="Answer" component={Answer}/>

                {/* <Stack.Screen name="Dashboard"  component={BottomNavigation}/> */}
                {/* <Stack.Screen name="UserProfile" component={UserProfile}/> */}
            </Stack.Navigator>
        </NavigationContainer>

       
    )
}

export default StackNavigation;