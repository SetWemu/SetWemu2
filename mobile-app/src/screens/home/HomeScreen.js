import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stories = [
  { id: "0", name: "Your Story", avatar: "https://i.pravatar.cc/100?img=10", isAdd: true },
  { id: "1", name: "j_kovrikov", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "2", name: "leavinhq", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: "3", name: "ladyinblack", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: "4", name: "beardman", avatar: "https://i.pravatar.cc/100?img=4" },
];

const posts = [
  {
    id: "1",
    user: "Bing Chin",
    time: "2hrs ago",
    caption: "Amazing artisan cheeses at the food market!",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    event: "Artisan Food Market",
    date: "Oct 22, 2025",
    location: "Colombo Market Square",
    likes: 174,
    comments: 14,
    send:5,
  },
  {
    id: "2",
    user: "Nina Grey",
    time: "5hrs ago",
    caption: "Live music tonight was insane 🎸",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    event: "City Music Fest",
    date: "Oct 25, 2025",
    location: "Colombo Arena",
    likes: 220,
    comments: 32,
    send:8,
  },
  {
    id: "3",
    user: "Adam Lee",
    time: "1day ago",
    caption: "Best street food experience ever 🔥",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    event: "Street Food Carnival",
    date: "Oct 27, 2025",
    location: "Galle Face",
    likes: 301,
    comments: 48,
    send:2,
  },
];

const HomeScreen = () => {

  const renderStory = ({ item }) => (
    <View style={styles.storyItem}>
      <View>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />

        {item.isAdd && (
          <View style={styles.addStoryIcon}>
            <Text style={styles.plusText}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.caption}>{item.caption}</Text>

      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.event}</Text>
        <Text style={styles.eventMeta}>
          {item.date} • {item.location}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity>
          <View style={styles.actionContainer}>
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=64767&format=png&color=ffffff' }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionCount}>{item.likes}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.actionContainer}>
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=61876&format=png&color=ffffff' }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionCount}>{item.comments}</Text>
          </View>
        </TouchableOpacity>

        {/* SEND BUTTON */}
        <TouchableOpacity>
          <View style={styles.actionContainer}>
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=100004&format=png&color=ffffff' }}
              style={styles.actionIcon}
            />
            <Text style={styles.actionCount}>{item.send}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Home Feed</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <FlatList
            data={stories}
            renderItem={renderStory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.stories}
          />
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={{ uri: 'https://img.icons8.com/?size=100&id=86527&format=png&color=ffffff' }}
            style={styles.navIconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={{ uri: 'https://img.icons8.com/?size=100&id=87981&format=png&color=ffffff' }}
            style={styles.navIconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={{ uri: 'https://img.icons8.com/?size=100&id=9fYfwBJNoMpV&format=png&color=ffffff' }}
            style={styles.navIconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={{ uri: 'https://img.icons8.com/?size=100&id=Hh5ONdvsAI4P&format=png&color=ffffff' }}
            style={styles.navIconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={{ uri: 'https://img.icons8.com/?size=100&id=77883&format=png&color=ffffff' }}
            style={styles.navIconImage}
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071B2E" },

  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  headerTitle: { color: "white", fontSize: 20, fontWeight: "600" },

  headerIcons: { flexDirection: "row" },

  icon: { color: "white", fontSize: 20, marginLeft: 15 },

  stories: { paddingHorizontal: 10, paddingVertical: 10 },

  storyItem: { alignItems: "center", marginRight: 15 },

  storyAvatar: { width: 65, height: 65, borderRadius: 32 },

  addStoryIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#2E90FA",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: { color: "white", fontSize: 14, fontWeight: "bold" },

  storyName: { color: "white", fontSize: 12, marginTop: 5 },

  card: {
    backgroundColor: "#0E2A47",
    margin: 10,
    borderRadius: 15,
    padding: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  user: { color: "white", fontWeight: "600" },

  time: { color: "#aaa", fontSize: 12 },

  caption: { color: "white", marginVertical: 10 },

  postImage: { width: "100%", height: 200, borderRadius: 10 },

  eventInfo: { marginTop: 8 },

  eventTitle: { color: "white", fontWeight: "600" },

  eventMeta: { color: "#ccc", fontSize: 12 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  actionText: { color: "white" },

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  actionIcon: {
    width: 24,
    height: 24,
  },

  actionCount: {
    color: "white",
    fontSize: 12,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#051423",
  },

  navItem: {
    alignItems: "center",
  },

  navIconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },

  navIcon: { color: "white", fontSize: 12 },
});