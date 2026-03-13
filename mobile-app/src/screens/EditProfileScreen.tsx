import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = ({ navigation }: any) => {
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=Isafa+Ahmed&background=38bdf8&color=fff&size=128');
  const [name, setName] = useState('Isafa Ahmed');
  const [username, setUsername] = useState('@isafa_dev');
  const [email, setEmail] = useState('isafa@example.com');
  const [bio, setBio] = useState('Tech enthusiast & Event Organizer. Always looking to learn new things!');
  const [website, setWebsite] = useState('https://isafa.dev');

  const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>('LK');
  const [callingCode, setCallingCode] = useState('94');
  const [phone, setPhone] = useState('771234567');

  const [locationCountryCode, setLocationCountryCode] = useState<CountryCode>('LK');
  const [countryName, setCountryName] = useState('Sri Lanka');
  const [city, setCity] = useState('Colombo');

  // Inside handleSave function:
    const handleSave = () => {
  const fullPhone = `+${callingCode} ${phone}`;
  const fullLocation = city ? `${city}, ${countryName}` : countryName;
  
  // FIXED: Changed navigation name to 'Profile' to match AppNavigator
  navigation.navigate('Profile', {
    updatedData: {
      name,
      handle: username,
      email,
      phone: fullPhone,
      location: fullLocation,
      bio,
      website,
      avatar
    }
  });
};

  const handleChangePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      if (selectedImageUri) setAvatar(selectedImageUri);
    }
  };

  const countryPickerTheme = {
    backgroundColor: '#1e293b',
    onBackgroundTextColor: '#ffffff',
    fontSize: 16,
    filterPlaceholderTextColor: '#94a3b8',
    activeOpacity: 0.7,
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBadge} onPress={handleChangePhoto}>
              <Icon name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
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
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.rowInputContainer}>
              <View style={styles.countryPickerButton}>
                <CountryPicker
                  countryCode={phoneCountryCode}
                  withFilter withFlag withCallingCode withCallingCodeButton
                  theme={countryPickerTheme}
                  onSelect={(country: Country) => {
                    setPhoneCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                  }}
                />
              </View>
              <TextInput style={[styles.input, { flex: 1, marginLeft: 10 }]} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.rowInputContainer}>
              <View style={styles.countryPickerButton}>
                <CountryPicker
                  countryCode={locationCountryCode}
                  withFilter withFlag withCountryNameButton
                  theme={countryPickerTheme}
                  onSelect={(country: Country) => {
                    setLocationCountryCode(country.cca2);
                    setCountryName(country.name as string);
                  }}
                />
              </View>
            </View>
            <TextInput style={[styles.input, { marginTop: 10 }]} value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#64748b" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={[styles.input, styles.textArea]} value={bio} onChangeText={setBio} multiline numberOfLines={4} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <TextInput style={styles.input} value={website} onChangeText={setWebsite} keyboardType="url" autoCapitalize="none" />
          </View>
          <View style={{height: 40}} />
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
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#38bdf8', padding: 8, borderRadius: 20, borderWidth: 3, borderColor: '#0F172A' },
  formContainer: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#94a3b8', marginBottom: 8, fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  input: { backgroundColor: '#1e293b', color: 'white', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, borderWidth: 1, borderColor: '#334155' },
  textArea: { height: 100, textAlignVertical: 'top' },
  rowInputContainer: { flexDirection: 'row', alignItems: 'center' },
  countryPickerButton: { backgroundColor: '#1e293b', borderRadius: 12, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 15, paddingVertical: 14, justifyContent: 'center', height: 54 },
});

export default EditProfileScreen;