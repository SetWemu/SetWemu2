import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Share, Alert, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon, ShareNetworkIcon, DownloadSimpleIcon,
  UploadSimpleIcon, XCircleIcon, InfoIcon,
} from 'phosphor-react-native';
import QRCode from 'react-native-qrcode-svg';
import CameraRoll from '@react-native-camera-roll/camera-roll';

const C = {
  bg:    { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue:  { light: '#ADF3FF', soft: '#B8EEFF', mid: '#8DDFF5', deep: '#5DD5E8' },
  stub:  {
    bg:        '#B8EEFF',             // THE ONE COLOR — entire stub top + bottom
    text:      '#0A2A35',             // dark navy on light blue
    textMuted: 'rgba(10,42,53,0.50)',
    divider:   'rgba(10,42,53,0.12)',
  },
  text:   { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158', error: '#FF453A', warning: '#FFD60A',
};

const STATUS_CFG = {
  active:    { label: 'Valid Ticket', color: '#30D158', bg: 'rgba(48,209,88,0.22)'   },
  used:      { label: 'Used',         color: '#6B6B6B', bg: 'rgba(107,107,107,0.18)' },
  cancelled: { label: 'Cancelled',    color: '#FF453A', bg: 'rgba(255,69,58,0.22)'   },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const fmtPurchase = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const canCancel = (b) => {
  if (b.status === 'used' || b.status === 'cancelled') return false;
  if (new Date(b.event.date) < new Date()) return false;
  const p = (b.event.refund_policy || '').toLowerCase();
  return !p.includes('no refund') && !p.includes('non-refundable');
};

const Perf = () => (
  <View style={pf.row}>
    <View style={[pf.notch, { left: -13 }]} />
    <View style={pf.dash} />
    <View style={[pf.notch, { right: -13 }]} />
  </View>
);
const pf = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  notch: { position: 'absolute', width: 26, height: 26, borderRadius: 13, backgroundColor: C.bg.primary, zIndex: 2 },
  dash:  { flex: 1, borderTopWidth: 1.5, borderColor: C.stub.divider, borderStyle: 'dashed', marginHorizontal: 6 },
});

const Row = ({ label, value, accent, link, onPress }) => (
  <View style={dr.wrap}>
    <Text style={dr.label}>{label}</Text>
    {link
      ? <TouchableOpacity onPress={onPress}><Text style={[dr.val, { color: C.blue.light }]}>{value}</Text></TouchableOpacity>
      : <Text style={[dr.val, accent && { color: C.blue.light, fontWeight: '800' }]}>{value}</Text>}
  </View>
);
const dr = StyleSheet.create({
  wrap:  { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: C.border.subtle },
  label: { fontSize: 13, color: C.text.secondary, flex: 1 },
  val:   { fontSize: 13, color: C.text.primary, fontWeight: '600', flex: 2, textAlign: 'right' },
});

const CancelModal = ({ visible, onConfirm, onDismiss, policy }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
    <View style={cm.overlay}>
      <View style={cm.sheet}>
        <View style={cm.handle} />
        <Text style={cm.title}>Cancel Ticket?</Text>
        <Text style={cm.body}>This cannot be undone.</Text>
        <View style={cm.policyBox}>
          <Text style={cm.policyLabel}>Refund Policy</Text>
          <Text style={cm.policyText}>{policy || 'Contact organizer for refund details.'}</Text>
        </View>
        <View style={cm.btns}>
          <TouchableOpacity style={cm.keepBtn} onPress={onDismiss} activeOpacity={0.8}>
            <Text style={cm.keepTxt}>Keep Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cm.cancelBtn} onPress={onConfirm} activeOpacity={0.8}>
            <Text style={cm.cancelTxt}>Yes, Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
const cm = StyleSheet.create({
  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  sheet:      { backgroundColor: C.bg.elevated, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 44 },
  handle:     { width: 36, height: 4, borderRadius: 2, backgroundColor: C.border.light, alignSelf: 'center', marginBottom: 20 },
  title:      { fontSize: 20, fontWeight: '800', color: C.text.primary, textAlign: 'center', marginBottom: 8 },
  body:       { fontSize: 13, color: C.text.secondary, textAlign: 'center', marginBottom: 16 },
  policyBox:  { backgroundColor: C.bg.card, borderRadius: 12, padding: 14, marginBottom: 24, borderLeftWidth: 3, borderLeftColor: C.blue.mid },
  policyLabel:{ fontSize: 10, fontWeight: '700', color: C.blue.mid, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 },
  policyText: { fontSize: 13, color: C.text.secondary, lineHeight: 19 },
  btns:       { flexDirection: 'row', gap: 10 },
  keepBtn:    { flex: 1, paddingVertical: 15, borderRadius: 14, backgroundColor: C.bg.card, alignItems: 'center' },
  keepTxt:    { fontSize: 15, fontWeight: '700', color: C.text.primary },
  cancelBtn:  { flex: 1, paddingVertical: 15, borderRadius: 14, backgroundColor: C.error, alignItems: 'center' },
  cancelTxt:  { fontSize: 15, fontWeight: '700', color: '#fff' },
});

const TicketDetailScreen = ({ route, navigation }) => {
  const { booking } = route.params;
  const [showCancel, setShowCancel]   = useState(false);
  const [cancelling, setCancelling]   = useState(false);
  const qrRef = useRef(null);

  const cfg         = STATUS_CFG[booking.status] || STATUS_CFG.used;
  const cancellable = canCancel(booking);
  const qrValue     = booking.qr_code || `SETWEMU-${booking.id}`;

  const handleShare = async () => {
    try {
      await Share.share({
        title:   `Ticket – ${booking.event.title}`,
        message: `🎟  SetWemu Ticket\n\nEvent: ${booking.event.title}\nDate: ${fmt(booking.event.date)}\nTime: ${booking.event.time}\nLocation: ${booking.event.location}\nTicket: ${booking.ticket.type} × ${booking.quantity}\nTotal: LKR ${booking.total_price.toLocaleString()}\nID: #${booking.id.slice(0, 10).toUpperCase()}`,
      });
    } catch { Alert.alert('Error', 'Could not share ticket.'); }
  };

  const handleSaveQR = () => {
    if (!qrRef.current) { Alert.alert('Error', 'QR not ready.'); return; }
    qrRef.current.toDataURL(async (data) => {
      try {
        const RNFS = require('react-native-fs');
        const path = `${RNFS.CachesDirectoryPath}/ticket_${booking.id}.png`;
        await RNFS.writeFile(path, data, 'base64');
        await CameraRoll.save(`file://${path}`, { type: 'photo' });
        Alert.alert('Saved!', 'QR code saved to your photos.');
      } catch {
        Alert.alert('One more step', 'Run: npm install react-native-fs && cd ios && pod install');
      }
    });
  };

  const handleCancelConfirm = async () => {
    setShowCancel(false);
    setCancelling(true);
    try {
      // await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', booking.id)
      await new Promise((r) => setTimeout(r, 900));
      Alert.alert('Cancelled', 'Your ticket has been cancelled.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch { Alert.alert('Error', 'Could not cancel. Try again.'); }
    finally  { setCancelling(false); }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg.primary} />

      <View style={s.nav}>
        <TouchableOpacity style={s.navBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.navTitle}>My Ticket</Text>
        <TouchableOpacity style={s.navBtn} onPress={handleShare} activeOpacity={0.8}>
          <ShareNetworkIcon size={18} color={C.text.primary} weight="regular" />
        </TouchableOpacity>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>

            TICKET STUB — SINGLE COLOR #B8EEFF
        <View style={s.stub}>
          {/* TOP — event info */}
          <View style={s.stubSection}>
            <View style={[s.statusBadge, { backgroundColor: cfg.bg }]}>
              <Text style={[s.statusText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
            <Text style={s.stubTitle}>{booking.event.title}</Text>
            <View style={s.grid}>
              <View style={s.gridCell}>
                <Text style={s.gridLabel}>Date</Text>
                <Text style={s.gridValue}>{fmt(booking.event.date)}</Text>
              </View>
              <View style={[s.gridCell, s.gridCellR]}>
                <Text style={s.gridLabel}>Time</Text>
                <Text style={s.gridValue}>{booking.event.time}</Text>
              </View>
            </View>
            <View style={s.grid}>
              <View style={s.gridCell}>
                <Text style={s.gridLabel}>Location</Text>
                <Text style={s.gridValue}>{booking.event.location}</Text>
              </View>
              <View style={[s.gridCell, s.gridCellR]}>
                <Text style={s.gridLabel}>Ticket</Text>
                <Text style={s.gridValue}>{booking.ticket.type}</Text>
              </View>
            </View>
            <View style={s.grid}>
              <View style={s.gridCell}>
                <Text style={s.gridLabel}>Qty</Text>
                <Text style={s.gridValue}>× {booking.quantity}</Text>
              </View>
              <View style={[s.gridCell, s.gridCellR]}>
                <Text style={s.gridLabel}>Order ID</Text>
                <Text style={s.gridValue}>#{booking.id.slice(0, 8).toUpperCase()}</Text>
              </View>
            </View>
          </View>

          <Perf />

          {/* BOTTOM — QR code */}
          <View style={[s.stubSection, { alignItems: 'center', paddingTop: 20 }]}>
            <View style={s.qrWrap}>
              <QRCode
                value={qrValue}
                size={172}
                color="#0A2A35"
                backgroundColor="transparent"
                getRef={(ref) => { qrRef.current = ref; }}
              />
            </View>
            <Text style={s.scanHint}>Scan at entry</Text>
            <Text style={s.bookingId}>#{booking.id.slice(0, 16).toUpperCase()}</Text>
            <View style={s.stubActions}>
              <TouchableOpacity style={s.stubActionBtn} onPress={handleSaveQR} activeOpacity={0.8}>
                <DownloadSimpleIcon size={17} color={C.stub.text} weight="bold" />
                <Text style={s.stubActionTxt}>Save QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.stubActionBtn} onPress={handleShare} activeOpacity={0.8}>
                <UploadSimpleIcon size={17} color={C.stub.text} weight="regular" />
                <Text style={s.stubActionTxt}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Booking Details</Text>
          <Row label="Total Paid"       value={`LKR ${booking.total_price.toLocaleString()}`} accent />
          <Row label="Price per Ticket" value={`LKR ${booking.ticket.price.toLocaleString()}`} />
          <Row label="Purchase Date"    value={fmtPurchase(booking.purchase_date)} />
          <Row label="Full Address"     value={booking.event.full_address || booking.event.location} />
          <Row label="View on Map"      value="Open Google Maps →" link onPress={() => Alert.alert('Maps', 'Coming soon.')} />
          {booking.event.refund_policy && (
            <View style={s.policyBox}>
              <Text style={s.policyLabel}>Refund Policy</Text>
              <Text style={s.policyTxt}>{booking.event.refund_policy}</Text>
            </View>
          )}
          {!cancellable && booking.status === 'active' && (
            <View style={s.noticeBox}>
              <InfoIcon size={13} color={C.warning} />
              <Text style={s.noticeTxt}>  Not eligible for cancellation per refund policy.</Text>
            </View>
          )}
        </View>

        <View style={s.actions}>
          <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('EventDetail', { eventId: booking.event_id })} activeOpacity={0.85}>
            <Text style={s.primaryBtnTxt}>View Event</Text>
          </TouchableOpacity>
          <View style={s.secondaryRow}>
            <TouchableOpacity style={s.secondaryBtn} onPress={handleShare} activeOpacity={0.85}>
              <ShareNetworkIcon size={15} color={C.blue.light} weight="regular" />
              <Text style={s.secondaryBtnTxt}>Share</Text>
            </TouchableOpacity>
            {cancellable && (
              <TouchableOpacity style={[s.dangerBtn, cancelling && { opacity: 0.5 }]} onPress={() => setShowCancel(true)} activeOpacity={0.85} disabled={cancelling}>
                <XCircleIcon size={15} color={C.error} weight="regular" />
                <Text style={s.dangerBtnTxt}>{cancelling ? 'Cancelling…' : 'Cancel'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ height: 48 }} />
      </ScrollView>

      <CancelModal visible={showCancel} onConfirm={handleCancelConfirm} onDismiss={() => setShowCancel(false)} policy={booking.event.refund_policy} />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingTop: 16 },

  nav:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 12 },
  navBtn:   { width: 38, height: 38, borderRadius: 19, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  navTitle: { fontSize: 17, fontWeight: '700', color: C.text.primary },

  stub: {
    backgroundColor: C.stub.bg,   // #B8EEFF — one color, full stub
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#5DD5E8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.30,
    shadowRadius: 20,
    elevation: 10,
  },
  stubSection: { padding: 22 },

  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 14 },
  statusText:  { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
  stubTitle:   { fontSize: 21, fontWeight: '900', color: C.stub.text, lineHeight: 27, marginBottom: 18, letterSpacing: -0.3 },

  grid:      { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.stub.divider, paddingTop: 10, marginBottom: 6, gap: 10 },
  gridCell:  { flex: 1, paddingBottom: 4 },
  gridCellR: { paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: C.stub.divider },
  gridLabel: { fontSize: 10, color: C.stub.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  gridValue: { fontSize: 13, color: C.stub.text, fontWeight: '700', lineHeight: 17 },

  qrWrap: {
    backgroundColor: '#FFFFFF',   // white so QR scans correctly
    borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  scanHint:    { fontSize: 10, color: C.stub.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 4 },
  bookingId:   { fontSize: 10, color: C.stub.textMuted, letterSpacing: 2.5, fontWeight: '600', marginBottom: 16 },

  stubActions:   { flexDirection: 'row', gap: 10, width: '100%' },
  stubActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 11, borderRadius: 14, backgroundColor: 'rgba(10,42,53,0.12)', borderWidth: 1, borderColor: 'rgba(10,42,53,0.18)' },
  stubActionTxt: { fontSize: 13, fontWeight: '700', color: C.stub.text },

  card:      { backgroundColor: C.bg.card, borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: C.border.subtle },
  cardTitle: { fontSize: 15, fontWeight: '800', color: C.text.primary, marginBottom: 4 },
  policyBox: { marginTop: 12, backgroundColor: C.bg.elevated, borderRadius: 10, padding: 12, borderLeftWidth: 3, borderLeftColor: C.blue.mid },
  policyLabel:{ fontSize: 10, fontWeight: '700', color: C.blue.mid, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 },
  policyTxt: { fontSize: 12, color: C.text.secondary, lineHeight: 18 },
  noticeBox: { marginTop: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,214,10,0.10)', borderRadius: 10, padding: 12, borderLeftWidth: 3, borderLeftColor: C.warning },
  noticeTxt: { fontSize: 12, color: C.warning, lineHeight: 18, flex: 1 },

  actions:        { gap: 10 },
  primaryBtn:     { backgroundColor: C.blue.mid, borderRadius: 16, paddingVertical: 17, alignItems: 'center', shadowColor: C.blue.mid, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
  primaryBtnTxt:  { color: '#0A2A35', fontSize: 16, fontWeight: '800' },
  secondaryRow:   { flexDirection: 'row', gap: 10 },
  secondaryBtn:   { flex: 1, borderRadius: 16, paddingVertical: 15, alignItems: 'center', backgroundColor: C.bg.card, borderWidth: 1.5, borderColor: C.blue.mid, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  secondaryBtnTxt:{ color: C.blue.light, fontSize: 14, fontWeight: '700' },
  dangerBtn:      { flex: 1, borderRadius: 16, paddingVertical: 15, alignItems: 'center', backgroundColor: 'rgba(255,69,58,0.12)', borderWidth: 1.5, borderColor: C.error, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dangerBtnTxt:   { color: C.error, fontSize: 14, fontWeight: '700' },
});

export default TicketDetailScreen;