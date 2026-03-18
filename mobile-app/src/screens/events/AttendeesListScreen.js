import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// SetWemu Design System Constants
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { small: 8, medium: 12, large: 16, round: 24, circle: 999 };

// Dummy data
const initialAttendees = [
  { id: '1', name: 'Kasun Perera', role: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', name: 'Nethmi Fernando', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Ruwan Silva', role: 'Event Organizer', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '4', name: 'Amandi De Silva', role: 'Tech Enthusiast', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '5', name: 'Chamith Jayaweera', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '6', name: 'Sarah Jones', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '7', name: 'David Smith', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const AttendeesListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttendees = initialAttendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => console.log(`Navigating to ${item.name}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.messageBtn}
        onPress={() => console.log(`Start chat with ${item.name}`)}
      >
        <Icon name="chatbubble-ellipses-outline" size={20} color={COLORS.blue.brand} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendees ({initialAttendees.length})</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Search Bar - Updated to Design System */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color={COLORS.text.tertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search attendees..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={filteredAttendees}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No attendees found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.bg.primary 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: 60, 
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.bg.primary,
  },
  headerTitle: { 
    color: COLORS.text.primary, 
    fontSize: 20, 
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.round,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchIcon: { marginRight: SPACING.sm },
  searchInput: {
    flex: 1,
    color: COLORS.text.primary,
    fontSize: 14,
  },
  listContainer: { 
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    borderRadius: RADIUS.large,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: RADIUS.circle, 
    marginRight: SPACING.lg,
    backgroundColor: COLORS.bg.elevated, 
  },
  userInfo: { flex: 1 },
  userName: { 
    color: COLORS.text.primary, 
    fontSize: 16, 
    fontWeight: '700' 
  },
  userRole: { 
    color: COLORS.text.secondary, 
    fontSize: 14, 
    marginTop: 2 
  },
  messageBtn: {
    padding: SPACING.sm,
    backgroundColor: COLORS.blue.glow,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.blue.border,
  },
  emptyText: { 
    color: COLORS.text.tertiary, 
    textAlign: 'center', 
    marginTop: SPACING.xxxl, 
    fontSize: 16 
  },
});

export default AttendeesListScreen;