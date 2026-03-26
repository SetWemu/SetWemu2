import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../api/profileService';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: {
    light: '#ADF3FF',
    brand: '#4CC1D4',
    border: 'rgba(173,243,255,0.22)',
  },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { light: 'rgba(255,255,255,0.10)', subtle: 'rgba(255,255,255,0.06)' },
};

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [location, setLocation] = useState(user?.location || '');
  const [profileImage, setProfileImage] = useState(user?.avatar_url || null);

  // Country Picker State
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryFlag, setCountryFlag] = useState('🇺🇸');
  const [countryCode, setCountryCode] = useState('+1');
  const [countryName, setCountryName] = useState('United States');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        console.log(`[EditProfile] Refreshing profile data for ${user.id}...`);
        const data = await profileService.getProfile(user.id);
        
        // Update states only if they differ from what we have
        if (data.full_name) setName(data.full_name);
        if (data.username) setUsername(data.username);
        if (data.bio) setBio(data.bio);
        if (data.phone) setPhone(data.phone);
        if (data.location) setLocation(data.location);
        if (data.avatar_url) setProfileImage(data.avatar_url);
      } catch (error) {
        console.error('Failed to load extra profile details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); // Only fetch once on mount to avoid the "revert" loop after saving

  const handleSave = async () => {
    if (!username.trim() || username.length < 3) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters.');
      return;
    }

    setIsSaving(true);
    try {
      let finalAvatarUrl = profileImage;

      // 1. Handle Photo Upload if it's a new local URI
      if (profileImage && !profileImage.startsWith('http')) {
        finalAvatarUrl = await profileService.uploadAvatar(user.id, {
          uri: profileImage,
          name: `avatar_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      // 2. Update Profile in Backend
      const updatedData = {
        full_name: name,
        username,
        bio,
        phone,
        location,
        avatar_url: finalAvatarUrl,
      };

      const result = await profileService.updateProfile(user.id, updatedData);

      // 3. Sync with AuthContext (Global State)
      await updateUser({
        full_name: name,
        avatar_url: finalAvatarUrl,
        username: username,
        bio: bio,
        phone: phone,
        location: location,
      });

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Save Profile Error:', error);
      Alert.alert('Update Failed', error.message || 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.blue.brand} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator size="small" color={COLORS.blue.brand} />
            ) : (
              <Text style={styles.saveButton}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              onPress={() =>
                launchImageLibrary(
                  { mediaType: 'photo' },
                  r => !r.didCancel && setProfileImage(r.assets[0].uri),
                )
              }
              style={styles.avatarContainer}
            >
              <Image
                source={{
                  uri:
                    profileImage ||
                    `https://ui-avatars.com/api/?name=${name}&background=4CC1D4&color=141416`,
                }}
                style={styles.avatar}
              />
              <View style={styles.cameraBadge}>
                <Icon name="camera" size={14} color="#141416" />
              </View>
            </TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>USERNAME</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor={COLORS.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>BIO</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                multiline
                placeholderTextColor={COLORS.text.tertiary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL (READ-ONLY)</Text>
              <View style={[styles.input, styles.lockedInput]}>
                <Text style={{ color: COLORS.text.tertiary }}>
                  {email || 'N/A'}
                </Text>
                <Icon
                  name="lock-closed"
                  size={16}
                  color={COLORS.text.tertiary}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE</Text>
              <View style={styles.phoneInputRow}>
                <TouchableOpacity
                  style={styles.countryPickerTrigger}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text style={styles.countryFlag}>{countryFlag}</Text>
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }]}
                  value={phone.replace(countryCode, '').trim()}
                  onChangeText={(val) => setPhone(`${countryCode} ${val}`)}
                  keyboardType="phone-pad"
                  placeholder="234 567 890"
                  placeholderTextColor={COLORS.text.tertiary}
                />
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>RESIDENCE</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCountryPicker(true)}
              >
                <Text style={{ color: location ? COLORS.text.primary : COLORS.text.tertiary }}>
                  {location || 'Select Country'}
                </Text>
                <Icon name="chevron-down" size={16} color={COLORS.text.tertiary} />
              </TouchableOpacity>
            </View>

            {/* Interests logic stripped as per request */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={item => {
          setCountryFlag(item.flag);
          setCountryCode(item.dial_code);
          setCountryName(item.name?.en || item.name);
          setLocation(item.name?.en || item.name);
          // Auto-format phone with new country code
          const pureNumber = phone.replace(countryCode, '').trim();
          setPhone(`${item.dial_code} ${pureNumber}`);
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
        lang="en"
        style={{
          modal: {
            height: '60%',
            backgroundColor: COLORS.bg.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          backdrop: { backgroundColor: 'rgba(0,0,0,0.7)' },
          textInput: {
            backgroundColor: COLORS.bg.primary,
            color: COLORS.text.primary,
            borderRadius: 10,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: COLORS.border.light,
            height: 44,
          },
          countryButtonStyles: {
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border.subtle,
          },
          searchMessageText: { color: COLORS.text.tertiary },
          countryMessageContainer: { backgroundColor: COLORS.bg.card },
          flag: { fontSize: 22 },
          dialCode: { color: COLORS.text.secondary },
          countryName: { color: COLORS.text.primary },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  cancelButton: { color: COLORS.text.secondary, fontSize: 14 },
  headerTitle: { color: COLORS.text.primary, fontSize: 18, fontWeight: '700' },
  saveButton: { color: COLORS.blue.brand, fontSize: 14, fontWeight: '900' },
  avatarSection: { alignItems: 'center', marginVertical: 24 },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.blue.brand,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.bg.primary,
  },
  changePhotoText: {
    color: COLORS.blue.light,
    fontSize: 14,
    marginTop: 12,
    fontWeight: '600',
  },
  formContainer: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 20 },
  label: {
    color: COLORS.text.secondary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: COLORS.text.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lockedInput: { backgroundColor: 'transparent' },
  bioInput: { height: 100, textAlignVertical: 'top' },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneInputRow: {
    flexDirection: 'row',
  },
  countryPickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 12,
    gap: 6,
  },
  countryFlag: { fontSize: 20 },
  countryCodeText: { color: COLORS.text.primary, fontSize: 14, fontWeight: '600' },
  countryLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  countryText: { color: COLORS.text.primary, fontSize: 14 },
  countryCode: { color: COLORS.text.secondary, fontSize: 13 },
  interestsWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  interestPillActive: {
    borderColor: COLORS.blue.brand,
    backgroundColor: 'rgba(76,193,212,0.1)',
  },
  interestText: { color: COLORS.text.secondary, fontSize: 13 },
  interestTextActive: { color: COLORS.blue.brand, fontWeight: '700' },
});

export default EditProfileScreen;
