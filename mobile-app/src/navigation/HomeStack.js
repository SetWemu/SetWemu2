import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import CreateStoryScreen from '../screens/home/CreateStoryScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={HomeScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
