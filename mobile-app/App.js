import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Correct paths based on your sidebar: App.js -> src -> screens
import ChatListScreen from './src/screens/ChatListScreen';
import ChatConversationScreen from './src/screens/ChatConversationScreen';
import ChatSettingsScreen from './src/screens/ChatSettingsScreen';
import NewMessageScreen from './src/screens/NewMessageScreen';

const Stack = createStackNavigator();

const COLORS = {
  bg: '#141416',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatList"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.bg },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
        <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
        <Stack.Screen 
          name="NewMessage" 
          component={NewMessageScreen} 
          options={{ presentation: 'modal' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;