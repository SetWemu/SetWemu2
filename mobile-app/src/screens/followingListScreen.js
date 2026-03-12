import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialFollowing = [
  { id: "1", name: "John Perera", username: "@johnp", isFollowing: true },
  { id: "2", name: "EventHub LK", username: "@eventhub", isFollowing: true },
];

const FollowingListScreen = () => {
  const [users, setUsers] = useState(initialFollowing);

  const toggleFollow = (item) => {
    if (item.isFollowing) {
      Alert.alert(
        "Unfollow",
        `Do you want to unfollow ${item.username}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Unfollow",
            style: "destructive",
            onPress: () => updateFollowState(item.id, false),
          },
        ]
      );
    } else {
      updateFollowState(item.id, true);
    }
  };

  const updateFollowState = (id, isFollowing) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowing } : user
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, !item.isFollowing && styles.buttonFollow]}
        onPress={() => toggleFollow(item)}
      >
        <Text style={styles.buttonText}>{item.isFollowing ? "Following" : "Follow"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Following</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default FollowingListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071B2E", padding: 15 },
  header: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 15 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E2A47",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#1C3A57",
    marginRight: 12,
  },
  name: { color: "#fff", fontWeight: "bold" },
  username: { color: "#aaa", fontSize: 12 },
  button: {
    backgroundColor: "#1C3A57",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonFollow: {
    backgroundColor: "#1DA1F2",
  },
  buttonText: { color: "#fff", fontSize: 12 },
});