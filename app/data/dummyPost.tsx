import { PostType } from '../components/dashboard/Post';

export const DUMMY_POSTS: PostType[] = [
  {
    id: '1',
    user: {
      name: 'Helena',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      group: 'Group name'
    },
    timeAgo: '3 min ago',
    content: {
      image: 'https://picsum.photos/500/500',
      text: 'Hello world'
    },
    stats: {
      likes: 21,
      comments: 4
    }
  },
  {
    id: '2',
    user: {
      name: 'Daniel',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      group: 'Group Name'
    },
    timeAgo: '2 hrs ago',
    content: {
      text: "Body text for a post. Since it's a social app, sometimes it's a hot take, and sometimes it's a question."
    },
    stats: {
      likes: 6,
      comments: 18
    }
  },
  {
    id: '3',
    user: {
      name: 'Daniel',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      group: 'Group Name'
    },
    timeAgo: '2 hrs ago',
    content: {
      text: "Body text for a post. Since it's a social app, sometimes it's a hot take, and sometimes it's a question."
    },
    stats: {
      likes: 6,
      comments: 18
    }
  },
  {
    id: '4',
    user: {
      name: 'Daniel',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      group: 'Group Name'
    },
    timeAgo: '2 hrs ago',
    content: {
      text: "Body text for a post. Since it's a social app, sometimes it's a hot take, and sometimes it's a question."
    },
    stats: {
      likes: 6,
      comments: 18
    }
  }
]; 