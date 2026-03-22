import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// --- AUTH ---
import SplashScreen from '../screens/auth/SplashScreen';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// --- MAIN ---
import TabNavigator from './TabNavigator';

// --- HOME & FEED ---
import HomeScreen from '../screens/home/HomeScreen'; 
import CreateStoryScreen from '../screens/home/CreateStoryScreen';
import StoriesScreen from '../screens/home/StoriesScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';

// --- EVENTS ---
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventsAttendedListScreen from '../screens/events/eventsAttendedListScreen'; // Lowercase 'e'
import ReviewsListScreen from '../screens/events/ReviewsListScreen';

// --- TICKETS & CHECKOUT ---
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import CheckoutScreen from '../screens/tickets/CheckoutScreen';
import PaymentScreen from '../screens/tickets/PaymentScreen';
import SuccessScreen from '../screens/tickets/SuccessScreen';
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';

// --- EXPLORE & MAP ---
import FavoritesScreen from '../screens/explore/FavoritesScreen';
import LiveMapScreen from '../screens/map/LiveMapScreen';

// --- MANAGEMENT (Organizer Tools) ---
import ManageEventsScreen from '../screens/manage/ManageEventsScreen';
import EventAnalyticsScreen from '../screens/manage/EventAnalyticsScreen';
import AttendeesListScreen from '../screens/manage/AttendeesListScreen';
import QRScannerScreen from '../screens/manage/QRScannerScreen';

// --- PROFILE ---
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import OrganizerProfileScreen from '../screens/profile/OrganizerProfileScreen';
import FollowersListScreen from '../screens/profile/FollowersListScreen';
import FollowingListScreen from '../screens/profile/FollowingListScreen';
import CreatePostScreen from '../screens/profile/CreatePostScreen';
import PostDetailsScreen from '../screens/profile/PostDetailsScreen';
import SettingsScreen from '../screens/profile/settingsScreen';
import HelpScreen from '../screens/profile/helpScreen';
import PublicProfileScreen from '../screens/profile/PublicProfileScreen';

// --- CHAT ---
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatConversationScreen from '../screens/chat/ChatConversationScreen';

// --- TEST ---
import TestScreen from '../screens/TestScreen';

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
          
          {/* MANAGEMENT & ORGANIZER */}
          <Stack.Screen name="ManageEvents" component={ManageEventsScreen} />
          <Stack.Screen name="EventAnalytics" component={EventAnalyticsScreen} />
          <Stack.Screen name="QRScanner" component={QRScannerScreen} />

          {/* ADDITIONAL PROFILE & SOCIAL */}
          <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />

          {/* MAP */}
          <Stack.Screen name="LiveMap" component={LiveMapScreen} />

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