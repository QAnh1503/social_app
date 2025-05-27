import { StyleSheet } from "react-native";

export const AddStoryStyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        position: "relative",
    },
    headerAddPost: {
        position: "relative",
        height: 70,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "row",
        zIndex: 10, // Thêm dòng này
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
    },
    button: {
        marginLeft: 0,
        width: 100,
        height: 70,
        //backgroundColor: "#eee",
        // borderRadius: 8,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // elevation: 5, // cho Android
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#666",
        fontSize: 20,
        fontWeight: "400",
        textAlignVertical: "center",
        justifyContent: "center",
    },
    text: {
        position: "absolute",
        //left: 0,
        right: 20,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "serif",
        //fontFamily: 'SpaceMono-Regular',
        color: "#ccc",
    },
    iconUpload: {
        position: "absolute",
        right: 12,
        width: 35,
        height: 45,
        marginLeft: 10,
        resizeMode: "contain",
    },
    addPostContentDescription: {
        //backgroundColor: "#dcdcdc",
        //backgroundColor: "#fff",
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 15,
        //marginBottom: 20,
        width: 370,
        height: 60,

        // Hiệu ứng bóng mờ
        // shadowColor: "#000",
        // shadowOffset: {
        // width: 4,
        // height: 4,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 8,
        // elevation: 8, // Cho Android
    },
    addPostContentImage: {
        //backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 20,
        width: 380,
        //height: 550,

        // Hiệu ứng bóng mờ
        // shadowColor: "#000",
        // shadowOffset: {
        // width: 0,
        // height: 4,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 8,
        // elevation: 8, // Cho Android
    },
    

    textDescription: {
        fontFamily: "serif",
        flex: 1,
        padding: 10,
        //paddingTop: 33,
        margin: 10,
        fontSize: 16,
        color: "#000",
        borderBottomWidth: 2,       
        borderBottomColor: "#ccc",  
        textAlignVertical: "center",
    },
    titleEachPostContent: {
        marginHorizontal: 20,
        fontSize: 19,
        justifyContent: "center",
        fontFamily: "serif",
        fontWeight: "500",
        //color: "#696969"
    },

    // ===================== CHOOSE IMG ======================
    // buttonChooseImgText: {
    //     color: "#fff",
    //     fontSize: 18,
    //     fontWeight: "bold",
    //     textAlignVertical: "center",
    //     justifyContent: "center",
    // },
    // buttonChooseImg: {
    //     marginLeft: 0,
    //     marginTop: 20,
    //     width: 150,
    //     height: 40,
    //     //backgroundColor: "#000",
    //     // borderRadius: 8,
    //     // shadowColor: "#000",
    //     // shadowOffset: { width: 0, height: 2 },
    //     // shadowOpacity: 0.3,
    //     // shadowRadius: 4,
    //     // elevation: 5, // cho Android
    //     // justifyContent: "center",
    //     // alignItems: "center",
    // },

   
    footerAddPost: {
        position: "relative",
        height: 60,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "row",
        zIndex: 10, 
    },
});