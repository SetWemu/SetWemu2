import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)' },
};

const HelpScreen = ({ navigation }) => {
  const handleEmailSupport = () => {
    Linking.openURL(
      'mailto:support@setwemu.com?subject=SetWemu Support Request',
    );
  };

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
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>FAQ</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.rowText}>Report a Problem</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Contact Support Form</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 0 }]}
              onPress={handleEmailSupport}
            >
              <View>
                <Text style={styles.rowText}>Email Support</Text>
                <Text style={styles.subText}>support@setwemu.com</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Terms of Service</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>Privacy Policy</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.rowText}>App Version</Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

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

  subText: {
    color: COLORS.text.secondary,
    fontSize: 12,
    marginTop: 4,
  },

  versionText: {
    color: COLORS.text.tertiary,
    fontSize: 14,
  },

  arrow: {
    color: COLORS.text.tertiary,
    fontSize: 20,
  },
});
