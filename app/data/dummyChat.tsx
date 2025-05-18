import { ChatItemType } from '../components/chats/ChatItem';

export const DUMMY_CHATS: ChatItemType[] = Array(9).fill(null).map((_, index) => ({
  id: index.toString(),
  name: 'Name Surname',
  lastMessage: 'Sent yesterday',
  time: 'yesterday',
  avatar: undefined
})); 