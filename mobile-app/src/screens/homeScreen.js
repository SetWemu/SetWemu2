import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const stories = [
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
    caption:
      "Found the most amazing artisan cheeses at the food market today! Can't wait to go back 🧀",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    event: "Artisan Food Market",
    date: "Oct 22, 2025",
    location: "Colombo Market Square",
    likes: 174,
    comments: 14,
    shares: 8,
  },
];

const HomeScreen = () => {
  const renderStory = ({ item }) => (
    <View style={styles.storyItem}>
      <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
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
        <Text style={styles.actionText}>❤️ {item.likes}</Text>
        <Text style={styles.actionText}>💬 {item.comments}</Text>
        <Text style={styles.actionText}>✈️ {item.shares}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Home Feed</Text>

      <FlatList
        ListHeaderComponent={
          <View>
            <FlatList
              data={stories}
              renderItem={renderStory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.stories}
            />
          </View>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.bottomNav}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navIcon}>🧭</Text>
        <Text style={styles.navIcon}>➕</Text>
        <Text style={styles.navIcon}>📍</Text>
        <Text style={styles.navIcon}>👤</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071B2E",
  },
  header: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "600",
  },
  stories: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 15,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
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
  user: {
    color: "white",
    fontWeight: "600",
  },
  time: {
    color: "#aaa",
    fontSize: 12,
  },
  caption: {
    color: "white",
    marginVertical: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  eventInfo: {
    marginTop: 8,
  },
  eventTitle: {
    color: "white",
    fontWeight: "600",
  },
  eventMeta: {
    color: "#ccc",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionText: {
    color: "white",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#051423",
  },
  navIcon: {
    color: "white",
    fontSize: 18,
  },
});
