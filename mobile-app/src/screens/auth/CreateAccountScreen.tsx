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
import {
  EnvelopeSimple,
  Lock,
  User,
  Eye,
  EyeSlash,
} from 'phosphor-react-native';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { light: 'rgba(255,255,255,0.10)' },
};

const CreateAccountScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accountType, setAccountType] = useState<'personal' | 'business'>(
    'personal',
  );
  const [agreed, setAgreed] = useState(false);

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
            <Text style={s.title}>Create Account</Text>
            <Text style={s.subtitle}>
              Join SetWemu and discover amazing events
            </Text>
          </View>

          {/* Name Input */}
          <View style={s.inputWrap}>
            <User size={18} color={C.blue.light} weight="regular" />
            <TextInput
              style={s.input}
              placeholder="Full Name"
              placeholderTextColor={C.text.tertiary}
              value={name}
              onChangeText={setName}
            />
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

          {/* Confirm Password */}
          <View style={s.inputWrap}>
            <Lock size={18} color={C.blue.light} weight="regular" />
            <TextInput
              style={s.input}
              placeholder="Confirm Password"
              placeholderTextColor={C.text.tertiary}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeSlash size={18} color={C.text.tertiary} />
              ) : (
                <Eye size={18} color={C.text.tertiary} />
              )}
            </TouchableOpacity>
          </View>

          {/* Account Type Toggle */}
          <Text style={s.label}>Account Type</Text>
          <View style={s.toggleContainer}>
            <TouchableOpacity
              style={[
                s.toggleBtn,
                accountType === 'personal' && s.toggleBtnActive,
              ]}
              onPress={() => setAccountType('personal')}
            >
              <Text
                style={[
                  s.toggleText,
                  accountType === 'personal' && s.toggleTextActive,
                ]}
              >
                Personal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                s.toggleBtn,
                accountType === 'business' && s.toggleBtnActive,
              ]}
              onPress={() => setAccountType('business')}
            >
              <Text
                style={[
                  s.toggleText,
                  accountType === 'business' && s.toggleTextActive,
                ]}
              >
                Business
              </Text>
            </TouchableOpacity>
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={s.checkRow}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[s.checkbox, agreed && s.checkboxActive]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.checkText}>
              I agree to the <Text style={s.link}>Terms & Conditions</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={s.signupBtn}
            onPress={() => navigation.replace('Main')}
          >
            <Text style={s.signupBtnText}>Create Account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={s.footer}>
            <Text style={s.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={s.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  scroll: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 32 },
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

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text.secondary,
    marginBottom: 10,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: C.bg.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: C.blue.light },
  toggleText: { color: C.text.secondary, fontWeight: '700', fontSize: 14 },
  toggleTextActive: { color: '#141416' },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: C.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: C.blue.light, borderColor: C.blue.light },
  checkmark: { color: '#141416', fontSize: 14, fontWeight: '900' },
  checkText: { flex: 1, color: C.text.secondary, fontSize: 13 },
  link: { color: C.blue.light, fontWeight: '700' },

  signupBtn: {
    backgroundColor: C.blue.light,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupBtnText: { color: '#141416', fontSize: 16, fontWeight: '900' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  footerText: { color: C.text.secondary, fontSize: 14 },
  footerLink: { color: C.blue.light, fontWeight: '700', fontSize: 14 },
});

export default CreateAccountScreen;
