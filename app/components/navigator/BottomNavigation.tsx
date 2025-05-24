import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image } from "react-native"
// import DashBoard from "../componets/screen/dashboard/DashBoard";
// import Search from "../../screen/search/Search";
import UserProfile from "../../screen/profile/UserProfile"
import AddPost from "../../screen/dashboard/Reel";
import Notification from "../../screen/notification/Notification";
import DashBoard from "../../screen/dashboard/DashBoard";
import Search from "../../screen/dashboard/search/Search";
import Reel from "../../screen/dashboard/Reel";
import Reels from "../../screen/dashboard/reels/Reels";
import CommunityGroups from "../../screen/community/CommunityGroups";
import ChatBot from "../../screen/chatbot/ChatBot";

const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: 60 },
                tabBarIconStyle: { justifyContent: 'center', alignSelf: 'center', marginTop: 10 },
            }}>
            <Tab.Screen
                name="Home"
                component={DashBoard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 27, width: 27 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/homeIconFocus.png')
                                    : require('../../../assets/images/image/homeIconOutline.png')
                            }
                        />

                    )
                }} 
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 27, width: 27 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/searchIconFocus.png')
                                    : require('../../../assets/images/image/searchIconOutline.png')
                            }
                        />

                    )
                }} 
            />
            <Tab.Screen
                name="Community"
                component={CommunityGroups}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 30, width: 30 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/communityIconFocus.png')
                                    : require('../../../assets/images/image/communityIconOutline.png')
                            }
                        />

                    )
                }} 
            />
            <Tab.Screen
                name="Reel"
                component={Reels}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 36, width: 36 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/ReelIconFocus.png')
                                    : require('../../../assets/images/image/reelIconOutline.png')
                            }
                        />

                    )
                }} 
            />
            {/* <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 35, width: 35 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/notificationIconFocus.png')
                                    : require('../../../assets/images/image/notificationIconOutline.png')
                            }
                        />

                    )
                }} 
            /> */}
            <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 27, width: 28 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/profileIconFocus.png')
                                    : require('../../../assets/images/image/profileIconOutline.png')
                            }
                        />

                    )
                }} 
            />
            {/* <Tab.Screen
                name="ChatBot"
                component={ChatBot}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 27, width: 28 }}
                            source={
                                focused
                                    ? require('../../../assets/images/image/profileIconFocus.png')
                                    : require('../../../assets/images/image/profileIconOutline.png')
                            }
                        />

                    )
                }} 
            /> */}
        </Tab.Navigator>
    )
}

export default BottomNavigation;