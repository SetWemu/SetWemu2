import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Image,
  Dimensions, Linking, Alert,
} from 'react-native';
import {
  ArrowLeftIcon, ShareNetworkIcon,
  HeartIcon, StarIcon, CalendarBlankIcon,
  ClockIcon, MapPinIcon, TicketIcon,
  UserPlusIcon, UserCheckIcon, ChatCircleIcon,
  ImagesIcon, TagIcon, ArrowSquareOutIcon,
  ArrowRightIcon, PlusIcon, MinusIcon,
  CheckCircleIcon,
} from 'phosphor-react-native';

const { width: W } = Dimensions.get('window');

const C = {
  bg:    { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue:  {
    lightest: '#D6F9FF',
    light:    '#ADF3FF',
    soft:     '#B8EEFF',
    mid:      '#8DDFF5',
    deep:     '#5DD5E8',
    glow:     'rgba(173,243,255,0.10)',
    border:   'rgba(173,243,255,0.22)',
  },
  text:   { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158', error: '#FF453A', warning: '#FFD60A', gold: '#FFD700',
};

const MOCK_EVENT = {
  id: 'e1',
  title: 'Colombo Food & Music Festival',
  description: "Sri Lanka's biggest annual food and music celebration returns to Galle Face Green. Featuring 50+ food stalls from across the island, live performances by top local and international artists, and a dedicated kids zone. Come experience the best of Colombo's vibrant culture under the open sky.",
  category: 'Food & Dining',
  tags: ['Outdoor', 'Family-Friendly', 'Food', 'Music'],
  date: '2026-03-15T10:00:00Z',
  time: '10:00 AM – 8:00 PM',
  duration: '10 hours',
  location: 'Galle Face Green, Colombo',
  full_address: 'Galle Face Green, Galle Face, Colombo 00300',
  coordinates: { lat: 6.9271, lng: 79.8612 },
  status: 'upcoming',
  attendee_count: 2400,
  rating: 4.8,
  review_count: 312,
  refund_policy: 'Full refund up to 48 hours before the event.',
  host: {
    id: 'h1', full_name: 'Colombo Events Co.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    eventsHosted: 24, verified: true,
  },
  hero_images: [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  ],
  attendee_images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  ],
  gallery: {
    host: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80',
    ],
    attendee: [
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80',
    ],
  },
  tickets: [
    { id: 't1', type: 'General',  price: 1500, available: 150, description: 'Full-day access to all stages and food stalls.' },
    { id: 't2', type: 'VIP',      price: 4500, available: 12,  description: 'Front-row access, VIP lounge, complimentary drinks.' },
    { id: 't3', type: 'Student',  price: 800,  available: 60,  description: 'Valid student ID required at entry.' },
  ],
  faqs: [
    { q: 'Is there an age restriction?',   a: 'All ages welcome. Children under 5 enter free.' },
    { q: 'What is the refund policy?',     a: 'Full refund up to 48 hours before the event. No refunds after that.' },
    { q: 'Is parking available?',          a: 'Limited street parking. We recommend Uber or PickMe.' },
    { q: 'What should I wear?',            a: 'Smart casual. Comfortable shoes — it\'s a large outdoor venue.' },
    { q: 'Are pets allowed?',              a: 'No, pets are not permitted at this event.' },
  ],
};

const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const InfoRow = ({ IconComp, label, value, onPress }) => (
  <TouchableOpacity style={ir.row} onPress={onPress} activeOpacity={onPress ? 0.7 : 1} disabled={!onPress}>
    <View style={ir.iconWrap}>
      <IconComp size={18} color={C.blue.light} weight="regular" />
    </View>
    <View style={ir.content}>
      <Text style={ir.label}>{label}</Text>
      <Text style={[ir.value, onPress && { color: C.blue.light }]}>{value}</Text>
    </View>
    {onPress && <ArrowRightIcon size={16} color={C.text.tertiary} weight="regular" />}
  </TouchableOpacity>
);
const ir = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  iconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: C.blue.glow, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.blue.border },
  content:  { flex: 1 },
  label:    { fontSize: 11, color: C.text.tertiary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 },
  value:    { fontSize: 14, color: C.text.primary, fontWeight: '600' },
});

