import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ExploreScreen from '../screens/explore/ExploreScreen';
import SearchResultsScreen from '../screens/explore/SearchResultsScreen';
import SwipeScreen from '../screens/explore/SwipeScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import FavoritesScreen from '../screens/explore/FavoritesScreen';

const Stack = createNativeStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main explore screen with search + categories */}
      <Stack.Screen name="Explore" component={ExploreScreen} />

      {/* Search results page */}
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />

      {/* Swipe/Tinder interface */}
      <Stack.Screen name="Swipe" component={SwipeScreen} />

      {/* Event detail (can be accessed from anywhere) */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />

      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
