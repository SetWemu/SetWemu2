import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import CreateStoryScreen from '../screens/home/CreateStoryScreen';
import StoriesScreen from '../screens/home/StoriesScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import ChatStack from './ChatStack';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
      <Stack.Screen name="Stories" component={StoriesScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      
      {/* Chat screens accessible from Home */}
      <Stack.Screen name="ChatList" component={ChatStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;