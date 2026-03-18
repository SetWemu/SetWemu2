import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Heart,
  ChatCircleDots,
  PaperPlaneTilt,
  MapPin,
  Bell,
  Plus,
} from "phosphor-react-native";

/* ================= STORIES ================= */

const initialStories = [
  { id: "0", name: "Your Story", avatar: "https://i.pravatar.cc/100?img=10", isAdd: true },
  { id: "1", name: "Sarah", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "2", name: "Alex", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: "3", name: "Emma", avatar: "https://i.pravatar.cc/100?img=3" },
];

/* ================= POSTS ================= */

const initialPosts = [
  {
    id: "1",
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/100?img=5",
    time: "2h ago",
    caption: "What an incredible night at the Summer Music Festival! 🎶✨",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    event: "Summer Music Festival 2025",
    likes: 342,
    liked: false,
    comments: [
      {
        id: "c1",
        user: "Alex Rivera",
        text: "This looks amazing!",
        replies: [{ id: "r1", user: "Sarah", text: "It was 🔥!" }],
      },
    ],
  },
  {
    id: "2",
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/100?img=5",
    time: "2h ago",
    caption: "What an incredible night at the Summer Music Festival! 🎶✨",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    event: "Summer Music Festival 2025",
    likes: 342,
    liked: false,
    comments: [
      {
        id: "c1",
        user: "Alex Rivera",
        text: "This looks amazing!",
        replies: [{ id: "r1", user: "Sarah", text: "It was 🔥!" }],
      },
    ],
  },
  {
    id: "3",
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/100?img=5",
    time: "2h ago",
    caption: "What an incredible night at the Summer Music Festival! 🎶✨",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    event: "Summer Music Festival 2025",
    likes: 342,
    liked: false,
    comments: [
      {
        id: "c1",
        user: "Alex Rivera",
        text: "This looks amazing!",
        replies: [{ id: "r1", user: "Sarah", text: "It was 🔥!" }],
      },
    ],
  },
];

/* ================= MAIN ================= */

export default function HomeScreen({ navigation }) {
  const [stories, setStories] = useState(
    initialStories.map((s) => ({ ...s, viewed: false }))
  );

  const [posts, setPosts] = useState(initialPosts);
  const [selectedComments, setSelectedComments] = useState(null);

  /* ---------- STORY CLICK ---------- */
  const handleStoryClick = (index) => {
    const updated = [...stories];
    updated[index].viewed = true;
    setStories(updated);

    if (stories[index].isAdd) {
      navigation?.navigate("CreateStory");
    } else {
      navigation?.navigate("StoryViewer");
    }
  };

  /* ---------- LIKE ---------- */
  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const liked = post.liked;
          return {
            ...post,
            liked: !liked,
            likes: liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  /* ---------- RENDER STORY ---------- */
  const renderStory = ({ item, index }) => (
    <TouchableOpacity
      style={styles.storyItem}
      onPress={() => handleStoryClick(index)}
    >
      <View
        style={[
          styles.storyCircle,
          item.viewed && { opacity: 0.4 },
        ]}
      >
        <Image source={{ uri: item.avatar }} style={styles.storyImage} />

        {item.isAdd && (
          <View style={styles.plusBadge}>
            <Plus size={12} color="#000" />
          </View>
        )}
      </View>

      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  /* ---------- RENDER POST ---------- */
  const renderPost = ({ item }) => (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      {/* CAPTION */}
      <Text style={styles.caption}>{item.caption}</Text>

      {/* EVENT TAG */}
      <TouchableOpacity
        style={styles.eventTag}
        onPress={() => navigation?.navigate("EventDetail", { event: item })}
      >
        <MapPin size={14} color="#8DDFF5" />
        <Text style={styles.eventText}>{item.event}</Text>
      </TouchableOpacity>

      {/* IMAGE */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* ACTIONS */}
      <View style={styles.actions}>

        {/* LIKE */}
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <View style={styles.actionItem}>
            <Heart
              size={22}
              color={item.liked ? "#FF453A" : "#ABABAB"}
              weight={item.liked ? "fill" : "regular"}
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </View>
        </TouchableOpacity>

        {/* COMMENT */}
        <TouchableOpacity onPress={() => setSelectedComments(item.comments)}>
          <View style={styles.actionItem}>
            <ChatCircleDots size={22} color="#ABABAB" />
            <Text style={styles.actionText}>
              {item.comments ? item.comments.length : 0}
            </Text>
          </View>
        </TouchableOpacity>

        {/* SHARE */}
        <View style={styles.actionItem}>
          <PaperPlaneTilt size={22} color="#ABABAB" />
        </View>
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Feed</Text>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={() => navigation?.navigate("CreatePost")}>
            <Plus size={24} color="#ADF3FF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation?.navigate("Notifications")}>
            <Bell size={24} color="#F2F2F7" />
          </TouchableOpacity>
        </View>
      </View>

      {/* FEED */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={stories}
            renderItem={renderStory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 16, marginBottom: 10 }}
          />
        }
      />

      {/* COMMENTS MODAL */}
      <Modal visible={!!selectedComments} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.modalTitle}>Comments</Text>

          {selectedComments?.map((c) => (
            <View key={c.id} style={styles.comment}>
              <Text style={styles.commentUser}>{c.user}</Text>
              <Text style={styles.commentText}>{c.text}</Text>

              {/* Added optional chaining (?.) here to prevent crashes if replies don't exist */}
              {c.replies?.map((r) => (
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  /* STORIES */
  storyItem: {
    alignItems: "center",
    marginRight: 14,
  },

  storyCircle: {
    borderWidth: 2,
    borderColor: "#8DDFF5",
    borderRadius: 40,
    padding: 2,
  },

  storyImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

  storyName: {
    color: "#ABABAB",
    fontSize: 12,
    marginTop: 5,
  },

  plusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8DDFF5",
    borderRadius: 10,
    padding: 2,
  },

  /* POST */
  card: {
    backgroundColor: "#1C1C1E",
    margin: 16,
    borderRadius: 18,
    padding: 14,
  },

  headerRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  user: {
    color: "#fff",
    fontWeight: "bold",
  },

  time: {
    color: "#6B6B6B",
    fontSize: 12,
  },

  caption: {
    color: "#fff",
    marginVertical: 8,
  },

  eventTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8DDFF520",
    padding: 6,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "flex-start", // Added to prevent tag from stretching across the screen
  },

  eventText: {
    color: "#8DDFF5",
    marginLeft: 5,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  actionText: {
    color: "#ABABAB",
  },

  /* MODAL */
  modal: {
    flex: 1,
    backgroundColor: "#141416",
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },

  comment: {
    marginBottom: 15,
  },

  commentUser: {
    color: "#ADF3FF",
    fontWeight: "bold",
  },

  commentText: {
    color: "#fff",
  },

  reply: {
    marginLeft: 15,
    marginTop: 5,
  },

  closeBtn: {
    marginTop: 20,
    backgroundColor: "#333",
    padding: 15, // Increased padding for easier tapping
    alignItems: "center",
    borderRadius: 10,
  },
});