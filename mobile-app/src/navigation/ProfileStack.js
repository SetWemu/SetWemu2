import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/settingsScreen';
import HelpScreen from '../screens/profile/helpScreen';
import PublicProfileScreen from '../screens/profile/PublicProfileScreen';

// Tickets
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';

// Social
import FavoritesScreen from '../screens/explore/FavoritesScreen';
import FollowersListScreen from '../screens/profile/FollowersListScreen';
import FollowingListScreen from '../screens/profile/FollowingListScreen';
import CreatePostScreen from '../screens/profile/CreatePostScreen';
import PostDetailsScreen from '../screens/profile/PostDetailsScreen';

// Events
import EventDetailScreen from '../screens/events/EventDetailScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Profile */}
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* Profile Management */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />

      {/* Tickets */}
      <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />

      {/* Social */}
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Followers" component={FollowersListScreen} />
      <Stack.Screen name="Following" component={FollowingListScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />

      {/* Events */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;