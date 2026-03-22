import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  DotsThreeVertical,
  PaperPlaneTilt,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)' },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const ChatConversationScreen = ({ navigation, route }) => {
  const { chat } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey! Are you going to the tech summit?',
      sender: 'them',
      time: '10:30 AM',
    },
    {
      id: '2',
      text: 'Yes! I already bought tickets',
      sender: 'me',
      time: '10:32 AM',
    },
    {
      id: '3',
      text: 'Awesome! See you there 🎉',
      sender: 'them',
      time: '10:33 AM',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message,
          sender: 'me',
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' && styles.myMessageContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          item.sender === 'me' ? styles.myBubble : styles.theirBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === 'me' && styles.myMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[styles.timeText, item.sender === 'me' && styles.myTimeText]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
            </TouchableOpacity>
            <Image
              source={{
                uri: chat?.avatar || 'https://i.pravatar.cc/150?img=1',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{chat?.name || 'Chat'}</Text>
          </View>
          <TouchableOpacity
            style={styles.moreBtn}
            onPress={() => navigation.navigate('ChatSettings', { chat })}
          >
            <DotsThreeVertical
              size={20}
              color={COLORS.text.primary}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.text.tertiary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <PaperPlaneTilt
              size={20}
              color={COLORS.text.inverse}
              weight="fill"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.text.primary },
  moreBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  messagesList: { padding: 20 },
  messageContainer: { marginBottom: 12 },
  myMessageContainer: { alignItems: 'flex-end' },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  theirBubble: {
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  myBubble: { backgroundColor: COLORS.blue.brand },
  messageText: { fontSize: 15, color: COLORS.text.primary, marginBottom: 4 },
  myMessageText: { color: COLORS.text.inverse },
  timeText: { fontSize: 11, color: COLORS.text.tertiary },
  myTimeText: { color: COLORS.text.inverse, opacity: 0.7 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.bg.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text.primary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.blue.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatConversationScreen;
