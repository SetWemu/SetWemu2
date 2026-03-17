import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Platform, 
  StatusBar,
  Image 
} from 'react-native';

const mockChats = [
  { id: '1', name: 'Sarah Wilson', message: 'Hey! Are you going to the tech meetup?', time: '10:30 AM', unread: 2, type: 'friend', image: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '2', name: 'Event Organizers', message: 'Your ticket has been confirmed! 🎉', time: 'Yesterday', unread: 0, type: 'host', image: 'https://i.pravatar.cc/150?u=events' },
  { id: '3', name: 'David Chen', message: 'Can you send me the location?', time: 'Yesterday', unread: 0, type: 'friend', image: 'https://i.pravatar.cc/150?u=david' },
  { id: '4', name: 'Design Team', message: 'See you at the workshop tomorrow.', time: 'Tue', unread: 5, type: 'host', image: 'https://i.pravatar.cc/150?u=design' },
];

const ChatListScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat => {
    const matchesTab = 
      activeFilter === 'Friends' ? chat.type === 'friend' :
      activeFilter === 'Hosts' ? chat.type === 'host' : 
      true;

    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const toggleFilter = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null); 
    } else {
      setActiveFilter(filterName); 
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatConversation', { 
        name: item.name, 
        image: item.image // Passing the image to the next screen
      })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />      
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Messages</Text>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search conversations..." 
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeFilter === 'Friends' && styles.activeToggle]}
          onPress={() => toggleFilter('Friends')}
        >
          <Text style={[styles.toggleText, activeFilter === 'Friends' && styles.activeToggleText]}>Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, activeFilter === 'Hosts' && styles.activeToggle]}
          onPress={() => toggleFilter('Hosts')}
        >
          <Text style={[styles.toggleText, activeFilter === 'Hosts' && styles.activeToggleText]}>Hosts</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0B1221',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    marginTop: 20, 
    marginBottom: 15 
  },
  searchContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2536',
    borderRadius: 10,
    paddingRight: 10,
  },
  searchInput: { 
    flex: 1,
    color: 'white', 
    padding: 12, 
    fontSize: 16 
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    marginBottom: 15, 
    gap: 10 
  },
  toggleButton: { 
    flex: 1, 
    paddingVertical: 10, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: '#1E2536' 
  },
  activeToggle: { 
    backgroundColor: '#2D8CFF' 
  },
  toggleText: { 
    color: '#888', 
    fontWeight: '600', 
    fontSize: 15 
  },
  activeToggleText: { 
    color: 'white' 
  },
  listContainer: { 
    paddingHorizontal: 20 
  },
  chatItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#1E2536' 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#1E2536', 
    marginRight: 15 
  },
  chatDetails: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  chatName: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 4 
  },
  chatMessage: { 
    color: '#888', 
    fontSize: 14 
  },
  chatMeta: { 
    alignItems: 'flex-end', 
    justifyContent: 'center' 
  },
  chatTime: { 
    color: '#2D8CFF', 
    fontSize: 11, 
    fontWeight: '700', 
    marginBottom: 6,
    textTransform: 'uppercase'
  },
  badge: { 
    backgroundColor: '#FF453A', 
    borderRadius: 12, 
    minWidth: 20, 
    height: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 4 
  },
  badgeText: { 
    color: 'white', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
});

export default ChatListScreen;