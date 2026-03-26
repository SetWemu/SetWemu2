import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  ArrowLeft,
  TrendUp,
  Users,
  Ticket,
  CurrencyDollar,
  QrCode,
  ListChecks,
  Crown,
  ArrowSquareOut,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
  warning: '#FFD60A',
  gold: '#FFD700',
};

const EventAnalyticsScreen = ({ navigation, route }) => {
  const { event } = route.params || {};
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock user account type - replace with real data
  const accountType = 'personal'; // or 'business'

  const basicStats = [
    {
      id: 1,
      label: 'Total Sales',
      value: event?.revenue || 'LKR 171,000',
      icon: CurrencyDollar,
      color: COLORS.success,
    },
    {
      id: 2,
      label: 'Tickets Sold',
      value: `${event?.ticketsSold || 342}/${event?.totalTickets || 500}`,
      icon: Ticket,
      color: COLORS.blue.brand,
    },
    {
      id: 3,
      label: 'Checked In',
      value: '234/342',
      icon: Users,
      color: COLORS.warning,
    },
    {
      id: 4,
      label: 'Conversion Rate',
      value: '68%',
      icon: TrendUp,
      color: COLORS.success,
    },
  ];

  const handleAdvancedAnalytics = () => {
    if (accountType === 'personal') {
      setShowUpgradeModal(true);
    } else {
      // Redirect to advanced analytics web page
      Linking.openURL('https://analytics.setwemu.com');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Info */}
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{event?.title || 'Event Name'}</Text>
          <Text style={styles.eventDate}>{event?.date || 'Date'}</Text>
        </View>

        {/* Basic Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BASIC ANALYTICS</Text>
          <View style={styles.statsGrid}>
            {basicStats.map(stat => {
              const IconComponent = stat.icon;
              return (
                <View key={stat.id} style={styles.statCard}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: stat.color + '20' },
                    ]}
                  >
                    <IconComponent size={24} color={stat.color} weight="bold" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('QRScanner', { event })}
          >
            <View style={styles.actionLeft}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: COLORS.blue.brand + '20' },
                ]}
              >
                <QrCode size={24} color={COLORS.blue.brand} weight="bold" />
              </View>
              <View>
                <Text style={styles.actionTitle}>QR Scanner</Text>
                <Text style={styles.actionSubtitle}>Check-in attendees</Text>
              </View>
            </View>
            <ArrowSquareOut
              size={20}
              color={COLORS.text.tertiary}
              weight="bold"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('AttendeesList', { event })}
          >
            <View style={styles.actionLeft}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: COLORS.success + '20' },
                ]}
              >
                <ListChecks size={24} color={COLORS.success} weight="bold" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Attendees List</Text>
                <Text style={styles.actionSubtitle}>
                  View all attendees & check-in status
                </Text>
              </View>
            </View>
            <ArrowSquareOut
              size={20}
              color={COLORS.text.tertiary}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        {/* Advanced Analytics Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.advancedBtn}
            onPress={handleAdvancedAnalytics}
          >
            <View style={styles.advancedLeft}>
              <Crown size={24} color={COLORS.gold} weight="fill" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.advancedTitle}>Advanced Analytics</Text>
                <Text style={styles.advancedSubtitle}>
                  {accountType === 'personal'
                    ? 'Upgrade to unlock detailed insights'
                    : 'View comprehensive analytics dashboard'}
                </Text>
              </View>
            </View>
            <ArrowSquareOut size={20} color={COLORS.gold} weight="bold" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Crown size={64} color={COLORS.gold} weight="fill" />
            <Text style={styles.modalTitle}>Upgrade to Business</Text>
            <Text style={styles.modalText}>
              Get access to advanced analytics, detailed insights, demographics,
              revenue trends, and more!
            </Text>

            <View style={styles.modalFeatures}>
              <Text style={styles.featureItem}>
                ✓ Real-time analytics dashboard
              </Text>
              <Text style={styles.featureItem}>✓ Attendee demographics</Text>
              <Text style={styles.featureItem}>✓ Revenue breakdown</Text>
              <Text style={styles.featureItem}>✓ Traffic sources</Text>
              <Text style={styles.featureItem}>✓ Export reports</Text>
            </View>

            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => {
                setShowUpgradeModal(false);
                navigation.navigate('Upgrade');
              }}
            >
              <Text style={styles.upgradeBtnText}>
                Upgrade Now - LKR 2,500/mo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowUpgradeModal(false)}
            >
              <Text style={styles.cancelBtnText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  eventHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  eventDate: { fontSize: 14, color: COLORS.text.secondary },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text.tertiary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: COLORS.text.secondary, fontWeight: '600' },
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  actionSubtitle: { fontSize: 12, color: COLORS.text.secondary },
  advancedBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.gold + '15',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.gold + '40',
  },
  advancedLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  advancedTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  advancedSubtitle: { fontSize: 12, color: COLORS.text.secondary },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalFeatures: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  upgradeBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  upgradeBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.text.inverse,
  },
  cancelBtn: {
    paddingVertical: 12,
  },
  cancelBtnText: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    fontWeight: '600',
  },
});

export default EventAnalyticsScreen;
