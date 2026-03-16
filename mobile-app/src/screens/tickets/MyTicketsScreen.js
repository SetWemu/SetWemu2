import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, RefreshControl, StatusBar, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarBlank, Ticket, QrCode, MapPin } from 'phosphor-react-native';

const C = {
  bg:       { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  teal:     { light: '#ADF3FF', mid: '#5DD5E8', brand: '#4CC1D4', deep: '#2A8FA0', glow: 'rgba(173,243,255,0.10)' },
  text:     { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', teal: '#ADF3FF' },
  border:   { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)', teal: 'rgba(173,243,255,0.20)' },
  success:  '#30D158',
  error:    '#FF453A',
  warning:  '#FFD60A',
};

// Swap out for real Supabase query when backend is ready:
// const { data } = await supabase
//   .from('bookings')
//   .select(`*, event:events(id,title,date,time,location,status), ticket:tickets(type,price)`)
//   .eq('user_id', user.id)
//   .order('created_at', { ascending: false })
const MOCK_BOOKINGS = [
  {
    id: 'b1', event_id: 'e1', ticket_id: 't1',
    quantity: 2, total_price: 3000, status: 'active',
    qr_code: 'QR_B1', purchase_date: '2026-02-01T10:00:00Z',
    event: {
      id: 'e1', title: 'Colombo Food & Music Festival',
      date: '2026-03-15T10:00:00Z', time: '10:00 AM - 8:00 PM',
      location: 'Galle Face Green, Colombo', status: 'upcoming',
      full_address: 'Galle Face Green, Colombo 03',
      refund_policy: 'Full refund up to 48 hours before the event',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    },
    ticket: { type: 'General', price: 1500 },
  },
  {
    id: 'b2', event_id: 'e2', ticket_id: 't2',
    quantity: 1, total_price: 5000, status: 'active',
    qr_code: 'QR_B2', purchase_date: '2026-02-05T14:30:00Z',
    event: {
      id: 'e2', title: 'TechTalk Sri Lanka 2026',
      date: '2026-04-20T09:00:00Z', time: '9:00 AM - 6:00 PM',
      location: 'BMICH, Colombo 7', status: 'upcoming',
      full_address: 'Bauddhaloka Mawatha, Colombo 07',
      refund_policy: 'No refunds after purchase',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    },
    ticket: { type: 'VIP', price: 5000 },
  },
  {
    id: 'b3', event_id: 'e3', ticket_id: 't3',
    quantity: 3, total_price: 2250, status: 'used',
    qr_code: 'QR_B3', purchase_date: '2025-11-10T09:00:00Z',
    event: {
      id: 'e3', title: 'Sunset Beach Party',
      date: '2025-12-31T18:00:00Z', time: '6:00 PM - 2:00 AM',
      location: 'Mount Lavinia Beach', status: 'past',
      full_address: 'Mount Lavinia Beach, Colombo',
      refund_policy: 'No refunds',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
    },
    ticket: { type: 'General', price: 750 },
  },
  {
    id: 'b4', event_id: 'e4', ticket_id: 't4',
    quantity: 2, total_price: 4000, status: 'cancelled',
    qr_code: 'QR_B4', purchase_date: '2025-10-01T11:00:00Z',
    event: {
      id: 'e4', title: 'Jazz Night at Barefoot',
      date: '2025-11-15T19:00:00Z', time: '7:00 PM - 11:00 PM',
      location: 'Barefoot Gallery, Colombo 3', status: 'past',
      full_address: '704 Galle Rd, Colombo 03',
      refund_policy: 'Full refund up to 7 days before event',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80',
    },
    ticket: { type: 'VIP', price: 2000 },
  },
];

const isPast = (b) => {
  const passed = new Date(b.event.date) < new Date();
  return passed || b.status === 'used' || b.status === 'cancelled';
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const STATUS = {
  active:    { label: 'Active',    ...{ bg: 'rgba(48,209,88,0.15)',   color: '#30D158' } },
  used:      { label: 'Used',      ...{ bg: 'rgba(171,171,171,0.15)', color: '#ABABAB' } },
  cancelled: { label: 'Cancelled', ...{ bg: 'rgba(255,69,58,0.15)',   color: '#FF453A' } },
};

const TicketCard = ({ booking, onPress }) => {
  const s = STATUS[booking.status] || STATUS.used;
  const past = isPast(booking);

  return (
    <TouchableOpacity
      style={[styles.card, past && styles.cardPast]}
      onPress={() => onPress(booking)}
      activeOpacity={0.8}
    >
      {/* Left: event image */}
      <View style={styles.imgWrap}>
        <Image source={{ uri: booking.event.image }} style={styles.img} resizeMode="cover" />
        {past && <View style={styles.imgDim} />}
        {/* Ticket type pill over image */}
        <View style={styles.typePill}>
          <Text style={styles.typePillText}>{booking.ticket.type}</Text>
        </View>
      </View>

      {/* Right: details */}
      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{booking.event.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
            <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.metaRow}>
          <CalendarBlank size={11} color={C.text.tertiary} weight="regular" />
          <Text style={styles.metaText}>{formatDate(booking.event.date)}</Text>
        </View>

        {/* Location */}
        <View style={styles.metaRow}>
          <MapPin size={11} color={C.text.tertiary} weight="regular" />
          <Text style={styles.metaText} numberOfLines={1}>{booking.event.location}</Text>
        </View>

        {/* Footer: qty × price + QR thumb */}
        <View style={styles.footer}>
          <Text style={styles.price}>LKR {booking.total_price.toLocaleString()}</Text>
          <View style={styles.rightFooter}>
            <Text style={styles.qty}>×{booking.quantity}</Text>
            <View style={styles.qrThumb}>
              <QrCode size={16} color={C.teal.brand} weight="regular" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EmptyState = ({ isActive }) => (
  <View style={styles.empty}>
    <View style={styles.emptyIconWrap}>
      <Text style={styles.emptyIconText}>{isActive ? '🎟' : '📋'}</Text>
    </View>
    <Text style={styles.emptyTitle}>{isActive ? 'No active tickets' : 'No past tickets'}</Text>
    <Text style={styles.emptySub}>
      {isActive
        ? "You haven't booked any upcoming events yet."
        : "Events you've attended will appear here."}
    </Text>
    {isActive && (
      <TouchableOpacity style={styles.emptyBtn} activeOpacity={0.8}>
        <Text style={styles.emptyBtnText}>Explore Events</Text>
      </TouchableOpacity>
    )}
  </View>
);

const MyTicketsScreen = ({ navigation }) => {
  const [tab, setTab] = useState('active');
  const [refreshing, setRefreshing] = useState(false);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const active = bookings.filter((b) => !isPast(b));
  const past   = bookings.filter((b) => isPast(b));
  const list   = tab === 'active' ? active : past;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: replace with Supabase fetch
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg.primary} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <Text style={styles.headerSub}>{active.length} active · {past.length} past</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabs}>
        {['active', 'past'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
            {/* Count badge */}
            {(t === 'active' ? active : past).length > 0 && (
              <View style={[styles.tabBadge, tab === t && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, tab === t && styles.tabBadgeTextActive]}>
                  {(t === 'active' ? active : past).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, list.length === 0 && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={C.teal.light}
            colors={[C.teal.brand]}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<EmptyState isActive={tab === 'active'} />}
        renderItem={({ item }) => (
          <TicketCard booking={item} onPress={(b) => navigation.navigate('TicketDetail', { booking: b })} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg.primary },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: C.text.primary, letterSpacing: -0.5 },
  headerSub:   { fontSize: 13, color: C.text.secondary, marginTop: 2 },

  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: C.bg.card,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: C.border.subtle,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 9,
    borderRadius: 10, gap: 6,
  },
  tabActive: { backgroundColor: C.bg.elevated },
  tabText:   { fontSize: 14, fontWeight: '600', color: C.text.secondary },
  tabTextActive: { color: C.teal.light, fontWeight: '700' },
  tabBadge: {
    backgroundColor: C.bg.elevated,
    borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2,
    minWidth: 22, alignItems: 'center',
  },
  tabBadgeActive:     { backgroundColor: C.teal.glow },
  tabBadgeText:       { fontSize: 11, fontWeight: '700', color: C.text.tertiary },
  tabBadgeTextActive: { color: C.teal.light },

  list:      { paddingHorizontal: 16, paddingBottom: 32, paddingTop: 2 },
  listEmpty: { flex: 1 },

  card: {
    flexDirection: 'row',
    backgroundColor: C.bg.card,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border.subtle,
    height: 96,            // ← fixed compact height
  },
  cardPast: { opacity: 0.6 },

  imgWrap: { width: 88, position: 'relative' },
  img:     { width: 88, height: '100%' },
  imgDim:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  typePill: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 6,
  },
  typePillText: { fontSize: 9, fontWeight: '700', color: C.teal.light, letterSpacing: 0.5 },

  content: { flex: 1, paddingHorizontal: 11, paddingVertical: 10, justifyContent: 'space-between' },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: {
    flex: 1, fontSize: 13, fontWeight: '700',
    color: C.text.primary, lineHeight: 17,
  },
  statusBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, flexShrink: 0 },
  statusText:  { fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 10 },
  metaText: { fontSize: 11, color: C.text.secondary, flex: 1 },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price:  { fontSize: 13, fontWeight: '800', color: C.teal.light },
  rightFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qty: { fontSize: 11, color: C.text.tertiary, fontWeight: '600' },
  qrThumb: {
    width: 28, height: 28,
    backgroundColor: C.bg.elevated,
    borderRadius: 5,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border.teal,
  },
  qrThumbText: { fontSize: 14, color: C.teal.brand },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 60 },
  emptyIconWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: C.bg.card,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1, borderColor: C.border.light,
  },
  emptyIconText: { fontSize: 36 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: C.text.primary, marginBottom: 8, textAlign: 'center' },
  emptySub:   { fontSize: 13, color: C.text.secondary, textAlign: 'center', lineHeight: 19, marginBottom: 24 },
  emptyBtn:   { backgroundColor: C.teal.brand, paddingVertical: 13, paddingHorizontal: 28, borderRadius: 12 },
  emptyBtnText: { color: '#141416', fontSize: 14, fontWeight: '800' },
});

export default MyTicketsScreen;