import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Logo Section - IMAGE */}
          <View style={styles.logoContainer}>
          <Text style={{ color: 'white', fontSize: 24 }}>Logo Goes Here</Text>          
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Login</Text>
            <Text style={styles.headerSubtitle}>Please sign in to continue.</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            
            {/* Username */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Username or Email</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#64748b"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder=""
                    placeholderTextColor="#64748b"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity 
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                >
                    <Icon 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#94a3b8" 
                    />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
                <TouchableOpacity 
                style={styles.rememberContainer}
                onPress={() => setRememberMe(!rememberMe)}
                >
                <Icon 
                    name={rememberMe ? "checkbox" : "square-outline"} 
                    size={20} 
                    color={rememberMe ? "#38bdf8" : "#94a3b8"} 
                />
                <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Profile')} // <--- ADD THIS LINE
          >
              <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          </View>

          {/* Social Login Section */}
          <View style={styles.socialContainer}>
            <Text style={styles.orText}>Or Login with</Text>
            
            <View style={styles.socialIcons}>
               {/* Google */}
               <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-google" size={24} color="#fff" />
               </TouchableOpacity>
               {/* Facebook */}
               <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-facebook" size={24} color="#fff" />
               </TouchableOpacity>
               {/* Apple */}
               <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-apple" size={24} color="#fff" />
               </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
               <Text style={styles.linkText}>Signup</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 150, // Adjustable width
    height: 80, // Adjustable height
    marginBottom: 10,
  },
  headerContainer: {
    marginBottom: 30,
    width: '100%',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  formContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
      marginLeft: 4,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  passwordInput: {
      flex: 1,
      fontSize: 16,
      color: '#fff',
      height: '100%',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#94a3b8',
    marginLeft: 10,
    fontSize: 14,
  },
  forgotPasswordText: {
      color: '#38bdf8',
      fontWeight: '600',
      fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
      alignItems: 'center',
      marginBottom: 30,
  },
  orText: {
      color: '#94a3b8',
      marginBottom: 20,
      fontSize: 14,
  },
  socialIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
  },
  socialButton: {
      width: 50,
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#334155',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#94a3b8',
  },
  linkText: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  
});


export default LoginScreen;