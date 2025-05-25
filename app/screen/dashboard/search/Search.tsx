import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions } from "react-native"
import SearchBox from "./SearchBox";
import SearchContent from "./SearchContent";
import { SetStateAction, useEffect, useState } from "react";
import { getAll } from "../../../nestjs/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type User = {
    idUser: number;
    name: string;
    email: string;
    website: string;
    bio: string;
    phone: string;
    gender: string;
    following: number;
    followers: number;
    posts: number;
    avatar: string;
};

const Search = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    

    const [image, setImage] = useState(null);

    const getData = (data: SetStateAction<null>) => {
        setImage(data)
    };

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    // const [image, setImage] = useState(null);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await getAll();
                    setUsers(response.data);        // lưu toàn bộ users
                    console.log(response.data)
                    //setFilteredUsers(response.data); // mặc định hiện hết
    
                } catch (error) {
                    console.error("Failed to fetch users :", error);
                }
            };
            fetchUsers();
    }, []);

    const handleSearch = (text: string) => {
        if (text.trim() === "") {
            //setFilteredUsers(users); // nếu không nhập gì thì hiện hết
            setFilteredUsers([]);
            setIsSearching(false); // không tìm kiếm nếu không có nội dung
        } else {
            const result = users.filter(user =>
                user.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredUsers(result);
            setIsSearching(true); // bắt đầu tìm kiếm
        }
    };


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            position: 'relative'
        }} >
            {/* Danh sách search (dạng overlay) */}
            {filteredUsers.length > 0 && (
                <View style={{
                    position: 'absolute',
                    top: 53, // điều chỉnh theo chiều cao thực tế của SearchBox
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    maxHeight: 250, // giới hạn chiều cao nếu danh sách dài
                    borderBottomWidth: 1,
                    borderColor: '#ccc'
                }}>
                    <ScrollView>
                        {filteredUsers.map((user, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('hehe', user)
                                    navigation.navigate("UserProfileSearch", { user })
                                }}
                                key={user.idUser}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderColor: "#eee",
                                }}
                            >
                                <Image
                                    source={{ uri: user.avatar }}
                                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20, marginLeft: 17 }}
                                />
                                <Text style={{ fontSize: 16 }}>{user.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}


            <ScrollView showsVerticalScrollIndicator={false}>
                <SearchBox onSearch={handleSearch}/>

                    {/* {filteredUsers.map((user, index) => (
                        <TouchableOpacity
                            key={user.id}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                                borderBottomWidth: 1,
                                borderColor: "#eee",
                                
                            }}
                        >
                            <Image
                                source={{ uri: user.avatar }}
                                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 , marginLeft: 17}}
                            />
                            <Text style={{ fontSize: 16 }}>{user.name}</Text>
                        </TouchableOpacity>
                    ))} */}

                <SearchContent data={getData} />
                <TouchableOpacity
                    style={{
                        margin: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            opacity: 0.3
                        }}
                        source={require("../../../../assets/storage/plus-circle-icon.png")}
                    />
                </TouchableOpacity>
            </ScrollView>
            {
                image ?
                    (
                        <View style= {{
                            position: 'absolute',
                            zIndex: 1,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(52, 52, 52, 0.8)'
                        }}>
                            <StatusBar backgroundColor="#525252" barStyle="dark-content"/>
                            <View style= {{
                                position: 'absolute',
                                top: windowHeight/6,
                                left: windowWidth/18,
                                backgroundColor: 'white',
                                width: 350,
                                height: 465,
                                borderRadius: 15,
                                zIndex: 1,
                                elevation: 50
                            }}>
                                <View style= {{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15
                                }}>
                                    <Image source={image} style= {{
                                        width: 30, 
                                        height: 30, 
                                        borderRadius: 100
                                    }}/>
                                    <View style= {{paddingLeft: 8}}>
                                        <Text style= {{fontSize: 12, fontWeight: '600'}}>the_anonymous_guy</Text>
                                    </View>
                                </View>
                                <Image source={image} style= {{width: '100%', height: '80%'}}/>
                                <View style= {{
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 8
                                }}>
                                    <Image 
                                        style= {{width: 30, height: 30}}
                                        source={require("../../../../assets/storage/heart-outline-icon.png")}
                                    />
                                    <Image 
                                        style= {{width: 26, height: 26, marginLeft: 3}}
                                        source={require("../../../../assets/storage/person-circle-icon.png")}
                                    />
                                    <Image 
                                        style= {{width: 26, height: 26, marginLeft: 3}}
                                        source={require("../../../../assets/storage/send-outline-icon.png")}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null
            }
        </View>
    )
}

export default Search;