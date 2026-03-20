import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import {
  ArrowLeft, ChatCircle, CheckCircle, Star, MapPin,
  GridFour, CalendarBlank, DotsThreeVertical,
} from 'phosphor-react-native';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 20;
const GAP = 8;
const COLUMN_WIDTH = (width - (SCREEN_PADDING * 2) - (GAP * 2)) / 3;

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', border: 'rgba(173,243,255,0.15)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)' },
  gold: '#FFD700',
};

const PublicProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params || {};
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('events');

  // Mock user data - replace with real data from userId
  const userData = {
    name: "Apex Events LK",
    handle: "@apex_events_official",
    avatar: "https://ui-avatars.com/api/?name=Apex+Events&background=4CC1D4&color=141416&size=200",
    bio: "Colombo's leading tech & music event organizers. Bringing you the best experiences since 2022.",
    location: "Colombo, Sri Lanka",
    isVerified: true,
    stats: { 
      events: 84, 
      followers: 2400, 
      rating: 4.8 
    }
  };

  const events = [
    { id: '1', image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=400&h=400&fit=crop', title: 'Tech Pulse 2026', date: 'Mar 15', price: 'LKR 2,500' },
    { id: '2', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop', title: 'Deep House Night', date: 'Apr 02', price: 'LKR 5,000' },
    { id: '3', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', title: 'Startup Grind', date: 'Apr 20', price: 'Free' },
    { id: '4', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop', title: 'Music Fest', date: 'May 05', price: 'LKR 3,500' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreBtn}>
          <DotsThreeVertical size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.name}>{userData.name}</Text>
            {userData.isVerified && (
              <CheckCircle size={20} color={COLORS.blue.brand} weight="fill" style={{ marginLeft: 6 }} />
            )}
          </View>
          <Text style={styles.handle}>{userData.handle}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userData.stats.events}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={[styles.statBox, styles.statDivider]}>
              <Text style={styles.statNumber}>{userData.stats.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={styles.statNumber}>{userData.stats.rating}</Text>
                <Star size={16} color={COLORS.gold} weight="fill" />
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.followBtn, isFollowing && styles.followingBtn]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.messageBtn}
              onPress={() => navigation.navigate('ChatConversation', { 
                chat: { name: userData.name, avatar: userData.avatar }
              })}
            >
              <ChatCircle size={22} color={COLORS.blue.light} weight="bold" />
            </TouchableOpacity>
          </View>

          {/* Bio */}
          {userData.bio && (
            <Text style={styles.bio}>{userData.bio}</Text>
          )}

          {/* Location */}
          {userData.location && (
            <View style={styles.locationRow}>
              <MapPin size={14} color={COLORS.text.tertiary} weight="fill" />
              <Text style={styles.locationText}>{userData.location}</Text>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {[
            { icon: CalendarBlank, name: 'events', label: 'Events' },
            { icon: GridFour, name: 'posts', label: 'Posts' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => setActiveTab(tab.name)}
            >
              <tab.icon
                size={20}
                color={activeTab === tab.name ? COLORS.blue.brand : COLORS.text.tertiary}
                weight={activeTab === tab.name ? 'fill' : 'regular'}
              />
              <Text style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {activeTab === 'events' ? (
            <View style={styles.eventsGrid}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <Image source={{ uri: event.image }} style={styles.eventImage} />
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventPrice}>{event.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.grid}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <Image source={{ uri: event.image }} style={styles.gridImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  moreBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  profileSection: { alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  avatarContainer: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
    marginBottom: 16,
  },
  avatar: { width: 92, height: 92, borderRadius: 999 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: '900', color: COLORS.text.primary, letterSpacing: -0.5 },
  handle: { fontSize: 14, color: COLORS.text.secondary, marginTop: 4, marginBottom: 20 },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border.subtle },
  statNumber: { fontSize: 18, fontWeight: '800', color: COLORS.text.primary, marginBottom: 4 },
  statLabel: { fontSize: 11, color: COLORS.text.tertiary, fontWeight: '600' },
  actionRow: { flexDirection: 'row', marginTop: 24, gap: 12, width: '100%' },
  followBtn: {
    flex: 1,
    backgroundColor: COLORS.blue.brand,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followBtnText: { fontSize: 15, fontWeight: '900', color: COLORS.text.inverse },
  followingBtn: {
    backgroundColor: COLORS.bg.elevated,
    borderWidth: 1,
    borderColor: COLORS.blue.border,
  },
  followingBtnText: { color: COLORS.blue.light, fontWeight: '700' },
  messageBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.bg.elevated,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  bio: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  locationText: { fontSize: 13, color: COLORS.text.tertiary, fontWeight: '600' },
  tabBar: { flexDirection: 'row', marginTop: 24, paddingHorizontal: 20, gap: 12 },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  activeTab: {
    backgroundColor: COLORS.blue.brand + '20',
    borderColor: COLORS.blue.brand,
  },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.text.tertiary },
  activeTabText: { color: COLORS.blue.brand },
  contentSection: { paddingHorizontal: 20, marginTop: 20 },
  eventsGrid: { gap: 12 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  eventImage: { width: 100, height: 100 },
  eventInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  eventTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text.primary, marginBottom: 4 },
  eventDate: { fontSize: 12, color: COLORS.text.tertiary, marginBottom: 6 },
  eventPrice: { fontSize: 14, fontWeight: '800', color: COLORS.blue.brand },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  gridImage: { width: COLUMN_WIDTH, height: COLUMN_WIDTH, borderRadius: 10, backgroundColor: COLORS.bg.card },
});

export default PublicProfileScreen;