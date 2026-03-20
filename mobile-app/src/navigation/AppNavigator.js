import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ==================== AUTH SCREENS ====================
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TabNavigator from './TabNavigator';

// ==================== HOME & FEED ====================
import HomeScreen from '../screens/homeScreen';
import CreateStoryScreen from '../screens/createStoryScreen';

// ==================== EVENTS ====================
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventsAttendedListScreen from '../screens/events/EventsAttendedListScreen';
import OrganizerProfileScreen from '../screens/OrganizerProfileScreen'; // YOUR NEW SCREEN
import AttendeesListScreen from '../screens/events/AttendeesListScreen';

// ==================== TICKETS ====================
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import CheckoutScreen from '../screens/tickets/CheckoutScreen';
import PaymentScreen from '../screens/tickets/PaymentScreen';
import SuccessScreen from '../screens/tickets/SuccessScreen';

// ==================== SOCIAL ====================
import FavoritesScreen from '../screens/favoritesScreen';
import FollowersListScreen from '../screens/followersListScreen';
import FollowingListScreen from '../screens/followingListScreen';
import NotificationsScreen from '../screens/notificationsScreen';
import ReviewsListScreen from '../screens/reviewListScreen';

// ==================== PROFILE ====================
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

// ==================== CHAT ====================
import ChatListScreen from '../screens/ChatListScreen';
import ChatConversationScreen from '../screens/ChatConversationScreen';

// ==================== TEST ====================
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="OrganizerProfile" // Kept as your screen for testing
      screenOptions={{ headerShown: false }}
    >
      {/* AUTH FLOW */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      
      {/* HOME */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
      
      {/* EVENTS */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EventsAttended" component={EventsAttendedListScreen} />
      <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
      
      {/* TICKETS */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EventsAttended" component={EventsAttendedListScreen} />
      <Stack.Screen name="AttendeesList" component={AttendeesListScreen} />
      <Stack.Screen name="MyTickets" component={MyTicketsScreen} /> 
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} options={{ gestureEnabled: false }} />
      
      {/* SOCIAL */}
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Followers" component={FollowersListScreen} />
      <Stack.Screen name="Following" component={FollowingListScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Reviews" component={ReviewsListScreen} />
      
      {/* PROFILE */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      
      {/* CHAT */}
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
      
      {/* TEST */}
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}