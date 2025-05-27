import axios from 'axios';

// [CAUTION]: You mustn't remove or change this line. You should go to ".env" file and replace value of EXPO_PUBLIC_API_URL
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.debug('[Api] server address', API_URL)

// USER
export const loginUser = async (data: { email: string; password: string }) => {
  return await axios.post(`${API_URL}api/v2/users/login`, data);
};

export const getAll = async () => {
  return await axios.get(`${API_URL}api/v2/users/`);
};

export const getOneUserById = async (data: { user: string }) => {
  return await axios.get(`${API_URL}api/v2/users/id/${data.user}`);
};

export const registerUser = async (data: { email: string; password: string; name: string }) => {
  return await axios.post(`${API_URL}api/v2/users/register`, data);
};

export const updateAvatar = async (data: { idUser: string, avatar: string }) => {
  return await axios.put(`${API_URL}api/v2/users/${data.idUser}`, data);
};

export const updateUserProfile = async (data: { idUser: string, name: string, email: string , website: string, bio: string, phone: string, gender: string, avatar: string }) => {
  return await axios.put(`${API_URL}api/v2/users/${data.idUser}`, data);
};


// ===== POST =====

export const getAllPost = async () => {
  return await axios.get(`${API_URL}api/v2/posts/`);
}

export const getOnePostWithIdPost = async (data: { idPost: string }) => {
  return await axios.get(`${API_URL}api/v2/posts/${data.idPost}`);
};

export const addPost = async (data: { description: string; image: string; tags: string; idUser: string }) => {
  return await axios.post(`${API_URL}api/v2/posts/post`, data);
}

export const updatePost = async (data: { id: string, likes: number }) => {
  return await axios.put(`${API_URL}api/v2/posts/${data.id}`, data);
}

export const updatePostCmt = async (data: { id: string, number_of_comments: number }) => {
  return await axios.put(`${API_URL}api/v2/posts/${data.id}`, data);
}

export const getAllPostWithIdUser = async (data: { user: string }) => {
  return await axios.get(`${API_URL}api/v2/posts/idUser/${data.user}`);
}


// ===== STORY =====
export const getAllStory = async () => {
  return await axios.get(`${API_URL}api/v2/stories/`);
}

export const addStory = async (data: { content: string; image: string; user: string }) => {
  return await axios.post(`${API_URL}api/v2/stories/story`, data);
}


// ===== COMMENT =====
export const addComment = async (data: { comment: string; idPost: string; idUser: string }) => {
  return await axios.post(`${API_URL}api/v2/comments/comment`, data);
}

// export const getAllCommentWithIdPost = async (data: { idPost: string }) => {
//   return await axios.get(`${API_URL}api/v2/comments?postId=${data.idPost}`);
// }
export const getAllCommentWithIdPost = async (data: { idPost: string }) => {
  return await axios.get(`${API_URL}api/v2/comments/${data.idPost}`);
}


// ===== FOLLOWER =====
// export const getAllFollowersWithIdUser = async (data: { user: string }) => {
//   return await axios.get(`${API_URL}api/v2/followers?idUser=${data.user}`);
// }
export const getAllFollowersWithIdUser = async (data: { user: string }) => {
  return await axios.get(`${API_URL}api/v2/followers/${data.user}`);
}

export const addFollower = async (data: { idUserFollower: string; nameUserFollower: string; idUser: string }) => {
  return await axios.post(`${API_URL}api/v2/followers/follower`, data);
}

export const deleteFollower = async (id: string) => {
  return await axios.delete(`${API_URL}api/v2/followers/${id}`);
}

export const checkIdUser_IdUserFollower = async (data: {idUser: string; idUserFollower: string}) => {
  return await axios.get(`${API_URL}followers/exists/${data.idUser}/${data.idUserFollower}`);
}

export const deleteFollowerByIdUserIdUserFollower = async (data: { idUser: string; idUserFollower: string}) => {
  return await axios.delete(`${API_URL}api/v2/followers/delete/${data.idUser}/${data.idUserFollower}`);
}



// ===== FOLLOWING =====
// export const getAllFollowingWithIdUser = async (data: { user: string }) => {
//   return await axios.get(`${API_URL}api/v2/following?userId=${data.user}`);
// }
export const getAllFollowingWithIdUser = async (data: { user: string }) => {
  return await axios.get(`${API_URL}api/v2/following/${data.user}`);
}

export const addFollowing = async (data: { userFollowing: string; nameUserFollowing: string; user: string }) => {
  return await axios.post(`${API_URL}api/v2/following/following`, data);
}

// export const deleteFollowing = async (id: string) => {
//   return await axios.delete(`${API_URL}api/v2/following/${id}`);
// }
export const deleteFollowing = async (data: { idUser: string; idUserFollowing: string}) => {
  return await axios.delete(`${API_URL}api/v2/following/${data.idUser}/${data.idUserFollowing}`);
}

export const checkIdUser_IdUserFollowing = async (data: {idUser: string; idUserFollowing: string}) => {
  return await axios.get(`${API_URL}api/v2/following/exists/${data.idUser}/${data.idUserFollowing}`);
}


// ===== QUESTION =====

export const getAllQues = async () => {
  return await axios.get(`${API_URL}api/v2/questions/`);
}

export const getAllQuesWithTags = async (data: {tags: string;}) => {
  return await axios.get(`${API_URL}api/v2/questions/${data.tags}`);
}

export const addQues = async (data: { question: string; user: string; tags: string }) => {
  return await axios.post(`${API_URL}api/v2/questions/question`, data);
}


// ===== ANSWER =====

export const getAllAns = async () => {
  return await axios.get(`${API_URL}api/v2/answers/`);
}

// export const getAllAnsWithQuestionId = async (data: { question: string }) => {
//   return await axios.get(`${API_URL}api/v2/answers?questionId=${data.question}`);
// }
export const getAllAnsWithQuestionId = async (data: { question: string }) => {
  return await axios.get(`${API_URL}api/v2/answers/${data.question}`);
}

export const addAns = async (data: { answer: string; user: string; question: string }) => {
  return await axios.post(`${API_URL}api/v2/answers/answer`, data);
}


// ===== PRODUCT =====
export const getAllProducts = async () => {
  return await axios.get(`${API_URL}api/v2/products/`);
};

export const getProductById = async (id: string) => {
  return await axios.get(`${API_URL}api/v2/products/${id}`);
};

export const addProduct = async (data: { name: string; price: number; description: string }) => {
  return await axios.post(`${API_URL}api/v2/products/`, data);
};

export const updateProduct = async (id: string, data: { name?: string; price?: number; description?: string }) => {
  return await axios.put(`${API_URL}api/v2/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return await axios.delete(`${API_URL}api/v2/products/${id}`);
};



//= = = =  Messages = = = =
export const getMessages = async (idUser_1: any, idUser_2: any) => {
  return await axios.get(`${API_URL}api/v2/messages/conversations/${idUser_1}/${idUser_2}`)
}

export const getConversations = async (idUser: any) => {
  return await axios.get(`${API_URL}api/v2/messages/conversations/${idUser}`)
}

export const addCoins = async (idUser: any, itemType: any) => {
  return await axios.get(`${API_URL}api/v2/momo/getPayment/${idUser}/${itemType}`)
}