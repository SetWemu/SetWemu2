import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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


// Modal Screens - Profile
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* AUTH FLOW */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      {/* ==================== MAIN APP ==================== */}
      <Stack.Screen name="Main" component={TabNavigator} />

      {/* ==================== EVENTS ==================== */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />

      {/* ==================== TICKETS & CHECKOUT ==================== */}
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen 
        name="Success" 
        component={SuccessScreen}
        options={{ gestureEnabled: false }}
      />

      {/* ==================== SOCIAL ==================== */}
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Followers" component={FollowersListScreen} />
      <Stack.Screen name="Following" component={FollowingListScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Reviews" component={ReviewsListScreen} />
      <Stack.Screen name="Stories" component={StoriesScreen} />

      {/* ==================== PROFILE ==================== */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}