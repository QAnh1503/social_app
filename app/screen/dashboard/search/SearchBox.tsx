import { useState } from "react";
import { View , Text, Image, TextInput} from "react-native"


type SearchBoxProps = {
    onSearch: (text: string) => void;
};

// const SearchBox = () => {
const SearchBox = ({ onSearch }: SearchBoxProps) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        onSearch(text); // Gọi lên component cha
    };
    return (
        <View 
            style= {{
                //marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 10, 
                position:'relative'
            }}
        >
            {/* <Ionic/> */}
            <Image 
                style= {{
                    width: 20, 
                    height: 20,
                    opacity: 0.3,
                    position: 'absolute',
                    zIndex: 1,
                    left: 25
                }} 
                source={require("../../../../assets/images/image/searchIconOutline.png")}
            />
            <TextInput 
                value={searchText}
                onChangeText={handleSearchChange}
                placeholder="Search" 
                placeholderTextColor='#909090' 
                style= {{
                    width: '94%',
                    backgroundColor: '#EBEBEB',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    padding: 8,
                    paddingLeft: 40
                }}
            />
        </View>
    )
}

export default SearchBox;