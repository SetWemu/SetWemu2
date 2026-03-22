import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import CreateEventScreen from '../screens/events/CreateEventScreen';
import EventPreviewScreen from '../screens/events/EventPreviewScreen';
import EventPublishSuccessScreen from '../screens/events/EventPublishSuccessScreen';
import UpgradeModal from '../screens/events/UpgradeModal';
import AttendeesListScreen from '../screens/events/AttendeesListScreen';

const Stack = createNativeStackNavigator();

const CreateEventStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="EventPreview" component={EventPreviewScreen} />
      <Stack.Screen name="EventPublishSuccess" component={EventPublishSuccessScreen} />
      <Stack.Screen 
        name="UpgradeModal" 
        component={UpgradeModal} 
        options={{ presentation: 'transparentModal', animation: 'fade' }} 
      />
      <Stack.Screen name="AttendeesList" component={AttendeesListScreen} />
    </Stack.Navigator>
  );
};

export default CreateEventStack;