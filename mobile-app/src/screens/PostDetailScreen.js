import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft, Heart, UserPlus, MapPin } from "phosphor-react-native";

export default function PostDetailsScreen({ route, navigation }) {
  const image = route?.params?.image;
  const [caption, setCaption] = useState("");
  const [liked, setLiked] = useState(false);
  const [taggedPeople, setTaggedPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!image) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>No image</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <ArrowLeft size={22} color="#F2F2F7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Post</Text>

        <TouchableOpacity onPress={() => caption && alert('Post shared!')}>
          <Text style={styles.share}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>

        {/* IMAGE */}
        <Image source={{ uri: image.path }} style={styles.image} />

        {/* CAPTION */}
        <View style={styles.captionRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />

          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor="#6B6B6B"
            value={caption}
            onChangeText={setCaption}
            style={styles.input}
            multiline
          />
        </View>

        {/* OPTIONS */}
        <TouchableOpacity style={styles.option} onPress={() => alert('Tag People - Coming Soon')}>
          <View style={styles.left}>
            <UserPlus size={20} color="#8DDFF5" />
            <Text style={styles.optionText}>Tag People {taggedPeople.length > 0 && `(${taggedPeople.length})`}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => alert('Add Location - Coming Soon')}>
          <View style={styles.left}>
            <MapPin size={20} color="#8DDFF5" />
            <Text style={styles.optionText}>{selectedLocation ? selectedLocation : 'Add Location'}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 25,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  share: {
    color: "#8DDFF5",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 320,
  },

  captionRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#222",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: "#fff",
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#222",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  optionText: {
    color: "#fff",
  },

  arrow: {
    color: "#666",
  },
});