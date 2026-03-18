import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrganizerProfileScreen from '../screens/OrganizerProfileScreen'; // YOUR NEW SCREEN

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="OrganizerProfile" // Kept as your screen for testing
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
      
     
    </Stack.Navigator>
  );
}