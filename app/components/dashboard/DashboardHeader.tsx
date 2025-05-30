import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native"
const LogoImage = require("../../../assets/images/common/logo.png")
const HearLogoImage = require("../../../assets/images/image/heart-icon.png");
const MessageLogoImage = require("../../../assets/images/image/message.png")

interface DashboardHeaderProps {
    unreadNotification: number
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({unreadNotification}) => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    
    return (
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, backgroundColor: '#fff'}}>
            <Image style={{ height: 37, width: 98 }} source={LogoImage} />
            <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                <TouchableOpacity style={{ marginRight: 18 }}>
                    <Image style={{ height: 30, width: 30 }} source={HearLogoImage} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style= {{marginRight: 7, backgroundColor: '#fff'}}
                    onPress={() => navigation.navigate('ChatScreen')}
                    >
                    <View style= {{position: 'relative', backgroundColor: '#fff'}}>
                        <Image style={{ height: 34, width: 33 }} source={MessageLogoImage} />
                        {/* <View style= {{position: 'absolute', bottom: 22, left: 25}}>
                            <Text style= {{backgroundColor: 'white', paddingHorizontal: 5, borderRadius: 10,borderWidth: 1, borderColor: 'black'}}>{unreadNotification}</Text>
                        </View> */}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DashboardHeader;