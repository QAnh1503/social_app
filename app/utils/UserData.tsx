// export const UserData = [
//     {
//         id: 1,
//         name : 'Elon Musk',
//         username : 'muskelon',
//         profile : require('../../assets/images/image/data/elondp.png'),
//         story : {
//             time : 10,
//             image : require('../../assets/images/image/data/elonstory.png'),
//         },
//         post : {
//             time : '09:00:00',
//             date : '01/05/2023',
//             image : require('../../assets/images/image/data/elonpost.png'),
//             caption : 'Hi Everyone, Elon musk is here',
//             like : 30,
//         }
//     },
//     {
//         id: 2,
//         name : 'Harsh Beniwal',
//         username : 'harsh',
//         profile : require('../../assets/images/image/data/harshdp.png'),
//         story : {
//             time : 8,
//             image : require('../../assets/images/image/data/harshs.png'),
//         },
//         post : {
//             time : '04:00 PM',
//             date : '08/04/2023',
//             image : require('../../assets/images/image/data/harshp.png'),
//             caption : 'hi....',
//             like : 25,
//         }
//     },
//     {
//         id: 3,
//         name : 'Modi',
//         username : 'nmodi',
//         profile : require('../../assets/images/image/data/modidp.png'),
//         story : {
//             time : 15,
//             image : require('../../assets/images/image/data/modip.png'),
//         },
//         post : {
//             time : '07:00 AM',
//             date : '12/05/2023',
//             image : require('../../assets/images/image/data/modis.png'),
//             caption : '2000 ke note band',
//             like : 99,
//         }
//     },
//     {
//         id: 4,
//         name : 'Sonam',
//         username : 'sonamb12',
//         profile : require('../../assets/images/image/data/sonamdp.png'),
//         story : {
//             time : 13,
//             image : require('../../assets/images/image/data/sonams.png'),
//         },
//         post : {
//             time : '07:00 AM',
//             date : '12/05/2023',
//             image : require('../../assets/images/image/data/sonmp.png'),
//             caption : 'carry on jatta',
//             like : 88,
//         }
//     },
// ];

import { useEffect, useState } from "react";
import { getAll, getAllStory, getOneUserById } from "../nestjs/api";
import { formatDistanceToNow } from "date-fns";


type User = {
  id: number;
  name: string;
  email: string;
  avatar: string; // đường dẫn avatar (nếu có)
  story?: {
    image: any; // hoặc string nếu bạn dùng URL
  };
};
type Story = {
    idStory: number;
    image: string;
    content: string;
    created_at: string;
    idUser: number;
    name: string;
    avatar: string;
}

export const useUserData = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userData, setUserData] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAll();
                const fetchedUsers: User[] = res.data;

                setUsers(fetchedUsers);

                const mappedData = fetchedUsers.map((user, index) => ({
                    id: user.id,
                    name: user.name,
                    username: `user${index + 1}`, // hoặc lấy từ backend nếu có
                    profile: require('../../assets/images/image/avatar.png'),
                    story: {
                        time: 10 + index,
                        image: require('../../assets/images/image/avatar.png'),
                    },
                    post: {
                        time: '09:00 AM',
                        date: '01/01/2024',
                        image: require('../../assets/images/image/avatar.png'),
                        caption: `Hi, I'm ${user.name}`,
                        like: 10 + index * 5,
                    },
                }));

                setUserData(mappedData);
            } catch (err) {
                console.error("Lỗi khi lấy users:", err);
            }
        };

        fetchUsers();
    }, []);

    return userData;

}

export const useStoryData = () => {
    const [stories, setStories] = useState<Story[]>([]);
    //const [storyData, setStoryData] = useState<any[]>([]);
    const storiesWithUser:
    {       
        idStory: any;
        image: any;
        content: any;
        created_at: any;
        idUser: any;
        name: any;
        avatar: any;
      }[] = [];

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await getAllStory();
                // const fetchedStories: Story[] = res.data;
                // console.log("------- FETCHED STORY: ",fetchStories);


                const stories = res.data;
                console.log("------------------STORIES-----------------");
                console.log(stories);

                console.log("------------------POST DETAILS-----------------");
                    for (const story of stories) {
                        const storyResponse = await getOneUserById({ user: story.idUser });
                        const user = storyResponse.data;
                
                        const storyUser = {
                            idStory: story.idStory,
                            image: story.image,
                            content: story.content,
                            created_at: formatDistanceToNow(new Date(story.created_at), { addSuffix: true }),
                            idUser: story.idUser,
                            name: story.name,
                            avatar: story.avatar,
                          };
                
                        storiesWithUser.push(storyUser);
                }
                console.log("✅ Stories with user info:", storiesWithUser);
                setStories(storiesWithUser);

                // Làm tiếp ở đây vì mới get dlieu từ Story, chưa biết Story nào của User nào
                // setStories(fetchedStories);

                // const mappedData = fetchedStories.map((story, index) => ({
                //     idStory: story.idStory,
                //     image: story.image,
                //     content: story.content,
                //     created_at: formatDistanceToNow(new Date(story.created_at), { addSuffix: true }),
                //     idUser: story.idUser,
                //     name: story.name,
                //     avatar: story.avatar,
                // }));

                // setStoryData(mappedData);
            } catch (err) {
                console.error("Lỗi khi lấy stories:", err);
            }
        };
        fetchStories();
    }, []);
}

export const typeData = [
    {id: 1, image: require('../../assets/images/image/grid-icon.png')},
    {id: 2, image: require('../../assets/images/image/tagIcon.png')}
];