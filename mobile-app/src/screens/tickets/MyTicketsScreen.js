import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, RefreshControl, StatusBar, Image, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarBlank, Ticket, QrCode, MapPin } from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';

const C = {
  bg:       { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  teal:     { light: '#ADF3FF', mid: '#5DD5E8', brand: '#4CC1D4', deep: '#2A8FA0', glow: 'rgba(173,243,255,0.10)' },
  text:     { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', teal: '#ADF3FF' },
  border:   { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)', teal: 'rgba(173,243,255,0.20)' },
  success:  '#30D158',
  error:    '#FF453A',
  warning:  '#FFD60A',
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

const STATUS = {
  active:    { label: 'Active',    ...{ bg: 'rgba(48,209,88,0.15)',   color: '#30D158' } },
  used:      { label: 'Used',      ...{ bg: 'rgba(171,171,171,0.15)', color: '#ABABAB' } },
};

const TicketCard = ({ group, onPress }) => {
  // Determine status: "Used" if any ticket is used, otherwise "Active" if event is in the future
  const isAnyUsed = group.tickets.some(t => t.is_used);
  const eventDate = new Date(group.event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isPast = eventDate < today;
  const statusKey = (isAnyUsed || isPast) ? 'used' : 'active';
  const s = STATUS[statusKey];

  return (
    <TouchableOpacity
      style={[styles.card, isPast && styles.cardPast]}
      onPress={() => onPress(group)}
      activeOpacity={0.8}
    >
      <View style={styles.imgWrap}>
        <Image source={{ uri: group.event.image }} style={styles.img} resizeMode="cover" />
        {isPast && <View style={styles.imgDim} />}
        <View style={styles.typePill}>
          <Text style={styles.typePillText}>{group.tier.name.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{group.event.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
            <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <CalendarBlank size={11} color={C.text.tertiary} weight="regular" />
          <Text style={styles.metaText}>{formatDate(group.event.date)}</Text>
        </View>

        <View style={styles.metaRow}>
          <MapPin size={11} color={C.text.tertiary} weight="regular" />
          <Text style={styles.metaText} numberOfLines={1}>{group.event.location}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>LKR {group.tier.price.toLocaleString()}</Text>
          <View style={styles.rightFooter}>
            <Text style={styles.qty}>×{group.quantity}</Text>
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
  </View>
);

const MyTicketsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [tab, setTab] = useState('active');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ticketGroups, setTicketGroups] = useState({ active: [], past: [] });

  const fetchBookings = async () => {
    if (!user?.id) return;
    try {
      const response = await apiClient.get(`/bookings/user/${user.id}`);
      processBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const processBookings = (bookings) => {
    const groups = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!bookings || !Array.isArray(bookings)) return;

    bookings.forEach(booking => {
      if (!booking.tickets) return;
      booking.tickets.forEach(ticket => {
        const tier = ticket.ticket_tiers;
        // Supabase sometimes returns joins as an array or an object
        let event = tier?.events;
        if (Array.isArray(event)) event = event[0];
        
        if (!tier || !event) return;
        
        const key = `${event.id}_${tier.id}`;

        if (!groups[key]) {
          groups[key] = {
            id: key,
            event: event,
            tier: tier,
            quantity: 0,
            tickets: []
          };
        }
        groups[key].quantity += 1;
        groups[key].tickets.push({
          id: ticket.id,
          qr_code_key: ticket.qr_code_key,
          is_used: ticket.is_used
        });
      });
    });

    const flattened = Object.values(groups);
    const active = flattened.filter(g => new Date(g.event.date) >= today);
    const past = flattened.filter(g => new Date(g.event.date) < today);

    setTicketGroups({ active, past });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookings();
  }, []);

  const list = tab === 'active' ? ticketGroups.active : ticketGroups.past;

  if (loading) {
    return (
      <View style={[styles.safe, styles.center]}>
        <ActivityIndicator size="large" color={C.teal.light} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg.primary} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <Text style={styles.headerSub}>
          {ticketGroups.active.length} active · {ticketGroups.past.length} past
        </Text>
      </View>

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
            {(t === 'active' ? ticketGroups.active : ticketGroups.past).length > 0 && (
              <View style={[styles.tabBadge, tab === t && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, tab === t && styles.tabBadgeTextActive]}>
                  {(t === 'active' ? ticketGroups.active : ticketGroups.past).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

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
          <TicketCard group={item} onPress={(g) => navigation.navigate('TicketDetail', { group: g })} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg.primary },
  center: { justifyContent: 'center', alignItems: 'center' },

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
    height: 100,
  },
  cardPast: { opacity: 0.6 },

  imgWrap: { width: 90, position: 'relative' },
  img:     { width: 90, height: '100%' },
  imgDim:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  typePill: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 6,
  },
  typePillText: { fontSize: 9, fontWeight: '800', color: C.teal.light, letterSpacing: 0.5 },

  content: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'space-between' },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: {
    flex: 1, fontSize: 14, fontWeight: '700',
    color: C.text.primary, lineHeight: 18,
  },
  statusBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, flexShrink: 0 },
  statusText:  { fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: C.text.secondary, flex: 1 },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price:  { fontSize: 13, fontWeight: '800', color: C.teal.light },
  rightFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qty: { fontSize: 12, color: C.text.tertiary, fontWeight: '800' },
  qrThumb: {
    width: 28, height: 28,
    backgroundColor: C.bg.elevated,
    borderRadius: 5,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border.teal,
  },

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
});

export default MyTicketsScreen;
