import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  ArrowLeft,
  BellSlash,
  ProhibitInset,
  WarningCircle,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
};

const ChatSettingsScreen = ({ navigation, route }) => {
  const { chat } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <Image
            source={{ uri: chat?.avatar || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.largeAvatar}
          />
          <Text style={styles.contactName}>{chat?.name || 'User'}</Text>
          <Text style={styles.contactStatus}>Active now</Text>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionItem}>
            <BellSlash size={20} color={COLORS.text.secondary} weight="bold" />
            <Text style={styles.actionText}>Mute Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <ProhibitInset
              size={20}
              color={COLORS.text.secondary}
              weight="bold"
            />
            <Text style={styles.actionText}>Block User</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { borderBottomWidth: 0 }]}
          >
            <WarningCircle size={20} color={COLORS.error} weight="bold" />
            <Text style={[styles.actionText, { color: COLORS.error }]}>
              Report
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text.primary },
  contactSection: { alignItems: 'center', paddingVertical: 32 },
  largeAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  contactName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  contactStatus: { fontSize: 14, color: COLORS.text.secondary },
  section: {
    margin: 20,
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
    gap: 12,
  },
  actionText: { fontSize: 15, fontWeight: '600', color: COLORS.text.primary },
});

export default ChatSettingsScreen;
