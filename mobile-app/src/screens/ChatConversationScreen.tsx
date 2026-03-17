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

const initialMessages = [
  { id: '1', text: 'Hey! Are you going to the tech meetup?', sender: 'them', time: '10:30 AM' },
  { id: '2', text: 'Yes! I just got my ticket.', sender: 'me', time: '10:32 AM' },
  { id: '3', text: 'Awesome, do you want to grab coffee before?', sender: 'them', time: '10:33 AM' },
];

const ChatConversationScreen = ({ navigation, route }: any) => {
  // We extract exactly what ChatListScreen sends: { name, image }
  const { name, image } = route.params || { name: 'User', image: 'https://i.pravatar.cc/150' };
  
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

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowThem]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Image source={{ uri: image }} style={styles.headerAvatar} />
            <View>
              <Text style={styles.headerTitle}>{name}</Text>
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#888"
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
    backgroundColor: '#0B1221', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2536',
    backgroundColor: '#0B1221',
  },
  backButton: {
    paddingRight: 15,
  },
  backText: {
    color: '#2D8CFF',
    fontSize: 40,
    fontWeight: '300',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#4CD964',
    fontSize: 12,
  },
  menuButton: {
    padding: 5,
  },
  menuText: {
    color: 'white',
    fontSize: 24,
  },
  chatList: {
    padding: 20,
  },
  messageRow: {
    marginBottom: 15,
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
    borderRadius: 15,
  },
  bubbleMe: {
    backgroundColor: '#2D8CFF',
  },
  bubbleThem: {
    backgroundColor: '#1E2536',
  },
  messageText: {
    color: 'white',
    fontSize: 15,
  },
  timeText: {
    color: '#888',
    fontSize: 10,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#1E2536',
    backgroundColor: '#0B1221',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1E2536',
    color: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#2D8CFF',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatConversationScreen;