import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  Image
} from 'react-native';

// SetWemu Design System Constants
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { lightest: '#D6F9FF', light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
};

const initialMessages = [
  { id: '1', text: 'Hey! Are you going to the tech meetup?', sender: 'them', time: '10:30 AM' },
  { id: '2', text: 'Yes! I just got my ticket.', sender: 'me', time: '10:32 AM' },
  { id: '3', text: 'Awesome, do you want to grab coffee before?', sender: 'them', time: '10:33 AM' },
];

const ChatConversationScreen = ({ navigation, route }) => {
  // FIXED: Using userName and userImage to match ChatListScreen params
  const { userName, userImage } = route.params || { 
    userName: 'User', 
    userImage: 'https://via.placeholder.com/150' 
  };
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'me',
        time: 'Now', 
      };
      setMessages([...messages, newMessage]);
      setInputText(''); 
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowThem]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
          <Text style={[styles.messageText, isMe && { color: COLORS.text.inverse }]}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            {/* FIXED: Using dynamic userImage */}
            <Image source={{ uri: userImage }} style={styles.headerAvatar} />
            <View>
              {/* FIXED: Using dynamic userName */}
              <Text style={styles.headerTitle}>{userName}</Text>
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => navigation.navigate('ChatSettings', { userName, userImage })}
          >
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
        />

        {/* INPUT SECTION */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.text.tertiary}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    // Add margin for Android status bar if not handled by NavigationContainer
    paddingTop: Platform.OS === 'android' ? 10 : 0, 
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
    backgroundColor: COLORS.bg.card,
    // Ensure header doesn't overlap status bar on modern Android
    marginTop: Platform.OS === 'android' ? 25 : 0,
  },
  backButton: {
    paddingRight: 16,
  },
  backText: {
    color: COLORS.blue.light,
    fontSize: 32,
    fontWeight: '300',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: COLORS.bg.elevated, // Fallback color
  },
  headerTitle: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  statusText: {
    color: COLORS.success,
    fontSize: 11,
  },
  menuButton: {
    padding: 5,
  },
  menuText: {
    color: COLORS.text.secondary,
    fontSize: 22,
  },
  chatList: {
    padding: 16,
  },
  messageRow: {
    marginBottom: 16,
  },
  messageRowMe: {
    alignItems: 'flex-end', 
  },
  messageRowThem: {
    alignItems: 'flex-start', 
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleMe: {
    backgroundColor: COLORS.blue.brand, 
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: COLORS.bg.elevated, 
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  messageText: {
    color: COLORS.text.primary,
    fontSize: 14,
    lineHeight: 20,
  },
  timeText: {
    color: COLORS.text.tertiary,
    fontSize: 10,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.bg.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    color: COLORS.text.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  sendButton: {
    marginLeft: 12,
    justifyContent: 'center',
    backgroundColor: COLORS.blue.brand,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: COLORS.text.inverse,
    fontWeight: '900',
    fontSize: 14,
  },
});

export default ChatConversationScreen;