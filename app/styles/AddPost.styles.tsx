import { StyleSheet} from "react-native";
export const AddPostStyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        position: "relative",
    },
    headerAddPost: {
        position: "relative",
        height: 70,
        alignItems: "center",
        backgroundColor: "#000",
        flexDirection: "row",
        zIndex: 10, // Thêm dòng này
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
    },
    button: {
        marginLeft: 0,
        width: 90,
        height: 70,
        backgroundColor: "#000",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // cho Android
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 33,
        fontWeight: "bold",
        marginTop: -17,
        textAlignVertical: "center",
        justifyContent: "center",
    },
    text: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "serif",
        //fontFamily: 'SpaceMono-Regular',
        color: "#fff",
    },
    icon: {
        position: "absolute",
        right: 15,
        width: 45,
        height: 40,
        marginLeft: 10,
        resizeMode: "contain",
    },
    addPostViewContent: {},
    addPostContentDescription: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 20,
        width: 380,
        height: 180,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 4,
        height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentImage: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        height: 400,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentTag: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        paddingBottom: 10,
        // height: 165,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },
    addPostContentSuggestTag: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        height: 170,

        // Hiệu ứng bóng mờ
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8, // Cho Android
    },

    textDescription: {
        flex: 1,
        padding: 10,
        paddingTop: 33,
        margin: 10,
        fontSize: 16,
        color: "#000",
        borderBottomWidth: 1,       
        borderBottomColor: "#ccc",  
        textAlignVertical: "center",
    },
    titleEachPostContent: {
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 23,
        fontFamily: "serif",
        fontWeight: "700",
    },

    // ===================== CHOOSE IMG ======================
    buttonChooseImgText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlignVertical: "center",
        justifyContent: "center",
    },
    buttonChooseImg: {
        marginLeft: 0,
        marginTop: 20,
        width: 150,
        height: 40,
        backgroundColor: "#000",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // cho Android
        justifyContent: "center",
        alignItems: "center",
    },

    // ===================== TAG ======================
    tagContainer: {
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    }, 
    tag: {
        flexDirection: 'row',
        // backgroundColor: '#8c82fc',
        backgroundColor: '#666666',
        borderRadius: 8,
        paddingHorizontal: 11,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    tagText: {
        color: 'white',
        marginRight: 4,
    },
    removeText: {
        color: 'white',
        fontWeight: 'bold',
    },
});