import React from 'react';
import { PostType } from '../../../components/dashboard/Post';
import { DUMMY_POSTS } from '../../../data/dummyPost';
import PostList from '../PostList';

export default function ForYou() {
  return <PostList postList={DUMMY_POSTS} />;
} 