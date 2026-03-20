import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ==================== AUTH SCREENS ====================
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnBoardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TabNavigator from './TabNavigator';

// ==================== HOME & FEED ====================
import HomeScreen from '../screens/home/HomeScreen'; 
import CreateStoryScreen from '../screens/home/CreateStoryScreen';

// ==================== EVENTS ====================
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventsAttendedListScreen from '../screens/events/eventsAttendedListScreen'; // Note lowercase 'e' in list
import OrganizerProfileScreen from '../screens/OrganizerProfileScreen'; 
import AttendeesListScreen from '../screens/events/AttendeesListScreen';

// ==================== TICKETS ====================
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import CheckoutScreen from '../screens/tickets/CheckoutScreen';
import PaymentScreen from '../screens/tickets/PaymentScreen';
import SuccessScreen from '../screens/tickets/SuccessScreen';

// ==================== SOCIAL ====================
import FavoritesScreen from '../screens/social/FavoritesScreen';
import FollowersListScreen from '../screens/social/FollowersListScreen';
import FollowingListScreen from '../screens/social/FollowingListScreen';
import NotificationsScreen from '../screens/social/NotificationsScreen';
import ReviewsListScreen from '../screens/social/ReviewsListScreen';

// ==================== PROFILE ====================
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

// ==================== CHAT ====================
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatConversationScreen from '../screens/chat/ChatConversationScreen';

// ==================== TEST ====================
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash" 
      screenOptions={{ headerShown: false }}
    >
      {/* AUTH FLOW */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      
      {/* CORE SCREENS */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EventsAttended" component={EventsAttendedListScreen} />
      <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
      <Stack.Screen name="AttendeesList" component={AttendeesListScreen} />
      
      {/* TICKETS & CHECKOUT */}
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