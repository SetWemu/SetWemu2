import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= DESIGN SYSTEM ================= */
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: {
    light: '#ADF3FF',
    brand: '#4CC1D4',
    border: 'rgba(173,243,255,0.22)'
  },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416'
  },
  border: {
    subtle: 'rgba(255,255,255,0.06)'
  },
  error: '#FF453A'
};

const SettingsScreen = ({ navigation }) => {

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  // BACK PLACEHOLDER
  const handleBack = () => {
    console.log("GO BACK SETTINGS");
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Settings</Text>
          <Text style={styles.subHeader}>Control your experience</Text>
        </View>

        {/* ================= Notifications ================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.row}>
            <Text style={styles.rowText}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{
                false: COLORS.border.subtle,
                true: COLORS.blue.border
              }}
              thumbColor={pushNotifications ? COLORS.blue.brand : "#888"}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowText}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{
                false: COLORS.border.subtle,
                true: COLORS.blue.border
              }}
              thumbColor={emailNotifications ? COLORS.blue.brand : "#888"}
            />
          </View>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Event Reminders</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ================= Privacy ================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>

          <View style={styles.row}>
            <Text style={styles.rowText}>Private Account</Text>
            <Switch
              value={privateAccount}
              onValueChange={setPrivateAccount}
              trackColor={{
                false: COLORS.border.subtle,
                true: COLORS.blue.border
              }}
              thumbColor={privateAccount ? COLORS.blue.brand : "#888"}
            />
          </View>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Blocked Users</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Activity Status</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ================= Account ================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.row}>
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

          <TouchableOpacity style={styles.row}>
            <Text style={[styles.rowText, { color: COLORS.error }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
  },

  headerContainer: {
    padding: 20,
    paddingTop: 10,
  },

  backText: {
    color: COLORS.blue.light,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  header: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 6,
    letterSpacing: -0.4,
  },

  subHeader: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },

  section: {
    marginTop: 15,
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },

  sectionTitle: {
    color: COLORS.text.tertiary,
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
  },

  rowText: {
    color: COLORS.text.primary,
    fontSize: 15,
    fontWeight: "500",
  },

  arrow: {
    color: COLORS.text.tertiary,
    fontSize: 18,
  },
});