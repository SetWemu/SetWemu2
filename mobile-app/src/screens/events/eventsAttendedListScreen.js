import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const events = [
  {
    id: "1",
    title: "Colombo Music Night",
    date: "12 Feb 2026",
    location: "Colombo",
  },
  {
    id: "2",
    title: "Startup Networking Expo",
    date: "28 Jan 2026",
    location: "BMICH",
  },
];

const EventsAttendedListScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.thumbnail} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.date}</Text>
        <Text style={styles.meta}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Events Attended</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default EventsAttendedListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071B2E", padding: 15 },
  header: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 15 },
  card: {
    flexDirection: "row",
    backgroundColor: "#0E2A47",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#1C3A57",
    marginRight: 12,
  },
  title: { color: "#fff", fontWeight: "bold", marginBottom: 4 },
  meta: { color: "#aaa", fontSize: 12 },
});