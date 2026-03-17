import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Should not be faded now!

const contacts = [
  { id: '1', name: 'Amandi De Silva', role: 'Tech Enthusiast', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '2', name: 'Chamith Jayaweera', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', name: 'David Smith', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Kasun Perera', role: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '5', name: 'Nethmi Fernando', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Ruwan Silva', role: 'Event Organizer', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '7', name: 'Sarah Jones', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
].sort((a, b) => a.name.localeCompare(b.name));

const NewMessageScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.contactRow}
      activeOpacity={0.7}
      onPress={() => console.log(`Starting new chat with ${item.name}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Message</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.toText}>To:</Text>
        {/* Added Icon here to fix the "faded" import issue */}
        <TextInput
          style={styles.searchInput}
          placeholder="Type a name..."
          placeholderTextColor="#94a3b8"
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
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
  cancelText: { color: '#4CC1D4', fontSize: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  toText: { color: '#94a3b8', fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  listContainer: { paddingHorizontal: 20 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1E293B',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 15 },
  contactName: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

export default NewMessageScreen;