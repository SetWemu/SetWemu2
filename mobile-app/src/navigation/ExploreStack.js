// src/navigation/ExploreStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import EventDetailScreen from '../screens/events/EventDetailScreen';

// ── Placeholder until ExploreScreen/SearchResultsScreen is built ──────────────
import { View, Text, StyleSheet } from 'react-native';
const ExplorePlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.emoji}>🔍</Text>
    <Text style={styles.title}>Explore</Text>
    <Text style={styles.sub}>Search & filter events screen coming soon</Text>
  </View>
);
const styles = StyleSheet.create({
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA', padding: 40 },
  emoji:  { fontSize: 48, marginBottom: 12 },
  title:  { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  sub:    { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 },
});
// ─────────────────────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Replace ExplorePlaceholder with real ExploreScreen / SearchResultsScreen when built */}
      <Stack.Screen name="Explore"       component={ExplorePlaceholder} />
      <Stack.Screen name="EventDetail"   component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;