import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  primary: '#53C1DE',
  bg: '#141416',
  card: '#1D1D21',
  text: '#FFFFFF',
  textSecondary: '#9FA2AB',
};

// --- THIS IS THE MISSING DATA ---
const chats = [
  {
    id: '1',
    name: 'Sarah Wilson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Hey! Are you going to the tech m...',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Event Organizers',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Your ticket has been confirmed! ...',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'David Chen',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    lastMessage: 'Can you send me the location?',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '4',
    name: 'Design Team',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastMessage: 'See you at the workshop tomorrow.',
    time: 'Tue',
    unread: 5,
  },
];

const ChatListScreen = ({ navigation }) => {
  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatCard}
      onPress={() => navigation.navigate('ChatConversation', { 
        userName: item.name, 
        userImage: item.image 
      })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Messages</Text>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search conversations..." 
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <FlatList
        data={chats} // Now 'chats' exists!
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* The Plus Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('NewMessage')}
      >
        <Icon name="plus" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

// ... keep the styles from the previous message ...

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 16, paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  searchContainer: { backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 15, marginBottom: 20 },
  searchInput: { height: 50, color: COLORS.text },
  chatCard: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 16, padding: 15, marginBottom: 12 },
  avatar: { width: 55, height: 55, borderRadius: 27.5 },
  chatInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  userName: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  chatTime: { fontSize: 12, color: COLORS.textSecondary },
  messageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastMessage: { fontSize: 14, color: COLORS.textSecondary, flex: 1, marginRight: 10 },
  unreadBadge: { backgroundColor: COLORS.primary, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  
  // Floating Action Button Styles
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});

export default ChatListScreen;