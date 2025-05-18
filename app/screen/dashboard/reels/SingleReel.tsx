
import { useRef, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions } from "react-native"
import Video from "react-native-video"

const SingleReel = ({item, index, currentIndex}) => {

    const windowWidth= Dimensions.get('window').width
    const windowHeight= Dimensions.get('window').height


    const videoRef= useRef(null)

    const onBuffer= buffer => {
        console.log("buffring", buffer);
    };
    const onError= error => {
        console.log("error", error);
    };
    
    const [mute, setMute] = useState(false);

    return (
        <View style= {{
            width: windowWidth,
            height: windowHeight,
            position: 'relative'
        }}>
            <TouchableOpacity 
                onPress={() => setMute(!mute)}
                style= {{
                        width: '100%',
                        height: '100%',
                        position:'absolute'
                    }}>
                <Video
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat= {true}
                    resizeMode="cover"
                    paused= {false}
                    source={item.video}
                    muted= {mute}
                    style= {{
                        width: '100%',
                        height: '100%',
                        position:'absolute'
                    }}
                />
            </TouchableOpacity>
        </View>
      
    )
}

export default SingleReel;