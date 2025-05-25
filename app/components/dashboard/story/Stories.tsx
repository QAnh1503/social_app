import { View , Text, TouchableOpacity, Image, ScrollView, FlatList} from "react-native"
// import { UserData } from "../../../utils/UserData";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
// import { UserData } from "../../../utils/UserData";
import { useUserData } from "../../../utils/UserData"; // đường dẫn đúng
import { useCallback, useEffect, useState } from "react";
import { getAll, getAllStory, getOneUserById } from "../../../nestjs/api";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../../../screen/UserContext";
// import { RootStackParamList } from "../../../types/route"; // hoặc đường dẫn đúng nếu khác


type StoriesItem = {
    author: {authorUUID: string, authorName: string, authorAvatar: string}
    storyImage: string,
    storySong: string
}
interface StoriesProps {
    // storyItems: StoriesItem[]
}
type Story = {
    idStory: number;
    image: string;
    content: string;
    created_at: string;
    idUser: string;
    name: string;
    avatar: string;
}
// type User = {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string; // đường dẫn avatar (nếu có)
//   story?: {
//     image: any; // hoặc string nếu bạn dùng URL
//   };
// };

const Stories: React.FC<StoriesProps> = () => {
    // const navigation= useNavigation();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    // const navigation = useNavigation<any>();

    // const [users, setUsers] = useState<User[]>([]);
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //     try {
    //         const res = await getAll();
    //         console.log("All users:", res.data); // 👈 In tất cả users ra console
    //         setUsers(res.data);
    //     } catch (err) {
    //         console.error("Lỗi khi lấy users:", err);
    //     }
    //     };

    //     fetchUsers();
    // }, []);
    const userData = useUserData();

    const { idUser } = useUser();
    console.log("User ID: ", idUser);
    const { avatar } = useUser();
    console.log("User Avatar: ", avatar);

    const [stories, setStories] = useState<Story[]>([]);
       
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //     const fetchStories = async () => {
    //         try {
    //             const res = await getAllStory();
    //             const stories = res.data;

    //             console.log("FETCH STORIES:", res.data)

    //             const storiesWithUser = await Promise.all(
    //                 stories.map(async (story: any) => {
    //                     const storyResponse = await getOneUserById({ idUser: story.user._id });
    //                     const user = storyResponse.data;

    //                     return {
    //                     idStory: story._id,
    //                     image: story.image,
    //                     content: story.content,
    //                     created_at: formatDistanceToNow(new Date(story.created_at), { addSuffix: true }),
    //                     idUser: story.user._id,
    //                     name: user.name,
    //                     avatar: user.avatar,
    //                     };
    //                 })
    //             );

    //             // const storiesWithUserSorted = storiesWithUser.sort((a, b) => {
    //             // if (a.idUser === idUser) return -1;
    //             // if (b.idUser === idUser) return 1;
    //             //     return 0;
    //             // });

    //             // setStories(storiesWithUserSorted);

    //             // Kiểm tra xem người dùng hiện tại có story không
    //             const hasMyStory = storiesWithUser.some(story => story.user._id === idUser);

    //             let finalStories = storiesWithUser;

    //             if (!hasMyStory) {
    //             // Thêm avatar riêng của mình vào đầu danh sách
    //             finalStories = [{
    //                 idStory: -1, // ID giả
    //                 image: '',
    //                 content: '',
    //                 created_at: '',
    //                 idUser: idUser,
    //                 name: 'You',
    //                 avatar: avatar, // từ useUserData hoặc useUser
    //             }, ...storiesWithUser];
    //             } else {
    //             // Sắp xếp để đẩy lên đầu nếu có
    //             finalStories = storiesWithUser.sort((a, b) => {
    //                 if (a.idUser === idUser) return -1;
    //                 if (b.idUser === idUser) return 1;
    //                 return 0;
    //             });
    //             }

    //             setStories(finalStories);
                

    //         } catch (err) {
    //             console.error("Lỗi khi lấy storiesssssssssss:", err);
    //         }
    //     };

    //     fetchStories();
    // });

    // return unsubscribe; // cleanup
    // }, [navigation]);


    // const storiesSelect= () => {
    //     console.log("WHEN CLICK ANY STORY");
    //     console.log(stories);
    // }

    useEffect(() => {
    const fetchStories = async () => {
        try {
        const res = await getAllStory();
        //console.log("FETCH STORIES:", res.data);

        const stories = res.data;

        const storiesWithUser = stories.map((story: any) => {
            return {
            idStory: story._id,
            image: story.image,
            content: story.content,
            created_at: formatDistanceToNow(new Date(story.created_at), { addSuffix: true }),
            idUser: story.user._id,
            name: story.user.name,
            avatar: story.user.avatar,
            };
        });

        setStories(storiesWithUser);
        //console.log("FETCH STORIES FINAL:", storiesWithUser);

        } catch (err) {
        console.log("Lỗi khi lấy storiesssssssssss:", err);
        }
    };

    fetchStories();
    }, []);


    //console.log("FETCH STORIES WITH ALL USERS: ", stories)

    return (
        <View style= {{flexDirection: 'row', marginTop: 8, backgroundColor: '#fff'}}>
            {/* {UserData.map((item) => {
                console.log(item);
                return (
                    <View  style= {{marginLeft: 10}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Story', {item})}
                        >
                            <View style= {{borderWidth: 3, borderColor: '#ff1493', borderRadius: 50, padding: 3}}>
                                <Image style= {{height: 80, width: 80, borderRadius: 50}} source={item.story.image}/>
                            </View>
                        </TouchableOpacity>
                        <Text style= {{textAlign: 'center'}}>{item.name}</Text>
                    </View>
                )
            })} */}

            {/* {{{{{{{{{{{{{{{{{{{{{ */}
            {/* <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                {userData.map((item, index) => (
                    <View key={item.id || index} style={{ marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Story', { item })}>
                            <View style={{ borderWidth: 3, borderColor: '#ff1493', borderRadius: 100, padding: 3 }}>
                                <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={item.story.image} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView> */}
            {/* }}}}}}}}}}}}}}}}}}}}} */}
            <FlatList
                //key={numColumns} // 💡 Thêm dòng này
                horizontal={true}
                data={stories}
                renderItem={({ item }: { item: any }) => (
                    <View  style= {{marginLeft: 10}}>
                        <TouchableOpacity 
                            //onPress={() => navigation.navigate('Story', {item})}
                            onPress={() => {
                                if (item.idStory !== -1) {
                                navigation.navigate('Story', { item });
                                } else {
                                // Có thể cho phép người dùng thêm story mới nếu muốn
                                console.log('Hiển thị avatar cá nhân');
                                }
                            }}
                        >
                            <View 
                                style= {{
                                    // borderWidth: 3, 
                                    // borderColor: '#ff1493', 
                                    // borderRadius: 50, 
                                    // padding: 3
                                    borderWidth: item.idStory !== -1 ? 3 : 0,
                                    borderColor: '#ff1493',
                                    borderRadius: 50,
                                    padding: item.idStory !== -1 ? 3 : 0,
                                }}
                                >
                                <Image 
                                    style= {{
                                        // height: 80, 
                                        // width: 80, 
                                        // borderRadius: 50
                                        height: item.idStory !== -1 ? 80 : 90, 
                                        width: item.idStory !== -1 ? 80 : 90, 
                                        borderRadius: 50
                                    }} 
                                    source={{ uri: item.avatar}}/>
                            </View>
                        </TouchableOpacity>
                        <Text style= {{textAlign: 'center'}}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.idStory.toString()}
                //numColumns={1}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Stories;