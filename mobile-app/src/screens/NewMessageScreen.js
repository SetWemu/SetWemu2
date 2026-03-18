import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Platform, 
  StatusBar 
} from 'react-native';

// SetWemu Design System Constants
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { lightest: '#D6F9FF', light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const contacts = [
  { id: '1', name: 'Amandi De Silva', role: 'Tech Enthusiast', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '2', name: 'Chamith Jayaweera', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', name: 'David Smith', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Kasun Perera', role: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '5', name: 'Nethmi Fernando', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Ruwan Silva', role: 'Event Organizer', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '7', name: 'Sarah Jones', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
].sort((a, b) => a.name.localeCompare(b.name));

const NewMessageScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactCard}
      activeOpacity={0.7}
      onPress={() => console.log(`Starting new chat with ${item.name}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Area */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backTouch}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Message</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Search Input using Design Guide Input Style */}
      <View style={styles.searchSection}>
        <View style={styles.inputWrapper}>
          <Text style={styles.toLabel}>To:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type a name..."
            placeholderTextColor={COLORS.text.tertiary}
            autoFocus={true}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: COLORS.bg.primary,
  },
  backTouch: {
    paddingVertical: 8,
  },
  cancelText: { 
    color: COLORS.blue.brand, 
    fontSize: 16,
    fontWeight: '600'
  },
  headerTitle: { 
    color: COLORS.text.primary, 
    fontSize: 18, 
    fontWeight: '900',
    letterSpacing: -0.5
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  toLabel: { 
    color: COLORS.text.tertiary, 
    fontSize: 14, 
    fontWeight: '700',
    marginRight: 8 
  },
  input: { 
    flex: 1, 
    color: COLORS.text.primary, 
    paddingVertical: 14,
    fontSize: 14 
  },
  listContainer: { 
    paddingHorizontal: 20,
    paddingBottom: 20 
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  avatar: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.blue.border 
  },
  contactName: { 
    color: COLORS.text.primary, 
    fontSize: 15, 
    fontWeight: '700' 
  },
  contactRole: { 
    color: COLORS.text.secondary, 
    fontSize: 12,
    marginTop: 2 
  },
});

export default NewMessageScreen;