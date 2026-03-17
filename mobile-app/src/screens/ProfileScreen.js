import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// ADD THIS IMPORT
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, route }) => {
  // Use a state object to hold all user info
  const [profile, setProfile] = useState({
    name: "Isafa Ahmed",
    username: "@isafa_dev",
    bio: "Tech enthusiast & Event Organizer.",
    phone: "+1 234 567 890",
    country: "United States",
    countryCode: "US",
    image: null
  });

  // Load data from AsyncStorage when the screen starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('user_profile');
        if (savedData !== null) {
          setProfile(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    loadData();
  }, [route.params?.updatedData]); // Re-run if we get new data from EditScreen

  const MenuItem = ({ iconName, title, onPress, textColor = 'white' }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon 
          name={iconName} 
          size={22} 
          color={textColor === '#ef4444' ? '#ef4444' : '#38bdf8'} 
          style={{ marginRight: 15 }} 
        />
        <Text style={[styles.menuItemText, { color: textColor }]}>{title}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color="#475569" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ 
              uri: profile.image || `https://ui-avatars.com/api/?name=${profile.name}&background=38bdf8&color=fff&size=128` 
            }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.handle}>{profile.username} • {profile.country}</Text>
          
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditProfile', {
                currentName: profile.name,
                currentUsername: profile.username,
                currentBio: profile.bio,
                currentPhone: profile.phone,
                currentCountry: profile.country,
                currentCountryCode: profile.countryCode,
                currentImage: profile.image
            })}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem iconName="calendar-outline" title="My Events" onPress={() => {}} />
          <MenuItem iconName="settings-outline" title="Settings" onPress={() => {}} />
          <MenuItem iconName="help-circle-outline" title="Help & Support" onPress={() => {}} />
          <MenuItem 
            iconName="log-out-outline" 
            title="Logout" 
            textColor="#ef4444" 
            onPress={() => Alert.alert('Logout', 'Are you sure?')} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { alignItems: 'center', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 3, borderColor: '#38bdf8' },
  name: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  handle: { color: '#94a3b8', fontSize: 16, marginBottom: 20 },
  editButton: { backgroundColor: '#1e293b', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  editButtonText: { color: 'white', fontWeight: '600' },
  menuContainer: { padding: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, fontWeight: '500' },
});

export default ProfileScreen;