// download react-native-swiper-flatlist: npm i react-native-swiper-flatlist
// download react-native-video: npm i react-native-video


import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions } from "react-native"
// import { SwiperFlatListProps } from "react-native-swiper-flatlist";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { videoData } from "./Database";
import SingleReel from "./SingleReel";
import { useState } from "react";
import Video from "react-native-video";

const ReelsComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangIndexValue = ({index}) => {
        setCurrentIndex(index)
    }

    return (
        
        <SwiperFlatList
            data={videoData}
            vertical= {true}
            onChangeIndex={handleChangIndexValue}
            renderItem={({item, index}) => (
                <SingleReel item ={item} index={index} currentIndex= {currentIndex}/>
            )}
            keyExtractor={(item, index) => index}
        />
       
    );
};

export default ReelsComponent;