const TicketCard = ({ ticket, selected, onSelect }) => (
  <TouchableOpacity
    style={[tc.card, selected && tc.cardSelected]}
    onPress={() => onSelect(ticket)}
    activeOpacity={0.8}
  >
    <View style={tc.left}>
      <View style={tc.top}>
        <Text style={tc.type}>{ticket.type}</Text>
        {ticket.available < 20 && (
          <View style={tc.urgency}><Text style={tc.urgencyTxt}>Only {ticket.available} left</Text></View>
        )}
      </View>
      <Text style={tc.desc}>{ticket.description}</Text>
      <Text style={tc.avail}>{ticket.available} available</Text>
    </View>
    <View style={tc.right}>
      <Text style={tc.price}>LKR {ticket.price.toLocaleString()}</Text>
      <View style={[tc.radio, selected && tc.radioSelected]}>
        {selected && <View style={tc.radioInner} />}
      </View>
    </View>
  </TouchableOpacity>
);
const tc = StyleSheet.create({
  card:         { flexDirection: 'row', backgroundColor: C.bg.elevated, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: C.border.subtle },
  cardSelected: { borderColor: C.blue.mid, backgroundColor: C.blue.glow },
  left:  { flex: 1 },
  top:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  type:  { fontSize: 15, fontWeight: '800', color: C.text.primary },
  urgency:    { backgroundColor: 'rgba(255,69,58,0.15)', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  urgencyTxt: { fontSize: 10, fontWeight: '700', color: C.error },
  desc:  { fontSize: 12, color: C.text.secondary, lineHeight: 17, marginBottom: 4 },
  avail: { fontSize: 11, color: C.text.tertiary },
  right: { alignItems: 'flex-end', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '800', color: C.blue.light },
  radio:        { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.border.light, alignItems: 'center', justifyContent: 'center' },
  radioSelected:{ borderColor: C.blue.mid },
  radioInner:   { width: 10, height: 10, borderRadius: 5, backgroundColor: C.blue.mid },
});

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={fq.wrap}>
      <TouchableOpacity style={fq.row} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={fq.q}>{item.q}</Text>
        <Text style={[fq.chevron, open && { transform: [{ rotate: '90deg' }] }]}>›</Text>
      </TouchableOpacity>
      {open && <Text style={fq.a}>{item.a}</Text>}
    </View>
  );
};
const fq = StyleSheet.create({
  wrap:   { backgroundColor: C.bg.elevated, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: C.border.subtle, overflow: 'hidden' },
  row:    { flexDirection: 'row', alignItems: 'center', padding: 14 },
  q:      { flex: 1, fontSize: 14, fontWeight: '600', color: C.text.primary, lineHeight: 19 },
  chevron:{ fontSize: 22, color: C.text.tertiary },
  a:      { fontSize: 13, color: C.text.secondary, lineHeight: 19, paddingHorizontal: 14, paddingBottom: 14 },
});

const STitle = ({ title }) => (
  <Text style={{ fontSize: 17, fontWeight: '800', color: C.text.primary, marginBottom: 14, letterSpacing: -0.2 }}>
    {title}
  </Text>
);

