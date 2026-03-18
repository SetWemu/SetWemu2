import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MapPin,
  CalendarBlank,
  Clock,
  Tag,
  Users,
  Ticket,
  Question,
  ShareNetwork,
  Heart,
} from 'phosphor-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5', glow: 'rgba(173,243,255,0.10)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const EventPreviewScreen = ({ route, navigation }) => {
  // Get event data from CreateEvent form
  const { eventData } = route.params || {};
  const {
    title = 'Event Title Preview',
    description = 'Event description will appear here...',
    date = 'Select Date',
    time = 'Select Time',
    location = 'Event Location',
    tags = '',
    heroImage = null,
    galleryImages = [],
    tickets = [],
    faqs = [],
  } = eventData || {};

  const tagArray = tags
    ? tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    : [];

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero Image */}
      <View style={s.heroSection}>
        {heroImage ? (
          <Image source={{ uri: heroImage }} style={s.heroImage} />
        ) : (
          <View style={s.heroPlaceholder}>
            <Text style={s.heroPlaceholderText}>Event Cover Image</Text>
          </View>
        )}
        <View style={s.heroOverlay} />

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity
            style={s.headerBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color="#fff" weight="bold" />
          </TouchableOpacity>
          <View style={s.headerActions}>
            <TouchableOpacity style={s.headerBtn}>
              <ShareNetwork size={20} color="#fff" weight="bold" />
            </TouchableOpacity>
            <TouchableOpacity style={s.headerBtn}>
              <Heart size={20} color="#fff" weight="bold" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preview Badge */}
        <View style={s.previewBadge}>
          <Text style={s.previewBadgeText}>PREVIEW MODE</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Info */}
        <View style={s.content}>
          {/* Tags */}
          {tagArray.length > 0 && (
            <View style={s.tagsRow}>
              {tagArray.map((tag, index) => (
                <View key={index} style={s.tagBadge}>
                  <Tag size={12} color={C.blue.light} weight="bold" />
                  <Text style={s.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Title */}
          <Text style={s.title}>{title}</Text>

          {/* Meta Info */}
          <View style={s.metaSection}>
            <View style={s.metaRow}>
              <CalendarBlank size={18} color={C.blue.light} weight="fill" />
              <Text style={s.metaText}>{date}</Text>
            </View>
            <View style={s.metaRow}>
              <Clock size={18} color={C.blue.light} weight="bold" />
              <Text style={s.metaText}>{time}</Text>
            </View>
            <View style={s.metaRow}>
              <MapPin size={18} color={C.blue.light} weight="fill" />
              <Text style={s.metaText}>{location}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>About This Event</Text>
            <Text style={s.description}>{description}</Text>
          </View>

          {/* Tickets */}
          {tickets.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Tickets</Text>
              {tickets.map((ticket, index) => (
                <View key={index} style={s.ticketCard}>
                  <View style={s.ticketIcon}>
                    <Ticket size={20} color={C.blue.light} weight="bold" />
                  </View>
                  <View style={s.ticketInfo}>
                    <Text style={s.ticketType}>
                      {ticket.type || 'Ticket Type'}
                    </Text>
                    <Text style={s.ticketMeta}>
                      {ticket.quantity
                        ? `${ticket.quantity} available`
                        : 'Quantity not set'}
                    </Text>
                  </View>
                  <Text style={s.ticketPrice}>
                    {ticket.price ? `LKR ${ticket.price}` : 'Free'}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Event Gallery</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={s.gallery}
              >
                {galleryImages.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={s.galleryImage}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Frequently Asked Questions</Text>
              {faqs.map((faq, index) => (
                <View key={index} style={s.faqCard}>
                  <View style={s.faqHeader}>
                    <Question size={18} color={C.blue.light} weight="bold" />
                    <Text style={s.faqQuestion}>
                      {faq.question || 'Question'}
                    </Text>
                  </View>
                  <Text style={s.faqAnswer}>{faq.answer || 'Answer'}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={s.backButtonText}>Back to Editing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },

  // Hero
  heroSection: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: C.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    fontSize: 16,
    color: C.text.tertiary,
    fontWeight: '600',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  // Header
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  headerActions: { flexDirection: 'row', gap: 10 },

  // Preview Badge
  previewBadge: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: C.blue.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  previewBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#141416',
    letterSpacing: 1,
  },

  // Content
  content: { padding: 20 },

  // Tags
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.bg.elevated,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  tagText: { fontSize: 11, fontWeight: '700', color: C.blue.light },

  // Title
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: C.text.primary,
    marginBottom: 16,
    lineHeight: 32,
    letterSpacing: -0.5,
  },

  // Meta
  metaSection: { marginBottom: 20 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  metaText: { fontSize: 14, color: C.text.secondary, fontWeight: '600' },

  // Sections
  section: {
    marginBottom: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: C.border.subtle,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text.primary,
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  description: { fontSize: 15, color: C.text.secondary, lineHeight: 24 },

  // Tickets
  ticketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  ticketIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ticketInfo: { flex: 1 },
  ticketType: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text.primary,
    marginBottom: 4,
  },
  ticketMeta: { fontSize: 12, color: C.text.secondary },
  ticketPrice: { fontSize: 16, fontWeight: '900', color: C.blue.light },

  // Gallery
  gallery: { marginTop: 10 },
  galleryImage: { width: 200, height: 140, borderRadius: 12, marginRight: 10 },

  // FAQ
  faqCard: {
    backgroundColor: C.bg.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: C.text.primary,
  },
  faqAnswer: { fontSize: 13, color: C.text.secondary, lineHeight: 20 },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35,
    backgroundColor: C.bg.card,
    borderTopWidth: 1,
    borderTopColor: C.border.subtle,
  },
  backButton: {
    backgroundColor: C.bg.elevated,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border.light,
  },
  backButtonText: { fontSize: 15, fontWeight: '800', color: C.text.primary },
});

export default EventPreviewScreen;
