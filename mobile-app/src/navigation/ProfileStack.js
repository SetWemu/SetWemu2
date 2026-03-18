import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Screens
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

// Profile Screen with Navigation Menu
const ProfileScreen = ({ navigation }) => (
  <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your account & settings</Text>
    </View>

    {/* My Tickets */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>My Stuff</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('MyTickets')}
      >
        <Text style={styles.btnText}>🎟️ My Tickets</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Favorites')}
      >
        <Text style={styles.btnText}>❤️ Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Reviews')}
      >
        <Text style={styles.btnText}>⭐ My Reviews</Text>
      </TouchableOpacity>
    </View>

    {/* Social */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Social</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Following')}
      >
        <Text style={styles.btnText}>👥 Following</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Followers')}
      >
        <Text style={styles.btnText}>👥 Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('ChatList')}
      >
        <Text style={styles.btnText}>💬 Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Notifications')}
      >
        <Text style={styles.btnText}>🔔 Notifications</Text>
      </TouchableOpacity>
    </View>

    {/* Settings */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.btnText}>✏️ Edit Profile</Text>
      </TouchableOpacity>
    </View>

    {/* Test */}
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent().navigate('Test')}
      >
        <Text style={styles.btnText}>🧪 Test Screen</Text>
      </TouchableOpacity>
    </View>

    <View style={{ height: 40 }} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071B2E' },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0E2A47',
    alignItems: 'center',
  },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#0E2A47', alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8' },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnText: { color: '#fff', fontSize: 16 },
});

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
