import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const OrganizerProfileScreen = ({ navigation }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock Organizer Data
  const organizer = {
    name: "Apex Events LK",
    handle: "@apex_events_official",
    avatar: "https://ui-avatars.com/api/?name=Apex+Events&background=ef4444&color=fff&size=128",
    bio: "Colombo's leading tech & music event organizers. Bringing you the best experiences since 2022.",
    location: "Colombo, Sri Lanka",
    rating: "4.8",
    followers: "2.4k",
    eventsHosted: "84",
  };

  // Mock Events by this organizer
  const activeEvents = [
    { id: '1', title: 'Tech Pulse 2026', date: 'March 15', price: 'Rs. 2500', image: '#334155' },
    { id: '2', title: 'Deep House Night', date: 'April 02', price: 'Rs. 5000', image: '#1e293b' },
    { id: '3', title: 'Startup Grind', date: 'April 20', price: 'Free', image: '#475569' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{organizer.name}</Text>
            <Icon name="checkmark-circle" size={20} color="#38bdf8" style={{ marginLeft: 5 }} />
          </View>
          <Text style={styles.handle}>{organizer.handle}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{organizer.eventsHosted}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={[styles.stat, styles.statBorder]}>
              <Text style={styles.statNumber}>{organizer.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{organizer.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]} 
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={styles.followButtonText}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Icon name="chatbubble-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.bio}>{organizer.bio}</Text>
        </View>

        {/* Active Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {activeEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={[styles.eventImage, { backgroundColor: event.image }]}>
                <Icon name="calendar-outline" size={30} color="#94a3b8" />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>{event.date} • {organizer.location}</Text>
                <Text style={styles.eventPrice}>{event.price}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#334155" />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: { padding: 8, backgroundColor: '#1e293b', borderRadius: 12 },
  moreButton: { padding: 8 },
  profileSection: { alignItems: 'center', paddingHorizontal: 30, marginTop: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  handle: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 25,
    width: '100%',
  },
  stat: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#334155' },
  statNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#64748b', fontSize: 12, marginTop: 2 },
  actionRow: { flexDirection: 'row', marginTop: 25, gap: 10 },
  followButton: {
    flex: 1,
    backgroundColor: '#38bdf8',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followingButton: { backgroundColor: '#334155' },
  followButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  messageButton: {
    width: 50,
    height: 50,
    backgroundColor: '#1e293b',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bio: { color: '#94a3b8', textAlign: 'center', marginTop: 20, lineHeight: 22 },
  eventsSection: { marginTop: 40, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  eventImage: { width: 70, height: 70, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  eventInfo: { flex: 1, marginLeft: 15 },
  eventTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  eventDetails: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  eventPrice: { color: '#38bdf8', fontSize: 14, fontWeight: '600', marginTop: 4 },
});

export default OrganizerProfileScreen;