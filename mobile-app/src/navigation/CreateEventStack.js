import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import CreateEventScreen from '../screens/events/CreateEventScreen';
import EventPreviewScreen from '../screens/events/EventPreviewScreen';
import EventPublishSuccessScreen from '../screens/events/EventPublishSuccessScreen';

const Stack = createNativeStackNavigator();

const CreateEventStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="EventPreview" component={EventPreviewScreen} />
      <Stack.Screen name="EventPublishSuccess" component={EventPublishSuccessScreen} />
    </Stack.Navigator>
  );
};

export default CreateEventStack;