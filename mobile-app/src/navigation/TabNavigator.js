import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, MagnifyingGlass, MapTrifold, User, Plus } from 'phosphor-react-native';

import HomeStack        from './HomeStack';
import ExploreStack     from './ExploreStack';
import ProfileStack     from './ProfileStack';
import CreateEventStack from './CreateEventStack';

const MapPlaceholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#141416' }}>
    <MapTrifold size={48} color="#4CC1D4" weight="regular" />
    <Text style={{ fontSize: 18, fontWeight: '700', color: '#F2F2F7', marginTop: 12 }}>Map View</Text>
    <Text style={{ fontSize: 14, color: '#ABABAB', marginTop: 6 }}>Coming soon</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const C = {
  bg:     { card: '#1C1C1E' },
  teal:   { light: '#ADF3FF', brand: '#4CC1D4', deep: '#2A8FA0' },
  text:   { secondary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)' },
};

const CreateIcon = ({ focused }) => (
  <View style={ci.outer}>
    <View style={[ci.btn, focused && ci.btnFocused]}>
      <Plus size={26} color="#141416" weight="bold" />
    </View>
  </View>
);
const ci = StyleSheet.create({
  outer:     { alignItems: 'center', justifyContent: 'center', top: -14 },
  btn:       { width: 54, height: 54, borderRadius: 27, backgroundColor: C.teal.brand, alignItems: 'center', justifyContent: 'center', shadowColor: C.teal.brand, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 8 },
  btnFocused:{ backgroundColor: C.teal.deep },
});

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: C.bg.card,
        borderTopColor: C.border.subtle,
        borderTopWidth: 1,
        height: 68,
        paddingBottom: 10,
        paddingTop: 6,
      },
      tabBarActiveTintColor:   C.teal.light,
      tabBarInactiveTintColor: C.text.secondary,
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    }}
  >
    <Tab.Screen
      name="HomeTab" component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, color }) => (
          <House size={22} color={color} weight={focused ? 'fill' : 'regular'} />
        ),
      }}
    />
    <Tab.Screen
      name="ExploreTab" component={ExploreStack}
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ focused, color }) => (
          <MagnifyingGlass size={22} color={color} weight={focused ? 'bold' : 'regular'} />
        ),
      }}
    />
    <Tab.Screen
      name="CreateTab" component={CreateEventStack}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => <CreateIcon focused={focused} />,
      }}
    />
    <Tab.Screen
      name="MapTab" component={MapPlaceholder}
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: ({ focused, color }) => (
          <MapTrifold size={22} color={color} weight={focused ? 'fill' : 'regular'} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileTab" component={ProfileStack}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, color }) => (
          <User size={22} color={color} weight={focused ? 'fill' : 'regular'} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;