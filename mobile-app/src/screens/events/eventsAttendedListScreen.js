import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";

import COLORS from "../../constants/colors";

const dummyEvents = [
  { id: "1", title: "Colombo Music Festival", date: "Oct 12", location: "Colombo", image: "https://picsum.photos/400/300" },
  { id: "2", title: "Street Food Carnival", date: "Oct 18", location: "Kandy", image: "https://picsum.photos/401/300" },
  { id: "3", title: "Beach Party", date: "Nov 2", location: "Mount Lavinia", image: "https://picsum.photos/402/300" },
  { id: "4", title: "DJ Night", date: "Nov 10", location: "Colombo", image: "https://picsum.photos/403/300" },
  { id: "5", title: "Tech Meetup", date: "Nov 12", location: "Colombo", image: "https://picsum.photos/404/300" },
  { id: "6", title: "Startup Expo", date: "Nov 15", location: "Colombo", image: "https://picsum.photos/405/300" }
];


export default function EventsAttendedListScreen() {

  const [events, setEvents] = useState(dummyEvents);

  const renderEvent = ({ item }) => (

    <View style={styles.card}>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={styles.metaText}>{item.date}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={styles.metaText}>{item.location}</Text>
        </View>

        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.reviewText}>Write Review</Text>
        </TouchableOpacity>

      </View>

    </View>

  );

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background.secondary}
      />

      <Text style={styles.header}>🎉 Events Attended</Text>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 60 }}
      >

        {events.map((item) => (
          <View key={item.id} style={styles.card}>

            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardContent}>

              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaIcon}>📅</Text>
                <Text style={styles.metaText}>{item.date}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaIcon}>📍</Text>
                <Text style={styles.metaText}>{item.location}</Text>
              </View>

              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewText}>Write Review</Text>
              </TouchableOpacity>

            </View>

          </View>
        ))}

      </ScrollView>


    </View>
  );


}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: 16
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 15,
    marginTop: 40
  },

  card: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: 180
  },

  cardContent: {
    padding: 15
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 8
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },

  metaIcon: {
    marginRight: 6
  },

  metaText: {
    color: COLORS.text.secondary,
    fontSize: 14
  },

  reviewButton: {
    marginTop: 12,
    backgroundColor: COLORS.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  reviewText: {
    color: COLORS.button.primary.text,
    fontWeight: "600",
    fontSize: 14
  }

});