const EventDetailScreen = ({ route, navigation }) => {
  const eventId = route?.params?.eventId;
  const event = MOCK_EVENT;

  const [galleryTab,      setGalleryTab]      = useState('host');
  const [selectedTicket,  setSelectedTicket]  = useState(event.tickets[0]);
  const [quantity,        setQuantity]        = useState(1);
  const [isFav,           setIsFav]           = useState(false);
  const [isFollowing,     setIsFollowing]     = useState(false);
  const [showFullDesc,    setShowFullDesc]     = useState(false);
  const [heroIdx,         setHeroIdx]         = useState(0);

  const isPast    = event.status === 'past';
  const isOngoing = event.status === 'ongoing';
  const images    = event.gallery[galleryTab] || [];
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  const handleCheckout = () => {
    if (!selectedTicket) { Alert.alert('Select a ticket type first'); return; }
    navigation.navigate('Checkout', { event, ticket: selectedTicket, quantity, totalPrice });
  };

  const handleMapPress = () => {
    const { lat, lng } = event.coordinates;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
  };

  return (
    <View style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Floating nav */}
      <View style={s.floatNav}>
        <TouchableOpacity style={s.navBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" weight="bold" />
        </TouchableOpacity>
        <View style={s.navRight}>
          <TouchableOpacity style={s.navBtn} onPress={() => setIsFav(!isFav)} activeOpacity={0.8}>
            <HeartIcon size={18} color={isFav ? C.error : '#fff'} weight={isFav ? 'fill' : 'regular'} />
          </TouchableOpacity>
          <TouchableOpacity style={s.navBtn} onPress={() => {}} activeOpacity={0.8}>
            <ShareNetworkIcon size={18} color="#fff" weight="regular" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Hero image */}
        <View style={s.heroWrap}>
          <Image source={{ uri: event.hero_images[heroIdx] }} style={s.heroImg} resizeMode="cover" />
          <View style={s.heroFade} />
          <View style={s.heroDots}>
            {event.hero_images.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setHeroIdx(i)}>
                <View style={[s.dot, i === heroIdx && s.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={s.dateBadge}>
            <Text style={s.dateMon}>{new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}</Text>
            <Text style={s.dateDay}>{new Date(event.date).getDate()}</Text>
          </View>
        </View>

        <View style={s.body}>

          {/* Title + rating */}
          <View style={s.titleRow}>
            <Text style={s.title}>{event.title}</Text>
            <TouchableOpacity style={s.favBtn} onPress={() => setIsFav(!isFav)}>
              <HeartIcon size={18} color={isFav ? C.error : C.text.secondary} weight={isFav ? 'fill' : 'regular'} />
            </TouchableOpacity>
          </View>

          <View style={s.ratingRow}>
            <StarIcon size={13} color={C.gold} weight="fill" />
            <Text style={s.rating}>{event.rating}</Text>
            <Text style={s.reviewCount}>({event.review_count} reviews)</Text>
            <View style={s.catPill}><Text style={s.catTxt}>{event.category}</Text></View>
          </View>

          <View style={s.tags}>
            {event.tags.map((t) => (
              <View key={t} style={s.tag}><Text style={s.tagTxt}>{t}</Text></View>
            ))}
          </View>

          {/* Attendees */}
          <View style={s.attendeeRow}>
            <View style={s.avatarStack}>
              {event.attendee_images.map((uri, i) => (
                <Image key={i} source={{ uri }} style={[s.avatar, { marginLeft: i > 0 ? -10 : 0, zIndex: 10 - i }]} />
              ))}
            </View>
            <Text style={s.attendeeTxt}>
              <Text style={{ color: C.blue.light, fontWeight: '800' }}>{event.attendee_count.toLocaleString()}+ </Text>
              {isPast ? 'attended' : 'attending'}
            </Text>
          </View>

          <View style={s.divider} />

          {/* Info rows */}
          <InfoRow IconComp={CalendarBlankIcon} label="Date"     value={fmtDate(event.date)} />
          <View style={s.miniDiv} />
          <InfoRow IconComp={ClockIcon}         label="Time"     value={event.time} />
          <View style={s.miniDiv} />
          <InfoRow IconComp={ClockIcon}         label="Duration" value={event.duration} />
          <View style={s.miniDiv} />
          <InfoRow IconComp={MapPinIcon}        label="Location" value={event.location} onPress={handleMapPress} />

          <View style={s.divider} />

          {/* About */}
          <STitle title="About This Event" />
          <Text style={s.desc} numberOfLines={showFullDesc ? undefined : 4}>{event.description}</Text>
          <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
            <Text style={s.readMore}>{showFullDesc ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Organizer */}
          <STitle title="Organizer" />
          <View style={s.hostCard}>
            <Image source={{ uri: event.host.avatar_url }} style={s.hostAvatar} />
            <View style={s.hostInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={s.hostName}>{event.host.full_name}</Text>
                {event.host.verified && (
                  <CheckCircleIcon size={16} color={C.blue.mid} weight="fill" />
                )}
              </View>
              <Text style={s.hostSub}>{event.host.eventsHosted} events hosted</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={[s.followBtn, isFollowing && s.followingBtn]}
                onPress={() => setIsFollowing(!isFollowing)}
                activeOpacity={0.8}
              >
                {isFollowing
                  ? <UserCheckIcon size={13} color={C.blue.light} weight="bold" />
                  : <UserPlusIcon  size={13} color="#141416"      weight="bold" />}
                <Text style={[s.followTxt, isFollowing && s.followingTxt]}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.chatBtn} activeOpacity={0.8}>
                <ChatCircleIcon size={18} color={C.text.secondary} weight="regular" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.divider} />

          {/* Location map */}
          <STitle title="Location" />
          <TouchableOpacity style={s.mapCard} onPress={handleMapPress} activeOpacity={0.85}>
            <MapPinIcon size={32} color={C.blue.mid} weight="fill" style={{ marginBottom: 8 }} />
            <Text style={s.mapName}>{event.location}</Text>
            <Text style={s.mapAddr}>{event.full_address}</Text>
            <View style={s.mapBtn}>
              <ArrowSquareOutIcon size={13} color={C.blue.light} weight="regular" />
              <Text style={s.mapBtnTxt}>Open in Maps</Text>
            </View>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Tickets */}
          {!isPast && (
            <>
              <STitle title="Select Tickets" />
              {event.tickets.map((t) => (
                <TicketCard key={t.id} ticket={t} selected={selectedTicket?.id === t.id} onSelect={setSelectedTicket} />
              ))}
              <View style={s.qtyRow}>
                <Text style={s.qtyLabel}>Quantity</Text>
                <View style={s.qtyCtrls}>
                  <TouchableOpacity style={s.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                    <MinusIcon size={16} color={C.blue.light} weight="bold" />
                  </TouchableOpacity>
                  <Text style={s.qtyNum}>{quantity}</Text>
                  <TouchableOpacity style={s.qtyBtn} onPress={() => setQuantity(Math.min(selectedTicket?.available || 10, quantity + 1))}>
                    <PlusIcon size={16} color={C.blue.light} weight="bold" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={s.divider} />
            </>
          )}

          {/* FAQ */}
          <STitle title="FAQ" />
          {event.faqs.map((item, i) => <FaqItem key={i} item={item} />)}

          <View style={s.divider} />

          {/* Gallery — at the bottom */}
          <STitle title="Photos" />
          <View style={s.galleryTabs}>
            {[
              { key: 'host',     label: 'Official', IconComp: ImagesIcon },
              { key: 'attendee', label: 'Tagged',   IconComp: TagIcon    },
            ].map(({ key, label, IconComp }) => (
              <TouchableOpacity
                key={key}
                style={[s.galleryTab, galleryTab === key && s.galleryTabActive]}
                onPress={() => setGalleryTab(key)}
                activeOpacity={0.8}
              >
                <IconComp size={14} color={galleryTab === key ? C.blue.light : C.text.secondary} weight="regular" />
                <Text style={[s.galleryTabTxt, galleryTab === key && s.galleryTabTxtActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={s.galleryGrid}>
            {images.map((uri, i) => (
              <TouchableOpacity key={i} style={s.galleryItem} activeOpacity={0.85}>
                <Image source={{ uri }} style={s.galleryImg} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Sticky CTA */}
      {!isPast && (
        <View style={s.stickyBar}>
          <View>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValue}>LKR {totalPrice.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={s.ctaBtn} onPress={handleCheckout} activeOpacity={0.85}>
            <Text style={s.ctaBtnTxt}>{isOngoing ? 'Buy Now' : 'Continue'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.bg.primary },
  scroll: { flex: 1 },

  floatNav: { position: 'absolute', top: 44, left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  navRight: { flexDirection: 'row', gap: 8 },
  navBtn:   { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(20,20,22,0.65)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },

  heroWrap: { height: 280, position: 'relative' },
  heroImg:  { width: W, height: 280 },
  heroFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: 'rgba(20,20,22,0.65)' },
  heroDots: { position: 'absolute', bottom: 14, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  dot:       { width: 6,  height: 6,  borderRadius: 3,  backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 18, height: 6,  borderRadius: 3,  backgroundColor: C.blue.light },
  dateBadge: { position: 'absolute', top: 70, right: 16, backgroundColor: 'rgba(28,28,30,0.90)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: C.border.light },
  dateMon:   { fontSize: 11, color: C.text.secondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  dateDay:   { fontSize: 22, fontWeight: '900', color: C.blue.light, lineHeight: 26 },

  body:    { paddingHorizontal: 18, paddingTop: 18 },
  divider: { height: 1, backgroundColor: C.border.subtle, marginVertical: 20 },
  miniDiv: { height: 1, backgroundColor: C.border.subtle, marginLeft: 50 },

  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  title:    { flex: 1, fontSize: 24, fontWeight: '900', color: C.text.primary, lineHeight: 30, letterSpacing: -0.4 },
  favBtn:   { width: 38, height: 38, borderRadius: 19, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },

  ratingRow:   { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  rating:      { fontSize: 14, fontWeight: '800', color: C.gold },
  reviewCount: { fontSize: 12, color: C.text.tertiary },
  catPill:     { backgroundColor: C.blue.glow, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: C.blue.border },
  catTxt:      { fontSize: 11, fontWeight: '700', color: C.blue.light },
  tags:        { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  tag:         { backgroundColor: C.bg.elevated, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: C.border.light },
  tagTxt:      { fontSize: 11, color: C.text.secondary, fontWeight: '500' },

  attendeeRow:  { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  avatarStack:  { flexDirection: 'row' },
  avatar:       { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: C.bg.primary },
  attendeeTxt:  { fontSize: 13, color: C.text.secondary },

  desc:     { fontSize: 14, color: C.text.secondary, lineHeight: 22, marginBottom: 8 },
  readMore: { fontSize: 13, color: C.blue.light, fontWeight: '700', marginBottom: 4 },

  hostCard:   { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg.card, borderRadius: 16, padding: 14, gap: 12, borderWidth: 1, borderColor: C.border.subtle },
  hostAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: C.blue.mid },
  hostInfo:   { flex: 1 },
  hostName:   { fontSize: 15, fontWeight: '800', color: C.text.primary },
  hostSub:    { fontSize: 12, color: C.text.secondary, marginTop: 2 },
  followBtn:  { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: C.blue.mid, flexDirection: 'row', alignItems: 'center', gap: 4 },
  followingBtn:{ backgroundColor: C.bg.elevated, borderWidth: 1, borderColor: C.blue.mid },
  followTxt:  { fontSize: 12, fontWeight: '700', color: '#141416' },
  followingTxt:{ color: C.blue.light },
  chatBtn:    { width: 34, height: 34, borderRadius: 17, backgroundColor: C.bg.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },

  mapCard:   { backgroundColor: C.bg.card, borderRadius: 16, height: 150, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.subtle },
  mapName:   { fontSize: 14, fontWeight: '700', color: C.text.primary, marginBottom: 4 },
  mapAddr:   { fontSize: 12, color: C.text.secondary, textAlign: 'center', paddingHorizontal: 20, marginBottom: 8 },
  mapBtn:    { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: C.blue.glow, borderWidth: 1, borderColor: C.blue.border },
  mapBtnTxt: { fontSize: 12, color: C.blue.light, fontWeight: '700' },

  qtyRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  qtyLabel: { fontSize: 15, fontWeight: '700', color: C.text.primary },
  qtyCtrls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn:   { width: 36, height: 36, borderRadius: 18, backgroundColor: C.bg.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  qtyNum:   { fontSize: 20, fontWeight: '800', color: C.text.primary, minWidth: 28, textAlign: 'center' },

  galleryTabs:       { flexDirection: 'row', gap: 8, marginBottom: 12 },
  galleryTab:        { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.bg.elevated, borderWidth: 1, borderColor: C.border.subtle },
  galleryTabActive:  { borderColor: C.blue.mid, backgroundColor: C.blue.glow },
  galleryTabTxt:     { fontSize: 13, fontWeight: '600', color: C.text.secondary },
  galleryTabTxtActive:{ color: C.blue.light },
  galleryGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
  galleryItem:       { width: (W - 36 - 6) / 3, height: (W - 36 - 6) / 3, borderRadius: 8, overflow: 'hidden' },
  galleryImg:        { width: '100%', height: '100%' },

  stickyBar:  { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg.card, paddingHorizontal: 18, paddingVertical: 14, paddingBottom: 28, borderTopWidth: 1, borderTopColor: C.border.subtle, gap: 14 },
  totalLabel: { fontSize: 11, color: C.text.secondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  totalValue: { fontSize: 20, fontWeight: '900', color: C.blue.light },
  ctaBtn:     { flex: 2, backgroundColor: C.blue.mid, borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: C.blue.mid, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
  ctaBtnTxt:  { fontSize: 16, fontWeight: '900', color: '#141416', letterSpacing: 0.3 },
});

export default EventDetailScreen;