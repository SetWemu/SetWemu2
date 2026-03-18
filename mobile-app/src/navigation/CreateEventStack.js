// src/navigation/CreateEventStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ── Placeholder until CreateEventBasicScreen is built ────────────────────────
import { View, Text, StyleSheet } from 'react-native';
const CreateEventPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.emoji}>➕</Text>
    <Text style={styles.title}>Create Event</Text>
    <Text style={styles.sub}>Event creation screen coming soon</Text>
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

const CreateEventStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*
        Replace CreateEventPlaceholder with:
        - CreateEventBasicScreen   (basic account)
        - CreateEventAdvancedScreen (premium account)
        - EventPreviewScreen
      */}
      <Stack.Screen name="CreateEvent" component={CreateEventPlaceholder} />
    </Stack.Navigator>
  );
};

export default CreateEventStack;