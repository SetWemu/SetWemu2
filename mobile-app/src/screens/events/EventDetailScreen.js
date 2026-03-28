import { useAuth } from '../../context/AuthContext';
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Image,
  Dimensions, ActivityIndicator, Linking, Alert
} from 'react-native';
import {
  ArrowLeft as ArrowLeftIcon, Heart as HeartIcon, 
  Star as StarIcon, CalendarBlank as CalendarBlankIcon,
  MapPin as MapPinIcon, Plus as PlusIcon, Minus as MinusIcon,
  Clock as ClockIcon,
} from 'phosphor-react-native';
import { API_URL } from '../../config/api';

const { width: W } = Dimensions.get('window');

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: {
    light: '#ADF3FF',
    mid: '#8DDFF5',
    glow: 'rgba(173,243,255,0.10)',
    border: 'rgba(173,243,255,0.22)',
  },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A', gold: '#FFD700',
};

// --- HELPERS ---
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Date TBD';
const fmtTime = (t) => {
  if (!t) return 'Time TBD';
  try {
    const [h, m] = t.split(':');
    const date = new Date();
    date.setHours(parseInt(h), parseInt(m));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    return t;
  }
};

const InfoRow = ({ IconComp, label, value }) => (
  <View style={ir.row}>
    <View style={ir.iconWrap}>
      <IconComp size={18} color={C.blue.light} />
    </View>
    <View style={ir.content}>
      <Text style={ir.label}>{label}</Text>
      <Text style={ir.value}>{value}</Text>
    </View>
  </View>
);

const ir = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  iconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: C.blue.glow, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.blue.border },
  content: { flex: 1 },
  label: { fontSize: 11, color: C.text.tertiary, fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  value: { fontSize: 14, color: C.text.primary, fontWeight: '600' },
});

// --- TICKET CARD COMPONENT ---
const TicketCard = ({ ticket, selected, quantity, onSelect, onQtyChange }) => {
  const isSoldOut = ticket.sold_count >= ticket.capacity;
  const isFree = !ticket.price || ticket.price <= 0;

  return (
    <TouchableOpacity
      style={[tc.card, selected && tc.cardSelected, isSoldOut && tc.cardDisabled]}
      onPress={() => !isSoldOut && onSelect(ticket)}
      activeOpacity={0.8}
      disabled={isSoldOut}
    >
      <View style={tc.left}>
        <Text style={tc.type}>{ticket.name || 'General Entry'}</Text>
        <Text style={[tc.avail, isSoldOut && { color: C.error }]}>
          {isSoldOut ? 'SOLD OUT' : `${ticket.capacity - ticket.sold_count} tickets left`}
        </Text>
        
        {selected && !isSoldOut && (
          <View style={tc.qtyRow}>
            <TouchableOpacity style={tc.qtyBtn} onPress={() => onQtyChange(Math.max(1, quantity - 1))}>
              <MinusIcon size={14} color={C.blue.light} weight="bold" />
            </TouchableOpacity>
            <Text style={tc.qtyNum}>{quantity}</Text>
            <TouchableOpacity style={tc.qtyBtn} onPress={() => onQtyChange(quantity + 1)}>
              <PlusIcon size={14} color={C.blue.light} weight="bold" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={tc.right}>
        <Text style={[tc.price, isSoldOut && { color: C.text.tertiary }]}>
          {isFree ? 'FREE' : `LKR ${ticket.price.toLocaleString()}`}
        </Text>
        <View style={[tc.radio, selected && tc.radioSelected]}>
          {selected && <View style={tc.radioInner} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const tc = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: C.bg.elevated, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: C.border.subtle },
  cardSelected: { borderColor: C.blue.mid, backgroundColor: C.blue.glow },
  cardDisabled: { opacity: 0.5, backgroundColor: '#1c1c1e' },
  left: { flex: 1 },
  type: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 4 },
  avail: { fontSize: 12, color: C.text.secondary },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  qtyBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.blue.border },
  qtyNum: { color: '#fff', fontWeight: '800', fontSize: 16, minWidth: 24, textAlign: 'center' },
  right: { alignItems: 'flex-end', justifyContent: 'space-between' },
  price: { fontSize: 18, fontWeight: '900', color: C.blue.light },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: C.border.light, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: C.blue.mid },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: C.blue.mid },
});

