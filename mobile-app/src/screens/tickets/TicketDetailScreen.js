import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Share, Alert, FlatList, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft, ShareNetwork, DownloadSimple,
  UploadSimple, Info, Ticket, ShieldCheck, MapPin
} from 'phosphor-react-native';
import QRCode from 'react-native-qrcode-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  bg:    { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue:  { light: '#ADF3FF', soft: '#B8EEFF', mid: '#8DDFF5', deep: '#5DD5E8' },
  stub:  {
    bg:        '#B8EEFF',             
    text:      '#0A2A35',             
    textMuted: 'rgba(10,42,53,0.50)', 
    divider:   'rgba(10,42,53,0.12)',
  },
  text:   { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
};

const formatDate = (d) => {
  if (!d) return 'N/A';
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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

const TicketDetailScreen = ({ route, navigation }) => {
  const { group } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleShare = async () => {
    try {
      await Share.share({
        title:   `Tickets – ${group.event.title}`,
        message: `🎟 SetWemu Tickets\nEvent: ${group.event.title}\nDate: ${formatDate(group.event.date)}\nQty: ${group.quantity}x ${group.tier.name}\nLocation: ${group.event.location}`,
      });
    } catch { Alert.alert('Error', 'Could not share tickets.'); }
  };

  const renderTicketStub = ({ item, index }) => {
    return (
      <View style={s.stubContainer}>
        <View style={s.stub}>
          {/* TOP — event info */}
          <View style={s.stubSection}>
            <View style={s.statusBadge}>
              <Text style={s.statusText}>{item.is_used ? 'USED' : 'VALID TICKET'}</Text>
            </View>
            <Text style={s.stubTitle}>{group.event.title}</Text>
            <View style={s.grid}>
              <View style={s.gridCell}>
                <Text style={s.gridLabel}>Date</Text>
                <Text style={s.gridValue}>{formatDate(group.event.date)}</Text>
              </View>
              <View style={[s.gridCell, s.gridCellR]}>
                <Text style={s.gridLabel}>Tier</Text>
                <Text style={s.gridValue}>{group.tier.name}</Text>
              </View>
            </View>
            <View style={s.grid}>
              <View style={s.gridCell}>
                <Text style={s.gridLabel}>Location</Text>
                <Text style={s.gridValue}>{group.event.location}</Text>
              </View>
              <View style={[s.gridCell, s.gridCellR]}>
                <Text style={s.gridLabel}>Ticket ID</Text>
                <Text style={s.gridValue}>#{item.id.substring(0, 8).toUpperCase()}</Text>
              </View>
            </View>
          </View>

          <Perf />

          {/* BOTTOM — QR code */}
          <View style={[s.stubSection, { alignItems: 'center', paddingTop: 20 }]}>
            <View style={s.qrWrap}>
              <QRCode
                value={item.qr_code_key || 'SETWEMU-TICKET-' + item.id}
                size={160}
                color="#0A2A35"
                backgroundColor="transparent"
              />
            </View>
            <Text style={s.scanHint}>Scan at entry</Text>
            <Text style={s.bookingId}>Ticket {index + 1} of {group.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg.primary} />

      <View style={s.nav}>
        <TouchableOpacity style={s.navBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.navTitle}>Ticket Details</Text>
        <TouchableOpacity style={s.navBtn} onPress={handleShare} activeOpacity={0.8}>
          <ShareNetwork size={18} color={C.text.primary} weight="regular" />
        </TouchableOpacity>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <FlatList
          data={group.tickets}
          renderItem={renderTicketStub}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setActiveIndex(index);
          }}
        />

        {group.quantity > 1 && (
          <View style={s.pagination}>
            {group.tickets.map((_, i) => (
              <View key={i} style={[s.dot, i === activeIndex && s.dotActive]} />
            ))}
          </View>
        )}

        <View style={s.detailsCard}>
          <Text style={s.cardTitle}>Order Summary</Text>
          <DetailRow label="Event Name" value={group.event.title} />
          <DetailRow label="Event Date" value={formatDate(group.event.date)} />
          <DetailRow label="Location" value={group.event.location} />
          <DetailRow label="Tier" value={group.tier.name} />
          <DetailRow label="Quantity" value={`${group.quantity} Tickets`} />
          <DetailRow label="Price per Ticket" value={`LKR ${group.tier.price.toLocaleString()}`} />
          <DetailRow label="Total Value" value={`LKR ${(group.tier.price * group.quantity).toLocaleString()}`} accent />
        </View>

        <View style={s.actions}>
          <TouchableOpacity 
            style={s.primaryBtn} 
            onPress={() => navigation.navigate('EventDetail', { eventId: group.event.id })} 
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnTxt}>View Event Page</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value, accent }) => (
  <View style={dr.wrap}>
    <Text style={dr.label}>{label}</Text>
    <Text style={[dr.val, accent && { color: C.blue.light, fontWeight: '800' }]}>{value}</Text>
  </View>
);

const dr = StyleSheet.create({
  wrap:  { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border.subtle },
  label: { fontSize: 13, color: C.text.secondary },
  val:   { fontSize: 13, color: C.text.primary, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg.primary },
  scroll: { flex: 1 },
  
  nav:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 12 },
  navBtn:   { width: 38, height: 38, borderRadius: 19, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  navTitle: { fontSize: 17, fontWeight: '700', color: C.text.primary },

  stubContainer: { width: SCREEN_WIDTH, paddingHorizontal: 18, paddingTop: 10 },
  stub: {
    backgroundColor: C.stub.bg,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#5DD5E8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.30,
    shadowRadius: 20,
    elevation: 10,
  },
  stubSection: { padding: 22 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: 'rgba(10,42,53,0.1)', marginBottom: 14 },
  statusText:  { fontSize: 10, fontWeight: '800', color: C.stub.text, letterSpacing: 0.8 },
  stubTitle:   { fontSize: 22, fontWeight: '900', color: C.stub.text, lineHeight: 28, marginBottom: 18 },

  grid:      { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.stub.divider, paddingTop: 12, marginBottom: 8 },
  gridCell:  { flex: 1 },
  gridCellR: { paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: C.stub.divider },
  gridLabel: { fontSize: 10, color: C.stub.textMuted, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  gridValue: { fontSize: 13, color: C.stub.text, fontWeight: '800' },

  qrWrap: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 12 },
  scanHint: { fontSize: 10, color: C.stub.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  bookingId: { fontSize: 11, color: C.stub.text, fontWeight: '700', marginTop: 4 },

  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 20, marginBottom: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { width: 18, backgroundColor: C.blue.light },

  detailsCard: { backgroundColor: C.bg.card, borderRadius: 24, padding: 20, marginHorizontal: 18, marginTop: 20, borderWidth: 1, borderColor: C.border.subtle },
  cardTitle: { fontSize: 16, fontWeight: '800', color: C.text.primary, marginBottom: 6 },

  actions: { paddingHorizontal: 18, marginTop: 24 },
  primaryBtn: { backgroundColor: C.blue.mid, borderRadius: 18, paddingVertical: 18, alignItems: 'center' },
  primaryBtnTxt: { color: '#0A2A35', fontSize: 16, fontWeight: '900' },
});

export default TicketDetailScreen;