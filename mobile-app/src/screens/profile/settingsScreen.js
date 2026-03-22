import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)' },
  error: '#FF453A',
};

const SettingsScreen = ({ navigation }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={COLORS.text.primary} weight="bold" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowText}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{
                  true: COLORS.blue.brand,
                  false: COLORS.bg.elevated,
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{
                  true: COLORS.blue.brand,
                  false: COLORS.bg.elevated,
                }}
              />
            </View>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.rowText}>Event Reminders</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACY</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowText}>Private Account</Text>
              <Switch
                value={privateAccount}
                onValueChange={setPrivateAccount}
                trackColor={{
                  true: COLORS.blue.brand,
                  false: COLORS.bg.elevated,
                }}
              />
            </View>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Blocked Users</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.rowText}>Activity Status</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.rowText}>Edit Profile</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Change Password</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Payment Methods</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={[styles.rowText, { color: COLORS.error }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text.primary,
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: COLORS.text.tertiary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },

  rowText: {
    color: COLORS.text.primary,
    fontSize: 15,
    fontWeight: '600',
  },

  arrow: {
    color: COLORS.text.tertiary,
    fontSize: 20,
  },
});
