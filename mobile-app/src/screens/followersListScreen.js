import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialFollowers = [
  { id: "1", name: "Sarah Silva", username: "@sarah", profilePic: "https://randomuser.me/api/portraits/women/1.jpg", isFollowing: false },
  { id: "2", name: "TravelWithMe", username: "@travel", profilePic: "https://randomuser.me/api/portraits/men/2.jpg", isFollowing: true },
  { id: "3", name: "John Doe", username: "@johndoe", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", isFollowing: false },
  { id: "4", name: "Jane Smith", username: "@janesmith", profilePic: "https://randomuser.me/api/portraits/women/4.jpg", isFollowing: true },
  { id: "5", name: "Mike Johnson", username: "@mikej", profilePic: "https://randomuser.me/api/portraits/men/5.jpg", isFollowing: false },
];

const FollowersListScreen = () => {

  const [followers, setFollowers] = useState(initialFollowers);

  const handleFollowToggle = (user) => {

    if (user.isFollowing) {

      Alert.alert(
        "Unfollow User",
        `Do you want to unfollow ${user.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Unfollow",
            style: "destructive",
            onPress: () => {
              setFollowers(prev =>
                prev.map(item =>
                  item.id === user.id
                    ? { ...item, isFollowing: false }
                    : item
                )
              );
            }
          }
        ]
      );

    } else {

      setFollowers(prev =>
        prev.map(item =>
          item.id === user.id
            ? { ...item, isFollowing: true }
            : item
        )
      );

    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>

      <Image source={{ uri: item.profilePic }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, item.isFollowing && styles.followingButton]}
        onPress={() => handleFollowToggle(item)}
      >
        <Text
          style={[
            styles.buttonText,
            item.isFollowing && styles.followingButtonText
          ]}
        >
          {item.isFollowing ? "Following" : "Follow Back"}
        </Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Followers</Text>

      <FlatList
        data={followers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

export default FollowersListScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#071B2E",
    padding: 15
  },

  header: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E2A47",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#1C3A57",
    marginRight: 12
  },

  name: {
    color: "#fff",
    fontWeight: "bold"
  },

  username: {
    color: "#aaa",
    fontSize: 12
  },

  button: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  buttonText: {
    color: "#fff",
    fontSize: 12
  },

  followingButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1DA1F2"
  },

  followingButtonText: {
    color: "#1DA1F2"
  }

});
