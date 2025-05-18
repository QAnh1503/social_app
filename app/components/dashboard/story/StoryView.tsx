import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text, Button, Image, Dimensions, TextInput, TouchableOpacity } from "react-native"


const StoryView = () => {

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, 'Story'> = useRoute();

    
    console.log(route.params.item)
    const selectedItem = route.params.item;

    // const currentTime = new Date();
    // const currentHr = currentTime.getHours();
    
    
    //const storyTime = selectedItem.story.time;
    const storyTime = selectedItem.created_at;

    const screenHeight = Dimensions.get('window').height
    const screenWidth = Dimensions.get('window').width
    console.log("Screen Height: " + screenHeight)
    console.log("Screen Width: " + screenWidth)


    useEffect(() => {
        const timeout= setTimeout(() => {
            navigation.goBack();
        }, 3000)
    }, [])


    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: 'black', 
            //marginTop: 40 
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 12,
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} source={{uri: selectedItem.avatar}} />
                <Text style={{ fontSize: 19, fontWeight: 700, color: 'white' }}>{selectedItem.name}</Text>
                <Text style={{ fontSize: 17, fontWeight: 400, color: 'white', marginLeft: 10 }}>{storyTime}</Text>
            </View>

            <View style={{ position: 'absolute' }}>
                <Image
                    source={{uri: selectedItem.image}}
                    style={{
                        height: screenHeight - 70,
                        width: screenWidth,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                    }} />
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: 'white', 
                            width: 310,
                            height: 50, 
                            paddingHorizontal: 15, 
                            color: 'white',
                            borderRadius: 30,
                            marginHorizontal: 25,
                        }} 
                        placeholder="Message"
                        placeholderTextColor={'white'}
                    />
                    <TouchableOpacity>
                        <Image style= {{height: 30, width: 30, tintColor: 'white', marginRight: 10}} source={require("../../../../assets/images/image/message-outline-white.png")}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <Button title="Go back" onPress={navigation.goBack}/> */}
        </View>
    )
}

export default StoryView;