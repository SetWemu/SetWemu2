import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  ChatCircleDots,
  PaperPlaneTilt,
  MapPin,
  Bell,
  Plus,
} from 'phosphor-react-native';

const initialStories = [
  {
    id: '0',
    name: 'Your Story',
    avatar: 'https://i.pravatar.cc/100?img=10',
    isAdd: true,
  },
  { id: '1', name: 'Sarah', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: '2', name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: '3', name: 'Emma', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/100?img=8' },
];

const initialPosts = [
  {
    id: '1',
    user: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/100?img=5',
    time: '2h ago',
    caption: 'What an incredible night at the Summer Music Festival! 🎶✨',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063',
    event: 'Summer Music Festival 2025',
    likes: 342,
    liked: false,
    comments: [
      {
        id: 'c1',
        user: 'Alex Rivera',
        text: 'This looks amazing!',
        replies: [{ id: 'r1', user: 'Sarah', text: 'It was 🔥!' }],
      },
    ],
  },
  {
    id: '2',
    user: 'Nina Grey',
    avatar: 'https://i.pravatar.cc/100?img=1',
    time: '5h ago',
    caption: 'Live music tonight was insane 🎸',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a',
    event: 'City Music Fest',
    likes: 220,
    liked: false,
    comments: [
      {
        id: 'c2',
        user: 'Mike Chen',
        text: 'Wish I was there!',
        replies: [],
      },
    ],
  },
  {
    id: '3',
    user: 'Adam Lee',
    avatar: 'https://i.pravatar.cc/100?img=8',
    time: '1d ago',
    caption: 'Best street food experience ever 🔥',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9',
    event: 'Street Food Carnival',
    likes: 301,
    liked: false,
    comments: [],
  },
];

export default function HomeScreen({ navigation }) {
  const [stories, setStories] = useState(
    initialStories.map(s => ({ ...s, viewed: false })),
  );
  const [posts, setPosts] = useState(initialPosts);
  const [selectedComments, setSelectedComments] = useState(null);

  const handleStoryClick = index => {
    const updated = [...stories];
    updated[index].viewed = true;
    setStories(updated);

    if (stories[index].isAdd) {
      navigation?.navigate('CreateStory');
    } else {
      navigation?.navigate('Stories', {
        username: stories[index].name,
        avatar: stories[index].avatar,
        storyId: stories[index].id,
      });
    }
  };

  const toggleLike = id => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          const liked = post.liked;
          return {
            ...post,
            liked: !liked,
            likes: liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const renderStory = ({ item, index }) => (
    <TouchableOpacity
      style={styles.storyItem}
      onPress={() => handleStoryClick(index)}
    >
      <View style={[styles.storyCircle, item.viewed && { opacity: 0.4 }]}>
        <Image source={{ uri: item.avatar }} style={styles.storyImage} />
        {item.isAdd && (
          <View style={styles.plusBadge}>
            <Plus size={12} color="#000" weight="bold" />
          </View>
        )}
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <Text style={styles.caption}>{item.caption}</Text>

      <TouchableOpacity
        style={styles.eventTag}
        onPress={() => navigation?.navigate('EventDetail', { event: item })}
      >
        <MapPin size={14} color="#8DDFF5" weight="fill" />
        <Text style={styles.eventText}>{item.event}</Text>
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <View style={styles.actionItem}>
            <Heart
              size={22}
              color={item.liked ? '#FF453A' : '#ABABAB'}
              weight={item.liked ? 'fill' : 'regular'}
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedComments(item.comments)}>
          <View style={styles.actionItem}>
            <ChatCircleDots size={22} color="#ABABAB" weight="bold" />
            <Text style={styles.actionText}>
              {item.comments ? item.comments.length : 0}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.actionItem}>
            <PaperPlaneTilt size={22} color="#ABABAB" weight="bold" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Feed</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity onPress={() => navigation?.navigate('CreateStory')}>
            <Plus size={24} color="#ADF3FF" weight="bold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation?.navigate('ChatList')}>
            <ChatCircleDots size={24} color="#F2F2F7" weight="bold" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={stories}
            renderItem={renderStory}
            keyExtractor={(item, index) => item.id + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 16, marginBottom: 10 }}
          />
        }
      />

      <Modal visible={!!selectedComments} animationType="slide" transparent>
        <SafeAreaView style={styles.modal}>
          <Text style={styles.modalTitle}>Comments</Text>

          {selectedComments?.map(c => (
            <View key={c.id} style={styles.comment}>
              <Text style={styles.commentUser}>{c.user}</Text>
              <Text style={styles.commentText}>{c.text}</Text>

              {c.replies?.map(r => (
                <View key={r.id} style={styles.reply}>
                  <Text style={styles.commentUser}>{r.user}</Text>
                  <Text style={styles.commentText}>{r.text}</Text>
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setSelectedComments(null)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E0E10' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  storyItem: { alignItems: 'center', marginRight: 14 },
  storyCircle: {
    borderWidth: 2,
    borderColor: '#8DDFF5',
    borderRadius: 40,
    padding: 2,
  },
  storyImage: { width: 68, height: 68, borderRadius: 34 },
  storyName: { color: '#ABABAB', fontSize: 12, marginTop: 5 },
  plusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8DDFF5',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  card: {
    backgroundColor: '#1C1C1E',
    margin: 16,
    marginTop: 0,
    borderRadius: 18,
    padding: 14,
  },
  headerRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  user: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  time: { color: '#6B6B6B', fontSize: 12 },
  caption: { color: '#fff', marginVertical: 8, lineHeight: 20 },
  eventTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8DDFF520',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  eventText: {
    color: '#8DDFF5',
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '600',
  },
  image: { width: '100%', height: 200, borderRadius: 12 },
  actions: { flexDirection: 'row', gap: 20, marginTop: 12 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { color: '#ABABAB', fontSize: 13 },
  modal: { flex: 1, backgroundColor: '#141416', padding: 20 },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  comment: {
    marginBottom: 15,
    backgroundColor: '#1C1C1E',
    padding: 12,
    borderRadius: 12,
  },
  commentUser: { color: '#ADF3FF', fontWeight: 'bold', marginBottom: 4 },
  commentText: { color: '#fff', lineHeight: 20 },
  reply: {
    marginLeft: 15,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#8DDFF5',
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
  },
});
