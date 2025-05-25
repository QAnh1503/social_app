type RootStackParamList = {
    // home: undefined;
    // "review-detail": {id: number; title: string, star: number} | undefined;

    Home: undefined;
    // Story: undefined;
    
    //Story: {id: number; name: string} | undefined;
    Story: { item: any };
    Dashboard: undefined;
    // Dashboard: { email: string }; // <-- thêm email
    ChatScreen: undefined;
    // Message: {chat: any}
    Message: {targetId: string}
    Login: undefined;
    Register: undefined;

    // chat: {
    //   name: string;
    //   avatar?: string;
    //   lastActive?: string;
    // }

    // AddPost: {idUser: number};
    AddPost: undefined;
    EditProfile: undefined;
    AddStory: undefined;

    ProfilePostDetail: {item: any};
    PostListDetails: {item: any};

    Followers: undefined;
    Followings: undefined

    UserProfileFollow: {item: any};
    UserProfileSearch: { user: any }; 

    // Community
    //CommunityGroupDetails: undefined;
    CommunityGroupDetails: {item: any};
    CommunityFood: undefined;
    CommunityDrink: undefined;
    CommunityRecipe: undefined;
    CommunityYoga: undefined;
    CommunityGym: undefined;
    CommunityJogging: undefined;
    CommunityMedicine: undefined;
    Answer: {item: any};
};



// declare module "*.png"