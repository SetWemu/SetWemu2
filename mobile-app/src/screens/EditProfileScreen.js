import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Image, Alert
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
// ADD THIS IMPORT
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params?.currentName || 'Isafa Ahmed');
  const [username, setUsername] = useState(route.params?.currentUsername || '@isafa_dev');
  const [bio, setBio] = useState(route.params?.currentBio || 'Tech enthusiast & Event Organizer.');
  const [phone, setPhone] = useState(route.params?.currentPhone || '+1 ');
  const [countryCode, setCountryCode] = useState(route.params?.currentCountryCode || 'US');
  const [countryName, setCountryName] = useState(route.params?.currentCountry || 'United States');
  const [profileImage, setProfileImage] = useState(route.params?.currentImage || null);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
    if (country.callingCode && country.callingCode.length > 0) {
      setPhone(`+${country.callingCode[0]} `);
    }
  };

  const handleImagePicker = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // UPDATED handleSave with AsyncStorage
  const handleSave = async () => {
    const updatedData = {
      name,
      username,
      bio,
      phone,
      country: countryName,
      countryCode: countryCode,
      image: profileImage,
    };

    try {
      // Save to local storage
      await AsyncStorage.setItem('user_profile', JSON.stringify(updatedData));
      
      // Navigate back with the data
      navigation.navigate('Profile', { updatedData });
    } catch (error) {
      Alert.alert("Error", "Failed to save profile data.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancelButton}>Cancel</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}><Text style={styles.saveButton}>Save</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.avatarContainer}>
            <Image 
              source={{ uri: profileImage || `https://ui-avatars.com/api/?name=${name}&background=38bdf8&color=fff&size=128` }} 
              style={styles.avatar} 
            />
            <View style={styles.editIconBadge}>
              <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>EDIT</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={[styles.input, {height: 80}]} value={bio} onChangeText={setBio} multiline />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country</Text>
            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
              <CountryPicker countryCode={countryCode} withFilter withFlag onSelect={onSelect} 
                theme={{ backgroundColor: '#1e293b', onBackgroundTextColor: 'white' }}
              />
              <Text style={{ color: 'white', marginLeft: 10 }}>{countryName}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  cancelButton: { color: '#94a3b8', fontSize: 16 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  saveButton: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginTop: 25, marginBottom: 10 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#38bdf8' },
  editIconBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#38bdf8', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#0F172A' },
  formContainer: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#94a3b8', marginBottom: 8, fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  input: { backgroundColor: '#1e293b', color: 'white', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, borderWidth: 1, borderColor: '#334155' },
});

export default EditProfileScreen;