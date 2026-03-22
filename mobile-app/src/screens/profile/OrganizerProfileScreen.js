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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// SetWemu Design System Constants
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  gold: '#FFD700',
};

const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { small: 8, medium: 12, large: 16, round: 24, circle: 999 };

const OrganizerProfileScreen = ({ navigation }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const organizer = {
    name: "Apex Events LK",
    handle: "@apex_events_official",
    avatar: "https://ui-avatars.com/api/?name=Apex+Events&background=4CC1D4&color=141416&size=128",
    bio: "Colombo's leading tech & music event organizers. Bringing you the best experiences since 2022.",
    location: "Colombo, Sri Lanka",
    rating: "4.8",
    followers: "2.4k",
    eventsHosted: "84",
  };

  const activeEvents = [
    { id: '1', title: 'Tech Pulse 2026', date: 'March 15', price: 'Rs. 2500' },
    { id: '2', title: 'Deep House Night', date: 'April 02', price: 'Rs. 5000' },
    { id: '3', title: 'Startup Grind', date: 'April 20', price: 'Free' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
          <Icon name="ellipsis-horizontal" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
          </View>
          
          <View style={styles.nameRow}>
            <Text style={styles.name}>{organizer.name}</Text>
            <Icon name="checkmark-circle" size={20} color={COLORS.blue.brand} style={{ marginLeft: 6 }} />
          </View>
          <Text style={styles.handle}>{organizer.handle}</Text>
          
          {/* Stats Bar */}
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Text style={styles.statNumber}>{organizer.rating}</Text>
                 <Icon name="star" size={14} color={COLORS.gold} style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.primaryButton, isFollowing && styles.secondaryButton]} 
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={[styles.primaryButtonText, isFollowing && styles.secondaryButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="chatbubble-ellipses-outline" size={22} color={COLORS.blue.light} />
            </TouchableOpacity>
          </View>

          <Text style={styles.bio}>{organizer.bio}</Text>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {activeEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.card}>
              <View style={styles.eventImagePlaceholder}>
                <Icon name="calendar" size={24} color={COLORS.blue.brand} />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>{event.date} • {organizer.location}</Text>
                <Text style={styles.eventPrice}>{event.price}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.md,
  },
  backButton: { 
    width: 44, 
    height: 44, 
    backgroundColor: COLORS.bg.elevated, 
    borderRadius: RADIUS.medium, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light
  },
  iconCircle: { padding: SPACING.sm },
  profileSection: { alignItems: 'center', paddingHorizontal: SPACING.xl, marginTop: SPACING.md },
  avatarContainer: {
    padding: 4,
    borderRadius: RADIUS.circle,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
    marginBottom: SPACING.lg,
  },
  avatar: { width: 92, height: 92, borderRadius: RADIUS.circle },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { color: COLORS.text.primary, fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  handle: { color: COLORS.text.secondary, fontSize: 14, marginTop: 4 },
  
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg.card,
    borderRadius: RADIUS.large,
    paddingVertical: SPACING.lg,
    marginTop: SPACING.xxl,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  stat: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border.light },
  statNumber: { color: COLORS.text.primary, fontSize: 18, fontWeight: '700' },
  statLabel: { color: COLORS.text.tertiary, fontSize: 12, marginTop: 2, fontWeight: '600' },
  
  actionRow: { flexDirection: 'row', marginTop: SPACING.xxl, gap: SPACING.md, width: '100%' },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.blue.brand,
    height: 54,
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.blue.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: { color: COLORS.text.inverse, fontSize: 16, fontWeight: '900' },
  
  secondaryButton: {
    backgroundColor: COLORS.bg.elevated,
    borderWidth: 1,
    borderColor: COLORS.blue.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  secondaryButtonText: { color: COLORS.blue.light, fontWeight: '700' },

  iconButton: {
    width: 54,
    height: 54,
    backgroundColor: COLORS.bg.elevated,
    borderRadius: RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  
  bio: { color: COLORS.text.secondary, textAlign: 'center', marginTop: SPACING.xxl, lineHeight: 22, fontSize: 14 },
  
  eventsSection: { marginTop: SPACING.xxxl, paddingHorizontal: SPACING.xl },
  sectionTitle: { color: COLORS.text.primary, fontSize: 18, fontWeight: '800', marginBottom: SPACING.xl },
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    padding: SPACING.md,
    borderRadius: RADIUS.large,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  eventImagePlaceholder: { 
    width: 64, 
    height: 64, 
    borderRadius: RADIUS.medium, 
    backgroundColor: COLORS.bg.elevated,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  eventInfo: { flex: 1, marginLeft: SPACING.lg },
  eventTitle: { color: COLORS.text.primary, fontSize: 16, fontWeight: '700' },
  eventDetails: { color: COLORS.text.secondary, fontSize: 13, marginTop: 2 },
  eventPrice: { color: COLORS.blue.brand, fontSize: 14, fontWeight: '700', marginTop: 4 },
});

export default OrganizerProfileScreen;