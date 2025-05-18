import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"


const SearchContent = (props: { data: (arg0: null) => void }) => {

    const searchData = [
        {
            id: 0,
            images: [
                require("../../../../assets/storage/post1.png"),
                require("../../../../assets/storage/post2.png"),
                require("../../../../assets/storage/post3.png"),
                require("../../../../assets/storage/post4.png"),
                require("../../../../assets/storage/post5.png"),
                require("../../../../assets/storage/post6.png")
            ]
        },
        {
            id: 1,
            images: [
                require("../../../../assets/storage/post11.png"),
                require("../../../../assets/storage/post10.png"),
                require("../../../../assets/storage/post12.png"),
                require("../../../../assets/storage/post8.png"),
                require("../../../../assets/storage/post7.png"),
                require("../../../../assets/storage/post9.png")
            ]
        },
        {
            id: 2,
            images: [
                require("../../../../assets/storage/post1.png"),
                require("../../../../assets/storage/post2.png"),
                require("../../../../assets/storage/post3.png"),
            ]
        }
    ]

    return (
        <View >
            {
                searchData.map((data, index) => {
                    return (
                        <>
                            {
                                data.id === 0 ?
                                    (
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between'
                                        }}>
                                            {
                                                data.images.map((imageData, imgIndex) => {
                                                    return (
                                                        <TouchableOpacity 
                                                            onPressIn={() => props.data(imageData)}
                                                            onPressOut={() => props.data(null)}
                                                            style={{ paddingBottom: 2 }}>
                                                                <Image
                                                                    source={imageData}
                                                                    style={{ width: 135.5, height: 150 }}
                                                                />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    ) : null
                            }
                            {
                                data.id === 1 ?
                                    (
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                width: 274,
                                                justifyContent: 'space-between'
                                            }}>
                                                {
                                                    data.images.slice(0,4).map((imageData, imgIndex) => {
                                                        return (
                                                            <TouchableOpacity 
                                                                onPressIn={() => props.data(imageData)}
                                                                onPressOut={() => props.data(null)}
                                                                style={{ paddingBottom: 2 }}
                                                                >
                                                                    <Image
                                                                        source={imageData}
                                                                        style={{ width: 135.5, height: 150 }}
                                                                    />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>
                                            <TouchableOpacity 
                                                onPressIn={() => props.data(data.images[5])}
                                                onPressOut={() => props.data(null)}
                                                style={{ marginLeft: 2 }}
                                                >
                                                <Image
                                                    source={data.images[5]}
                                                    style={{ width: 135, height: 302 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ) : null
                            }
                            {
                                data.id === 2 ?
                                (
                                    <View 
                                        style= {{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >   
                                        <TouchableOpacity 
                                            onPressIn={() => props.data(data.images[2])}
                                            onPressOut={() => props.data(null)}
                                            style= {{paddingRight: 2}}
                                            >
                                                <Image 
                                                    source={data.images[2]} 
                                                    style= {{width: 273, height: 300}}
                                                />
                                        </TouchableOpacity>
                                        <View style= {{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            width: 135,
                                            justifyContent: 'space-between'
                                        }}>
                                            {
                                                data.images.slice(0,2).map((imagaData, imgIndex) => {
                                                    return (
                                                        <TouchableOpacity 
                                                            onPressIn={() => props.data(imagaData)}
                                                            onPressOut={() => props.data(null)}
                                                            style= {{paddingBottom: 2}}
                                                            >
                                                                <Image 
                                                                    source={imagaData}
                                                                    style= {{width: 135.5, height: 150}}    
                                                                />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                ): null
                            }
                        </>
                    )
                })
            }
        </View>
    )
}

export default SearchContent;