import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export type NotificationType = 'like' | 'comment' | 'follow' | 'multiple_like';

interface NotificationElementProps {
  type: NotificationType;
  usernames: string[];
  timeAgo: string;
  postImage?: string;
  commentText?: string;
  othersCount?: number;
  onActionPress?: () => void;
}

const NotificationElement: React.FC<NotificationElementProps> = ({
  type,
  usernames,
  timeAgo,
  postImage,
  commentText,
  othersCount,
  onActionPress,
}) => {
  const renderAvatar = () => {
    if (type === 'multiple_like') {
      return (
        <View style={styles.multipleAvatars}>
          <Image
            source={{ uri: `https://placekitten.com/50/50` }}
            style={[styles.avatar, styles.stackedAvatar]}
          />
          <Image
            source={{ uri: `https://placekitten.com/51/51` }}
            style={[styles.avatar, styles.stackedAvatar, styles.secondAvatar]}
          />
        </View>
      );
    }
    return (
      <Image
        source={{ uri: `https://placekitten.com/50/50` }}
        style={styles.avatar}
      />
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'like':
        return (
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{usernames[0]}</Text> liked your photo.
          </Text>
        );
      case 'multiple_like':
        return (
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{usernames.join(', ')}</Text>
            {othersCount && othersCount > 0 ? ` and ${othersCount} others` : ''} liked your photo.
          </Text>
        );
      case 'comment':
        return (
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{usernames[0]}</Text> mentioned you in a comment:{' '}
            <Text style={styles.mention}>{commentText}</Text>
          </Text>
        );
      case 'follow':
        return (
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{usernames[0]}</Text> started following you.
          </Text>
        );
      default:
        return null;
    }
  };

  const renderAction = () => {
    if (type === 'comment') {
      return (
        <TouchableOpacity style={styles.replyButton} onPress={onActionPress}>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      );
    }
    if (type === 'follow') {
      return (
        <TouchableOpacity
          style={[styles.actionButton, styles.followButton]}
          onPress={onActionPress}
        >
          <Text style={[styles.actionButtonText, styles.followButtonText]}>
            Follow
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.notificationItem}>
      {renderAvatar()}
      <View style={styles.notificationContent}>
        {renderContent()}
        <Text style={styles.timeStamp}>{timeAgo}</Text>
        {type === 'comment' && renderAction()}
      </View>
      {(type === 'like' || type === 'multiple_like' || type === 'comment') && postImage && (
        <Image source={{ uri: postImage }} style={styles.postImage} />
      )}
      {type === 'follow' && renderAction()}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  multipleAvatars: {
    width: 44,
    height: 44,
    marginRight: 10,
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  stackedAvatar: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
  secondAvatar: {
    left: 22,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
  },
  username: {
    fontWeight: '600',
  },
  mention: {
    color: '#0095F6',
    fontWeight: '600',
  },
  timeStamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
  },
  followButton: {
    backgroundColor: '#0095F6',
    borderColor: '#0095F6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  followButtonText: {
    color: '#fff',
  },
  replyButton: {
    marginTop: 4,
  },
  replyText: {
    color: '#8E8E8E',
    fontSize: 14,
  },
});

export default NotificationElement; 