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

const SettingsScreen = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Text style={styles.header}>Settings</Text>

        {/* ================= Notifications ================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.row}>
            <Text style={styles.rowText}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowText}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
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
            <Text style={[styles.rowText, { color: "#ff4d4d" }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071B2E",
  },

  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    padding: 20,
  },

  section: {
    marginTop: 15,
    backgroundColor: "#0E2A47",
    borderRadius: 12,
    marginHorizontal: 15,
    paddingVertical: 5,
  },

  sectionTitle: {
    color: "#aaa",
    fontSize: 13,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#1E3A5F",
  },

  rowText: {
    color: "white",
    fontSize: 16,
  },

  arrow: {
    color: "#888",
    fontSize: 18,
  },
});