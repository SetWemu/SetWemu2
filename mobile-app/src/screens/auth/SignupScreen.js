import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, //loading indicator
  Image,
} from 'react-native';


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');  //useState to store data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('Personal');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passwordStrong = password.length >= 8;
  const passwordsMatch = password === confirmPassword;

  const handleSignup = () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }
    if (!emailValid) {
      alert('Please enter a valid email');
      return;
    }
    if (!passwordStrong) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (!passwordsMatch) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Signup successful');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assests/Logo Base (6).png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.subtitle}>Just some details to get you in!</Text>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#ffffff"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ffffff"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {!emailValid && email.length > 0 && (
        <Text style={styles.error}>Invalid email format</Text>
      )}

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ffffff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {!passwordStrong && password.length > 0 && (
        <Text style={styles.error}>
          Password must be at least 8 characters
        </Text>
      )}

      {/* Confirm Password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ffffff"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {!passwordsMatch && confirmPassword.length > 0 && (
        <Text style={styles.error}>Passwords do not match</Text>
      )}

      {/* Account Type Selector*/}
      <View style={styles.accountTypeContainer}>
        <TouchableOpacity
          style={[
            styles.accountButton,
            accountType === 'Personal' && styles.selected,
          ]}
          onPress={() => setAccountType('Personal')}
        >
          <Text style={styles.accountButtonText}>Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.accountButton,
            accountType === 'Business' && styles.selected,
          ]}
          onPress={() => setAccountType('Business')}
        >
          <Text style={styles.accountButtonText}>Business</Text>
        </TouchableOpacity>
      </View>

      {/* Terms checkbox */}
      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <Text style={styles.termsText}>{termsAccepted ? '☑' : '☐'} I agree to the Terms & Conditions</Text>
      </TouchableOpacity>

      {/* Signup Button with loading */}
      <TouchableOpacity
        style={[
          styles.signupButton,
          (!termsAccepted || loading) && styles.disabled,
        ]}
        onPress={handleSignup}
        disabled={!termsAccepted || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      {/* divider between signup and social buttons */}
      <View style={styles.divider} />

      {/* Social signup buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => { /* TODO: Google auth */ }}>
          <Image
            source={{uri: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000'}}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => { /* TODO: Facebook auth */ }}>
          <Image
            source={{uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'}}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#04132a',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 6,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'left',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    color: '#ffffff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  accountButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  accountButtonText: {
    color: '#ffffff',
  },
  selected: {
    backgroundColor: '#ddd',
  },
  termsContainer: {
    marginVertical: 12,
  },
  termsText: {
    color: '#ffffff',
  },
  signupButton: {
    backgroundColor: '#5d8191',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#007AFF',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  socialText: {
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: 12,
    alignSelf: 'stretch',
  },
});
