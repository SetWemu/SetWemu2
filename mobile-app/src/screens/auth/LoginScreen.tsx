import { useAuth } from '../../context/AuthContext';
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
  Alert,
  ActivityIndicator
} from 'react-native';
import { EnvelopeSimple, Lock, Eye, EyeSlash } from 'phosphor-react-native';
import apiClient from '../../api/apiClient';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { light: 'rgba(255,255,255,0.10)' },
};

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (response.status === 200) {
        await login(response.data.user); 
        
        console.log('Login Successful');
        Alert.alert("Success", `Welcome back, ${response.data.user.full_name || 'User'}!`);
        navigation.replace('Main'); 
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Invalid email or password";
      Alert.alert("Login Failed", errorMsg);
      console.error("Login Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
        >
          {/* Header */}
          <View style={s.header}>
            <Text style={s.title}>Welcome Back</Text>
            <Text style={s.subtitle}>Login to continue discovering events</Text>
          </View>

          {/* Email Input */}
          <View style={s.inputWrap}>
            <EnvelopeSimple size={18} color={C.blue.light} weight="regular" />
            <TextInput
              style={s.input}
              placeholder="Email Address"
              placeholderTextColor={C.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={s.inputWrap}>
            <Lock size={18} color={C.blue.light} weight="regular" />
            <TextInput
              style={s.input}
              placeholder="Password"
              placeholderTextColor={C.text.tertiary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSlash size={18} color={C.text.tertiary} />
              ) : (
                <Eye size={18} color={C.text.tertiary} />
              )}
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={s.optionsRow}>
            <TouchableOpacity
              style={s.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[s.checkbox, rememberMe && s.checkboxActive]}>
                {rememberMe && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={s.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[s.loginBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#141416" />
            ) : (
              <Text style={s.loginBtnText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={s.footer}>
            <Text style={s.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <Text style={s.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  scroll: {
    padding: 24,
    paddingTop: 80,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: { marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: C.text.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: C.text.secondary },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.border.light,
    gap: 12,
  },
  input: { flex: 1, color: C.text.primary, fontSize: 15, fontWeight: '600' },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: C.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: C.blue.light, borderColor: C.blue.light },
  checkmark: { color: '#141416', fontSize: 12, fontWeight: '900' },
  rememberText: { color: C.text.secondary, fontSize: 13 },
  forgotText: { color: C.blue.light, fontWeight: '700', fontSize: 13 },
  loginBtn: {
    backgroundColor: C.blue.light,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnText: { color: '#141416', fontSize: 16, fontWeight: '900' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: C.text.secondary, fontSize: 14 },
  footerLink: { color: C.blue.light, fontWeight: '700', fontSize: 14 },
});

export default LoginScreen;