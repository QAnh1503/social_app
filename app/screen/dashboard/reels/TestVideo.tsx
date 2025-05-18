// import { View, Dimensions } from 'react-native';
// import Video from 'react-native-video';

// const TestVideo = () => {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black' }}>
//       <Video
//         //source={require('../../../assets/videos/SampleVideo.mp4')}
//         source={{ uri: require('../../../assets/videos/SampleVideo.mp4') }}
//         muted={true}
//         repeat={true}
//         resizeMode="cover"
//         paused={false}
//         onError={(error) => console.log('Lỗi Video:', error)}
//         style={{ width: windowWidth, height: windowHeight }}
//       />
//     </View>
//   );
// };

// export default TestVideo;

import React, { useRef } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import {  ResizeMode } from 'expo-av';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type TestVideoProps = {
  source: { uri: string } | number; // number nếu dùng require()
};
// const TestVideo = () => {
//   const video = useRef(null);

//   return (
//     <Video
//       ref={video}
//       style={styles.video}
//       source={require('../../../../assets/videos/video1.mp4')} // đường dẫn video của bạn
//       useNativeControls={true}
//       resizeMode={ResizeMode.COVER}
//       isLooping
//       shouldPlay
//     />
//   );
// };
const TestVideo: React.FC<TestVideoProps> = ({ source }) => {
  return (
    <View style={styles.container}>
      <Video
        source={source}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        useNativeControls  
      />
    </View>
  );
};
const styles = StyleSheet.create({
  // video: {
  //   width: windowWidth,
  //   height: windowHeight,
  // },
  container: {
    flex: 1,
  },
  video: {
    // flex: 1,
    height: windowHeight-60,
  },
});

export default TestVideo;