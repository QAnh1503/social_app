type RootStackParamList = {
    
    Home: undefined;
   
    Story: { item: any };
    Dashboard: undefined;
    ChatScreen: undefined;
    Message: {targetId: string}
    Login: undefined;
    Register: undefined;

    ChatBot: {backgroundInfo: string, question: string} 

    Payment: {};
    // chat: {
    //   name: string;
    //   avatar?: string;
    //   lastActive?: string;
    // }

    AddPost: undefined;
    EditProfile: undefined;
    AddStory: undefined;

    ProfilePostDetail: {item: any};
    //PostListDetails: {item: any};
    PostListDetails: {idPost: any, idUser: any, isLike: any};

    Followers: undefined;
    Followings: undefined

    UserProfileFollow: {item: any};
    UserProfileSearch: { user: any }; 

    CommunityGroupDetails: {item: any};
   
    Answer: {item: any};
};



// declare module "*.png"