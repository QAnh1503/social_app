import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
    email: string;
    setEmail: (email: string) => void;
    // idUser: number;
    // setIdUser: (id: number) => void;
    //MONGO
    idUser: string;
    setIdUser: (id: string) => void;

    avatar: string;
    setAvatar: (avatar: string) => void;
    name: string;
    setName: (name: string) => void;

    following:number;
    setFollowing: (following: number) => void;
    followers: number;
    setFollowers: (followers: number) => void;
    posts: number;
    setPosts: (posts: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, setEmail] = useState('');
    // const [idUser, setIdUser] = useState(0); 
    const [avatar, setAvatar] = useState(''); 
    const [name, setName] = useState('');
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [posts, setPosts] = useState(0);
    // MONGO
    const [idUser, setIdUser] = useState(''); 


    return (
        <UserContext.Provider  value={{ email, setEmail, idUser, setIdUser, avatar, setAvatar, name, setName , following, setFollowing, followers, setFollowers, posts, setPosts}}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
