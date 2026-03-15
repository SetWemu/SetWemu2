import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialFollowing = [
  {
    id: "1",
    name: "John Perera",
    username: "@johnp",
    profilePic: "https://i.pravatar.cc/150?img=12",
    isFollowing: true
  },
  {
    id: "2",
    name: "EventHub LK",
    username: "@eventhub",
    profilePic: "https://i.pravatar.cc/150?img=13",
    isFollowing: true
  },
];

const FollowingListScreen = () => {

  const [users, setUsers] = useState(initialFollowing);

  const toggleFollow = (user) => {

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
              setUsers(prev =>
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

      setUsers(prev =>
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
        style={[styles.button, !item.isFollowing && styles.buttonFollow]}
        onPress={() => toggleFollow(item)}
      >

        <Text style={styles.buttonText}>
          {item.isFollowing ? "Following" : "Follow"}
        </Text>

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
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>

  );

};

export default FollowingListScreen;

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
    backgroundColor: "#1C3A57",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  buttonFollow: {
    backgroundColor: "#1DA1F2"
  },

  buttonText: {
    color: "#fff",
    fontSize: 12
  }

});
