import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const reviews = [
  {
    id: "1",
    event: "Colombo Food Festival",
    rating: "★★★★★",
    comment: "Amazing atmosphere and great food!",
    date: "2 days ago",
  },
  {
    id: "2",
    event: "Tech Meetup 2026",
    rating: "★★★★☆",
    comment: "Very informative sessions.",
    date: "1 week ago",
  },
];

const ReviewsListScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.event}>{item.event}</Text>
      <Text style={styles.rating}>{item.rating}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ReviewsListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071B2E", padding: 15 },
  header: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#0E2A47",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  event: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  rating: { color: "#FFD700", marginVertical: 5 },
  comment: { color: "#ddd" },
  date: { color: "#888", fontSize: 12, marginTop: 8 },
});