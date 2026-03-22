import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Main App
import TabNavigator from './TabNavigator';

// ==================== HOME & FEED ====================
import HomeScreen from '../screens/home/HomeScreen'; 
import CreateStoryScreen from '../screens/home/CreateStoryScreen';
import StoriesScreen from '../screens/home/StoriesScreen';

// Modal Screens
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventsAttendedListScreen from '../screens/events/eventsAttendedListScreen'; // Note lowercase 'e' in list
import OrganizerProfileScreen from '../screens/OrganizerProfileScreen'; 
import AttendeesListScreen from '../screens/events/AttendeesListScreen';

// Modal Screens - Tickets
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import CheckoutScreen from '../screens/tickets/CheckoutScreen';
import PaymentScreen from '../screens/tickets/PaymentScreen';
import SuccessScreen from '../screens/tickets/SuccessScreen';

// Modal Screens - Social
import FavoritesScreen from '../screens/explore/FavoritesScreen';
import FollowersListScreen from '../screens/profile/FollowersListScreen';
import FollowingListScreen from '../screens/profile/FollowingListScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import ReviewsListScreen from '../screens/events/ReviewsListScreen';

import ManageEventsScreen from '../screens/manage/ManageEventsScreen';
import EventAnalyticsScreen from '../screens/manage/EventAnalyticsScreen';
import AttendeesListScreen from '../screens/manage/AttendeesListScreen';
import QRScannerScreen from '../screens/manage/QRScannerScreen';

import CreatePostScreen from '../screens/profile/CreatePostScreen';
import PostDetailsScreen from '../screens/profile/PostDetailsScreen';

// Modal Screens - Profile
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  // default to the Login screen while it's still reading the disk.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141416' }}>
        <ActivityIndicator size="large" color="#ADF3FF" />
      </View>
    );
  }

  return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // 1. AUTHENTICATED GROUP (MAIN APP)
        <Stack.Group>
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
        </Stack.Group>
      ) : (
        // 2. UNAUTHENTICATED GROUP (AUTH FLOW)
        <Stack.Group>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}