import axios from 'axios';

//const API_URL = 'http://192.168.1.5:3000/'; 
// const API_URL = "http://192.168.10.29:3000/"; // boyfr
//const API_URL = "http://192.168.240.1:3000/"; // home
const API_URL = "http://172.21.64.1:3000/"; 
//const API_URL = "http://192.168.1.168:3000/"; // anh kafe
// const API_URL = "http://192.168.11.149:3000/"; 

 

// ===== USER =====

// export const loginUser = async (email, password) => {
//   return await axios.post(`${API_URL}user/login`, { email, password });
// };

export const loginUser = async (data: { email: string; password: string }) => {
  return await axios.post(`${API_URL}users/login`, data);
};

// export const loginUserID = async (data: { id: number }) => {
//   return await axios.post(`${API_URL}users/id`+data.id, data);
// };

export const getAll = async () => {
  return await axios.get(`${API_URL}users/`);
};

export const getOneUserById = async (data: { idUser: number }) => {
  return await axios.get(`${API_URL}users/id/${data.idUser}`);
};

export const registerUser = async (data: { email: string; password: string; name: string }) => {
  return await axios.post(`${API_URL}users/register`, data);
};

export const updateAvatar = async (data: { idUser: number, avatar: string }) => {
  return await axios.patch(`${API_URL}users/${data.idUser}`, data);
};
export const updateUserProfile = async (data: { idUser: number,name: string, email: string , website: string, bio: string, phone: string,gender:string, avatar:string}) => {
  return await axios.patch(`${API_URL}users/${data.idUser}`, data);
};


// ===== POST =====

export const getAllPost = async () => {
  return await axios.get(`${API_URL}posts/`);
}

export const addPost = async (data: {description: string; image: string; tags: string; idUser: number}) => {
  return await axios.post(`${API_URL}posts/post`, data);
}

export const updatePost = async (data: {idPost: number, likes: number}) => {
  return await axios.patch(`${API_URL}posts/${data.idPost}`, data);
}

export const updatePostCmt = async (data: {idPost: number, number_of_comments: number}) => {
  return await axios.patch(`${API_URL}posts/${data.idPost}`, data);
}

export const getAllPostWithIdUser = async (data: {idUser: number;}) => {
  return await axios.get(`${API_URL}posts/idUser/${data.idUser}`);
}


// ===== STORY =====

export const getAllStory = async () => {
  return await axios.get(`${API_URL}stories/`);
}

export const addStory = async (data: { content: string; image: string; idUser: number}) => {
  return await axios.post(`${API_URL}stories/story`, data);
}


// ===== COMMENT =====
export const addComment = async (data: { comment: string; idPost: number; idUser: number}) => {
  return await axios.post(`${API_URL}comments/comment`, data);
}

export const getAllCommentWithIdPost = async (data: {idPost: number;}) => {
  return await axios.get(`${API_URL}comments/${data.idPost}`);
}


// ===== FOLLOWER =====
export const getAllFollowersWithIdUser = async (data: {idUser: number;}) => {
  return await axios.get(`${API_URL}followers/${data.idUser}`);
}

export const addFollower = async (data: { idUserFollower: number;nameUserFollower: string; idUser: number}) => {
  return await axios.post(`${API_URL}followers/follower`, data);
}

export const checkIdUser_IdUserFollower = async (data: {idUser: number; idUserFollower: number}) => {
  return await axios.get(`${API_URL}followers/exists/${data.idUser}/${data.idUserFollower}`);
}

export const deleteFollower = async (data: { idFollower: number;}) => {
  return await axios.delete(`${API_URL}followers/${data.idFollower}`);
}

export const deleteFollowerByIdUserIdUserFollower = async (data: { idUser: number; idUserFollower: number}) => {
  return await axios.delete(`${API_URL}followers/delete/${data.idUser}/${data.idUserFollower}`);
}


// ===== FOLLOWING =====
export const getAllFollowingWithIdUser = async (data: {idUser: number;}) => {
  return await axios.get(`${API_URL}following/${data.idUser}`);
}

export const addFollowing = async (data: { idUserFollowing: number;nameUserFollowing: string; idUser: number}) => {
  return await axios.post(`${API_URL}following/following`, data);
}

export const checkIdUser_IdUserFollowing = async (data: {idUser: number; idUserFollowing: number}) => {
  return await axios.get(`${API_URL}following/exists/${data.idUser}/${data.idUserFollowing}`);
}

export const deleteFollowing = async (data: { idUser: number; idUserFollowing: number}) => {
  return await axios.delete(`${API_URL}following/${data.idUser}/${data.idUserFollowing}`);
}


// ===== QUESTION =====

export const getAllQues = async () => {
  return await axios.get(`${API_URL}questions/`);
}

export const getAllQuesWithTags = async (data: {tags: string;}) => {
  return await axios.get(`${API_URL}questions/${data.tags}`);
}

export const addQues = async (data: { question: string; idUser: number; tags: string}) => {
  return await axios.post(`${API_URL}questions/question`, data);
}


// ===== ANSWER =====

export const getAllAns = async () => {
  return await axios.get(`${API_URL}answers/`);
}

export const getAllAnsWithIdQues = async (data: {idQues: number;}) => {
  return await axios.get(`${API_URL}answers/${data.idQues}`);
}

export const addAns = async (data: { answer: string; idUser: number; idQues: number}) => {
  return await axios.post(`${API_URL}answers/answer`, data);
}

