import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Chat Screens
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatConversationScreen from '../screens/chat/ChatConversationScreen';
import ChatSettingsScreen from '../screens/chat/ChatSettingsScreen';
import NewMessageScreen from '../screens/chat/NewMessageScreen';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen
        name="ChatConversation"
        component={ChatConversationScreen}
      />
      <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
      <Stack.Screen name="NewMessage" component={NewMessageScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