// --- MAIN SCREEN ---
const EventDetailScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const eventId = route?.params?.eventId;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/events/${eventId}`);
        const data = await res.json();
        setEvent(data);

        if (data.ticket_tiers?.length > 0) {
          const availableTier = data.ticket_tiers.find(t => t.sold_count < t.capacity);
          setSelectedTicket(availableTier || data.ticket_tiers[0]);
        }
        if (user?.id) {
          const favRes = await fetch(`${API_URL}/favorites/${user.id}`);
          const favs = await favRes.json();
          const isCurrentlyFav = favs.some(f => f.id === eventId);
          setIsFav(isCurrentlyFav);
        }
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    if (eventId) fetchEvent();
  }, [eventId, user?.id]);

  if (loading || !event) {
    return (
      <View style={[s.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={C.blue.light} />
      </View>
    );
  }

  const tickets = event.ticket_tiers || [];
  const totalPrice = selectedTicket ? (selectedTicket.price || 0) * quantity : 0;
  const handleToggleFavorite = async () => {
    if (!user) {
      Alert.alert("Login Required", "You need to be logged in to favorite events.");
      return;
    }

    const previousFavState = isFav;
    setIsFav(!isFav);

    try {
      const response = await fetch(`${API_URL}/favorites/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user.id, 
          event_id: eventId 
        }),
      });

      const result = await response.json();
      // Ensure state matches what the server says
      setIsFav(result.favorited);
    } catch (error) {
      console.error("Toggle Favorite Error:", error);
      setIsFav(previousFavState); // Revert on failure
      Alert.alert("Error", "Could not update favorites.");
    }
  };
  return (
    <View style={s.safe}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={s.floatNav}>
        <TouchableOpacity style={s.navBtn} onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={20} color="#fff" weight="bold" />
        </TouchableOpacity>
        
        {/* Logic: Call the backend function instead of just toggling state */}
        <TouchableOpacity style={s.navBtn} onPress={handleToggleFavorite}>
          <HeartIcon size={18} color={isFav ? C.error : '#fff'} weight={isFav ? 'fill' : 'regular'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={s.heroWrap}>
          <Image source={{ uri: event.image_url || event.image }} style={s.heroImg} resizeMode="cover" />
          <View style={s.heroFade} />
          <View style={s.dateBadge}>
            <Text style={s.dateMon}>{new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}</Text>
            <Text style={s.dateDay}>{new Date(event.date).getDate()}</Text>
          </View>
        </View>

        <View style={s.body}>
          <Text style={s.title}>{event.title}</Text>
          
          <View style={s.ratingRow}>
            <StarIcon size={13} color={C.gold} weight="fill" />
            <Text style={s.rating}>{event.rating || '4.8'}</Text>
            <View style={s.catPill}>
              <Text style={s.catTxt}>{event.category?.name || event.category || 'Event'}</Text>
            </View>
          </View>

          <View style={s.divider} />
          <InfoRow IconComp={CalendarBlankIcon} label="Date" value={fmtDate(event.date)} />
          <InfoRow IconComp={ClockIcon} label="Time" value={fmtTime(event.start_time)} />
          
          <TouchableOpacity 
            onPress={() => {
              if (event.google_maps_url) {
                Linking.openURL(event.google_maps_url).catch(err => {
                  console.error("Couldn't load page", err);
                  Alert.alert("Error", "Could not open Google Maps link.");
                });
              }
            }}
            disabled={!event.google_maps_url}
            activeOpacity={0.7}
          >
            <InfoRow 
              IconComp={MapPinIcon} 
              label="Location" 
              value={event.location || 'Location TBD'} 
            />
          </TouchableOpacity>
          <View style={s.divider} />

          <Text style={s.sectionTitle}>About Event</Text>
          <Text style={s.desc} numberOfLines={showFullDesc ? 0 : 4}>{event.description}</Text>
          <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
            <Text style={s.readMore}>{showFullDesc ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          <Text style={s.sectionTitle}>Select Tickets</Text>
          {tickets.map((t) => (
            <TicketCard 
              key={t.id} 
              ticket={t} 
              selected={selectedTicket?.id === t.id} 
              quantity={quantity}
              onSelect={(ticket) => { setSelectedTicket(ticket); setQuantity(1); }}
              onQtyChange={setQuantity}
            />
          ))}
        </View>
      </ScrollView>

      <View style={s.stickyBar}>
        <View>
          <Text style={s.totalLabel}>Total Price</Text>
          <Text style={s.totalValue}>
            {totalPrice > 0 ? `LKR ${totalPrice.toLocaleString()}` : 'FREE'}
          </Text>
        </View>
        <TouchableOpacity 
          style={[s.ctaBtn, (selectedTicket?.sold_count >= selectedTicket?.capacity) && { backgroundColor: C.text.tertiary }]} 
          disabled={selectedTicket?.sold_count >= selectedTicket?.capacity}
          onPress={() => navigation.navigate('Checkout', { event, ticket: selectedTicket, quantity, totalPrice })}
        >
          <Text style={s.ctaBtnTxt}>
            {selectedTicket?.sold_count >= selectedTicket?.capacity ? 'Sold Out' : (totalPrice > 0 ? 'Register Now' : 'Claim Free Ticket')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg.primary },
  scroll: { flex: 1 },
  floatNav: { position: 'absolute', top: 50, left: 16, right: 16, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between' },
  navBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  heroWrap: { height: 300 },
  heroImg: { width: W, height: 300 },
  heroFade: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: 'rgba(20,20,22,0.6)' },
  dateBadge: { position: 'absolute', bottom: 20, right: 20, backgroundColor: C.bg.card, padding: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border.light },
  dateMon: { color: C.text.secondary, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  dateDay: { color: C.blue.light, fontSize: 20, fontWeight: '900' },
  body: { padding: 20 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  rating: { color: C.gold, fontWeight: '800' },
  catPill: { backgroundColor: C.blue.glow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: C.blue.border },
  catTxt: { color: C.blue.light, fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: C.border.subtle, marginVertical: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  desc: { color: C.text.secondary, lineHeight: 22 },
  readMore: { color: C.blue.light, marginTop: 8, fontWeight: '700' },
  stickyBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, paddingBottom: 35, backgroundColor: C.bg.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border.subtle },
  totalLabel: { color: C.text.tertiary, fontSize: 12, textTransform: 'uppercase' },
  totalValue: { color: C.blue.light, fontSize: 22, fontWeight: '900' },
  ctaBtn: { backgroundColor: C.blue.mid, paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15 },
  ctaBtnTxt: { color: '#141416', fontWeight: '900', fontSize: 16 },
});

export default EventDetailScreen;