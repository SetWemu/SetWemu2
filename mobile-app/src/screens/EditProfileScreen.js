import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Image, Alert, SafeAreaView
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Official SetWemu Design System Constants
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { light: 'rgba(255,255,255,0.10)', subtle: 'rgba(255,255,255,0.06)' },
};

const EditProfileScreen = ({ navigation, route }) => {
  const params = route.params || {};
  
  const [name, setName] = useState(params.currentName || 'You');
  const [username, setUsername] = useState(params.currentUsername || '@username');
  const [bio, setBio] = useState(params.currentBio || '');
  const [phone, setPhone] = useState(params.currentPhone || '+1 234 567 890');
  const [countryCode, setCountryCode] = useState(params.currentCountryCode || 'US');
  const [countryName, setCountryName] = useState(params.currentCountry || 'United States');
  const [profileImage, setProfileImage] = useState(params.currentImage || null);
  const [selectedInterests, setSelectedInterests] = useState(params.currentInterests || ['Music', 'Art']);

  const availableInterests = ['Music', 'Art', 'Food', 'Tech', 'Business', 'Wellness', 'Adventure', 'Fashion'];

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
    if (country.callingCode && country.callingCode.length > 0) {
      setPhone(`+${country.callingCode[0]} `);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      name, handle: username, bio, phone,
      country: countryName, countryCode,
      avatar: profileImage || `https://ui-avatars.com/api/?name=${name}&background=4CC1D4&color=141416`, 
      interests: selectedInterests,
      stats: params.currentStats || { events: 18, following: 142, followers: 845 }
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedData));
      navigation.navigate('Profile', { updatedData });
    } catch (error) {
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
          <View style={styles.avatarSection}>
            <TouchableOpacity 
              onPress={() => launchImageLibrary({mediaType:'photo'}, (r) => !r.didCancel && setProfileImage(r.assets[0].uri))} 
              style={styles.avatarContainer}
            >
              <Image 
                source={{ uri: profileImage || `https://ui-avatars.com/api/?name=${name}&background=4CC1D4&color=141416` }} 
                style={styles.avatar} 
              />
              {/* FIXED: Changed <div> to <View> */}
              <View style={styles.cameraBadge}>
                <Icon name="camera" size={14} color="#141416" />
              </View>
            </TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAME</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={COLORS.text.tertiary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>USERNAME</Text>
              <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor={COLORS.text.tertiary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>BIO</Text>
              <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} multiline placeholderTextColor={COLORS.text.tertiary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <View style={[styles.input, styles.lockedInput]}>
                <Text style={{color: COLORS.text.tertiary}}>user@example.com</Text>
                <Icon name="lock-closed" size={16} color={COLORS.text.tertiary} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE</Text>
              <TextInput 
                style={styles.input} 
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad" 
                placeholderTextColor={COLORS.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>LOCATION</Text>
              <View style={styles.input}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CountryPicker 
                    countryCode={countryCode} 
                    withFilter withFlag withCallingCode 
                    onSelect={onSelectCountry} 
                    theme={{ 
                        backgroundColor: COLORS.bg.primary, 
                        onBackgroundTextColor: COLORS.text.primary,
                        fontSize: 14
                    }}
                  />
                  <Text style={{ color: COLORS.text.primary, marginLeft: 10 }}>{countryName}</Text>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>INTERESTS</Text>
              <View style={styles.interestsWrapper}>
                {availableInterests.map((interest) => (
                  <TouchableOpacity 
                    key={interest} 
                    onPress={() => setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])}
                    style={[styles.interestPill, selectedInterests.includes(interest) && styles.interestPillActive]}
                  >
                    <Text style={[styles.interestText, selectedInterests.includes(interest) && styles.interestTextActive]}>
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border.subtle 
  },
  cancelButton: { color: COLORS.text.secondary, fontSize: 14 },
  headerTitle: { color: COLORS.text.primary, fontSize: 18, fontWeight: '700' },
  saveButton: { color: COLORS.blue.brand, fontSize: 14, fontWeight: '900' },
  avatarSection: { alignItems: 'center', marginVertical: 24 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: COLORS.blue.brand },
  cameraBadge: { 
    position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.blue.brand, 
    width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', 
    borderWidth: 3, borderColor: COLORS.bg.primary 
  },
  changePhotoText: { color: COLORS.blue.light, fontSize: 14, marginTop: 12, fontWeight: '600' },
  formContainer: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 20 },
  label: { color: COLORS.text.secondary, fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  input: { 
    backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.border.light, 
    borderRadius: 12, padding: 16, fontSize: 14, color: COLORS.text.primary,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  lockedInput: { backgroundColor: 'transparent' },
  bioInput: { height: 100, textAlignVertical: 'top' },
  interestsWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestPill: { 
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, 
    backgroundColor: COLORS.bg.card, borderWidth: 1, borderColor: COLORS.border.subtle 
  },
  interestPillActive: { borderColor: COLORS.blue.brand, backgroundColor: 'rgba(76,193,212,0.1)' },
  interestText: { color: COLORS.text.secondary, fontSize: 13 },
  interestTextActive: { color: COLORS.blue.brand, fontWeight: '700' },
});

export default EditProfileScreen;