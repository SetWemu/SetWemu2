import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  CheckCircle,
  X,
  Flashlight,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
  error: '#FF453A',
};

const QRScannerScreen = ({ navigation, route }) => {
  const { event } = route.params || {};
  const [flashOn, setFlashOn] = useState(false);
  const [scannedAttendee, setScannedAttendee] = useState(null);

  // Mock QR scan - replace with actual QR scanner library
  const handleScan = () => {
    // Simulate scan result
    const mockAttendee = {
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      ticketType: 'VIP',
      ticketId: 'TKT-12345',
    };

    setScannedAttendee(mockAttendee);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setScannedAttendee(null);
    }, 3000);
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
        <Text style={styles.headerTitle}>QR Scanner</Text>
        <TouchableOpacity
          style={styles.flashBtn}
          onPress={() => setFlashOn(!flashOn)}
        >
            <Flashlight
                size={20}
                color={flashOn ? COLORS.blue.brand : COLORS.text.tertiary}
                weight={flashOn ? 'fill' : 'regular'}  // use weight for filled/unfilled
            />
        </TouchableOpacity>
      </View>

      {/* Scanner Area */}
      <View style={styles.scannerContainer}>
        <View style={styles.scannerFrame}>
          {/* Corner Brackets */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Scanning Line Animation would go here */}
          <View style={styles.scanLine} />
        </View>

        <Text style={styles.instructionText}>
          Position QR code within the frame
        </Text>

        {/* Test Scan Button - Remove in production */}
        <TouchableOpacity style={styles.testBtn} onPress={handleScan}>
          <Text style={styles.testBtnText}>Test Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Scan Result */}
      {scannedAttendee && (
        <View style={styles.resultOverlay}>
          <View style={styles.resultCard}>
            <View style={styles.successIcon}>
              <CheckCircle size={64} color={COLORS.success} weight="fill" />
            </View>

            <Text style={styles.resultTitle}>Check-in Successful!</Text>

            <View style={styles.attendeeDetails}>
              <Text style={styles.attendeeName}>{scannedAttendee.name}</Text>
              <Text style={styles.attendeeEmail}>{scannedAttendee.email}</Text>

              <View style={styles.ticketInfo}>
                <View style={styles.ticketRow}>
                  <Text style={styles.ticketLabel}>Ticket Type:</Text>
                  <Text style={styles.ticketValue}>
                    {scannedAttendee.ticketType}
                  </Text>
                </View>
                <View style={styles.ticketRow}>
                  <Text style={styles.ticketLabel}>Ticket ID:</Text>
                  <Text style={styles.ticketValue}>
                    {scannedAttendee.ticketId}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeResultBtn}
              onPress={() => setScannedAttendee(null)}
            >
              <X size={20} color={COLORS.text.primary} weight="bold" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Stats Footer */}
      <View style={styles.footer}>
        <View style={styles.footerStat}>
          <Text style={styles.footerValue}>234</Text>
          <Text style={styles.footerLabel}>Checked In</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerStat}>
          <Text style={styles.footerValue}>108</Text>
          <Text style={styles.footerLabel}>Remaining</Text>
        </View>
      </View>
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
  flashBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scannerFrame: {
    width: 280,
    height: 280,
    position: 'relative',
    marginBottom: 32,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: COLORS.blue.brand,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.blue.brand,
    opacity: 0.5,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  testBtn: {
    backgroundColor: COLORS.blue.brand,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  testBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  successIcon: { marginBottom: 16 },
  resultTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginBottom: 24,
  },
  attendeeDetails: { width: '100%', marginBottom: 16 },
  attendeeName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  attendeeEmail: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  ticketInfo: {
    backgroundColor: COLORS.bg.primary,
    borderRadius: 12,
    padding: 16,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ticketLabel: { fontSize: 13, color: COLORS.text.tertiary },
  ticketValue: { fontSize: 13, fontWeight: '700', color: COLORS.text.primary },
  closeResultBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  footerStat: { flex: 1, alignItems: 'center' },
  footerValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  footerLabel: { fontSize: 12, color: COLORS.text.secondary },
  footerDivider: {
    width: 1,
    backgroundColor: COLORS.border.subtle,
    marginHorizontal: 20,
  },
});

export default QRScannerScreen;
