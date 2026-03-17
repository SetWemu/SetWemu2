import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const AttendeesListScreen = ({ navigation }: any) => {
  // State to track what the user types in the search bar
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the list based on the search query (checks both name and role)
  const filteredAttendees = initialAttendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    // PART 3 CHANGE: The outer View is now a TouchableOpacity so you can tap the whole row!
    <TouchableOpacity 
      style={styles.userRow}
      activeOpacity={0.7}
      onPress={() => console.log(`Maps to ${item.name}'s Profile`)} 
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      
      {/* The separate tap target just for the chat button */}
      <TouchableOpacity 
        style={styles.messageBtn}
        onPress={() => console.log(`Start chat with ${item.name}`)}
      >
        <Icon name="chatbubble-ellipses-outline" size={20} color="#4CC1D4" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendees ({initialAttendees.length})</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* New Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search attendees..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery} // Updates the state every time you type
        />
        {/* Little X button to clear the search if typing */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* The Scrollable List (Now uses filteredAttendees!) */}
      <FlatList
        data={filteredAttendees}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        // Shows this text if no one matches the search
        ListEmptyComponent={
          <Text style={styles.emptyText}>No attendees found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50, 
    paddingBottom: 20,
    backgroundColor: '#1E293B',
  },
  backButton: { padding: 5 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  
  // New Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 30,      
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 40, fontSize: 16 },

  listContainer: { padding: 20 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,          
    marginBottom: 12,             
    borderBottomWidth: 1,         
    borderBottomColor: '#1E293B', 
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  userRole: { color: '#94a3b8', fontSize: 14, marginTop: 2 },
  messageBtn: {
    padding: 10,
    backgroundColor: 'rgba(76, 193, 212, 0.1)',
    borderRadius: 20,
  },
});

export default AttendeesListScreen;