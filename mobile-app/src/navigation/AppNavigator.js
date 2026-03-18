import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrganizerProfileScreen from '../screens/OrganizerProfileScreen'; // In src/screens/
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="OrganizerProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
     
    </Stack.Navigator>
  );
}