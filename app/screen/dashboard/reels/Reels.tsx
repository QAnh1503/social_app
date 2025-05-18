import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions, FlatList, ListRenderItem } from "react-native"
// import ReelsComponent from "./ReelsComponent"
import TestVideo from "./TestVideo"


type VideoItem = {
  id: string;
  uri: string;
};
const Reels = () => {

    const windowWidth= Dimensions.get('window').width
    const windowHeight= Dimensions.get('window').height


    const videos = [
        { id: '1', uri: "https://v1.pinimg.com/videos/iht/hls/46/12/1c/46121ce74a983f6915f91d899d77c694_720w.m3u8" },
        { id: '2', uri: "https://v1.pinimg.com/videos/iht/hls/d6/4b/ea/d64bea279b2096c47312c601fad5f07f_720w.m3u8" },
        { id: '3', uri: "https://v1.pinimg.com/videos/iht/hls/15/56/b7/1556b7866f0441f5f0ec71734f2a3177_720w.m3u8" },
        { id: '4', uri: "https://v1.pinimg.com/videos/iht/hls/f2/95/92/f2959243b8cab70ebfb8c6d76bb48f2e_720w.m3u8" },
        { id: '5', uri: "https://v1.pinimg.com/videos/iht/hls/25/d6/fd/25d6fd48970655ca27fca160ec55315e_720w.m3u8" },
        { id: '6', uri: "https://v1.pinimg.com/videos/iht/hls/28/ff/55/28ff5537ec03a734f102a4e3d7b2f172_720w.m3u8" },
        // { id: '7', uri: "https://v1.pinimg.com/videos/iht/hls/7d/3e/0d/7d3e0d85c4ada181e91ba93a3ef3e963_720w.m3u8" },
        // { id: '8', uri: "https://v1.pinimg.com/videos/iht/hls/71/8c/73/718c73ed374d74c67bac70d40a396560_720w.m3u8" },
        // { id: '9', uri: "https://v1.pinimg.com/videos/iht/hls/5f/d5/67/5fd567466f8fb8dacaf7f8f30f5c019c_720w.m3u8" },
        // { id: '10', uri: "https://v1.pinimg.com/videos/iht/hls/d7/d3/8a/d7d38a23b56d79b6772ee544668b9dc2_720w.m3u8" },
        // { id: '11', uri: "https://v1.pinimg.com/videos/iht/hls/41/e8/9b/41e89b17f9396e03d7aec459d76845c8_640w.m3u8" },
        // { id: '12', uri: "https://v1.pinimg.com/videos/iht/hls/69/89/25/69892529b324ec68aabe33319c167eab_720w.m3u8" },
        // { id: '13', uri: "https://v1.pinimg.com/videos/iht/hls/9d/3d/18/9d3d18e5b105f150ffb3891841097905_720w.m3u8" },
        // { id: '14', uri: "https://v1.pinimg.com/videos/iht/hls/e8/19/f8/e819f822c5a763a35a6d936bb1bcd2a3_720w.m3u8" },

        
        //  { id: '1', uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
        // { id: '2', uri: "https://www.w3schools.com/html/movie.mp4" },
        // { id: '3', uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
        // ../../../../assets/videos/video1.mp4
    ];
    const renderItem: ListRenderItem<VideoItem> = ({ item }) => (
    <View style={{ width: windowWidth, height: windowHeight }}>
        <TestVideo source={{ uri: item.uri }} />
    </View>
    );
    return (
        <View
            style= {{
                width: windowWidth,
                height: windowHeight-50,
                position :'relative',
                backgroundColor: 'black',
            }}    
            >
                <View style= {{
                    position: 'absolute',
                    top: 0,
                    left: 0, 
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    zIndex: 1,
                    padding: 10
                }}>
                <Text style= {{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Reels</Text>
                <Image 
                    style= {{
                        width: 35,
                        height: 35,
                        tintColor: 'white'
                    }} 
                    source={require("../../../../assets/storage/camera-icon.png")}
                    />
                </View>
                {/* <ReelsComponent/> */}
                {/* <TestVideo/> */}
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    pagingEnabled // giúp cuộn từng video full màn hình
                    showsVerticalScrollIndicator={false}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    style= {{height: windowHeight-50,}}
                />
        </View>
    )
}

export default Reels;