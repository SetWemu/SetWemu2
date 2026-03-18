import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const CATEGORIES = ['Music', 'Art', 'Food', 'Tech', 'Business', 'Wellness', 'Adventure', 'Fashion'];

const LiveMapScreen = () => {
  // --- STATE ---
  const [selectedCategories, setSelectedCategories] = useState(['Music']); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Animation value initialized off-screen
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Mock data for all pins
  const pins = [
    { id: 1, price: '$45', title: 'Summer Music Festival 2025', top: '30%', left: '25%' },
    { id: 2, price: 'Free', title: 'Community Yoga Session', top: '55%', left: '40%' },
    { id: 3, price: '$20', title: 'Tech Innovation Meetup', top: '75%', left: '55%' },
    { id: 4, price: '$35', title: 'Art Gallery Opening', top: '45%', left: '70%' },
  ];

  // --- LOGIC ---
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleCard = (show, eventData = null) => {
    if (show) {
      setSelectedEvent(eventData);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSelectedEvent(null));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. MAP AREA & PINS */}
      <View style={styles.mapPlaceholder}>
        {pins.map((pin) => (
          <TouchableOpacity
            key={pin.id}
            style={[styles.markerContainer, { top: pin.top, left: pin.left }]}
            onPress={() => toggleCard(true, pin)}
          >
            <View style={[
              styles.priceBubble, 
              selectedEvent?.id === pin.id && styles.activeBubble
            ]}>
              <Text style={styles.priceBubbleText}>{pin.price}</Text>
            </View>
            <Icon 
              name="location-sharp" 
              size={selectedEvent?.id === pin.id ? 40 : 32} 
              color={selectedEvent?.id === pin.id ? COLORS.blue.light : COLORS.blue.brand} 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. TOP OVERLAY: Search & Multi-Filters */}
      <View style={styles.topOverlay}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color={COLORS.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location..."
            placeholderTextColor={COLORS.text.tertiary}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategories.includes(cat);
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => toggleCategory(cat)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{cat}</Text>
                {isActive && <Icon name="close-circle" size={14} color={COLORS.blue.light} style={{marginLeft: 6}} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. SIDE CONTROLS: Zoom & Location */}
      <View style={styles.sideControls}>
        <TouchableOpacity style={styles.sideBtn}>
          <Icon name="navigate-outline" size={22} color={COLORS.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.zoomGroup}>
          <TouchableOpacity style={[styles.sideBtn, styles.zoomTop]}>
            <Icon name="add" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity style={[styles.sideBtn, styles.zoomBottom]}>
            <Icon name="remove" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. ANIMATED EVENT CARD */}
      <Animated.View 
        style={[
          styles.previewContainer, 
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        {selectedEvent && (
          <View style={styles.eventCard}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => toggleCard(false)}>
              <Icon name="close" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>

            <View style={styles.cardRow}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3' }} 
                style={styles.eventImage} 
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
                <Text style={styles.infoText}>• Oct 25, 2025</Text>
                <Text style={styles.infoText}>📍 Central Park, New York</Text>
                <Text style={styles.priceTag}>{selectedEvent.price}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Event</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  mapPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: '#1C1C1E' },
  
  // Top Navigation
  topOverlay: { position: 'absolute', top: 50, width: '100%', zIndex: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 30, 0.9)',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchInput: { flex: 1, color: COLORS.text.primary, marginLeft: 10, fontSize: 15 },
  filtersScroll: { marginTop: 12 },
  filtersContent: { paddingHorizontal: 20 },
  filterChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    backgroundColor: COLORS.bg.card, 
    borderRadius: 20, 
    marginRight: 8, 
    borderWidth: 1, 
    borderColor: COLORS.border.subtle 
  },
  filterChipActive: { borderColor: COLORS.blue.brand, backgroundColor: 'rgba(76, 193, 212, 0.15)' },
  filterText: { color: COLORS.text.secondary, fontWeight: '600', fontSize: 14 },
  filterTextActive: { color: COLORS.blue.light },

  // Markers
  markerContainer: { position: 'absolute', alignItems: 'center' },
  priceBubble: { backgroundColor: COLORS.bg.elevated, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: -2, zIndex: 1, borderWidth: 1, borderColor: COLORS.border.light },
  activeBubble: { backgroundColor: COLORS.blue.brand, borderColor: COLORS.blue.light },
  priceBubbleText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },

  // Side Controls (Bottom Right)
  sideControls: { position: 'absolute', bottom: 120, right: 20, alignItems: 'center', zIndex: 5 },
  sideBtn: { 
    width: 46, height: 46, 
    backgroundColor: COLORS.bg.elevated, 
    borderRadius: 23, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    marginBottom: 12
  },
  zoomGroup: { borderRadius: 23, overflow: 'hidden' },
  zoomTop: { marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  zoomBottom: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
  zoomDivider: { height: 1, backgroundColor: COLORS.border.light, width: '100%' },

  // Animated Preview Card
  previewContainer: { position: 'absolute', bottom: 40, width: '100%', paddingHorizontal: 16, zIndex: 20 },
  eventCard: { backgroundColor: COLORS.bg.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border.subtle },
  cardRow: { flexDirection: 'row', marginBottom: 16 },
  eventImage: { width: 80, height: 80, borderRadius: 16 },
  eventDetails: { flex: 1, marginLeft: 16 },
  eventTitle: { color: COLORS.text.primary, fontSize: 17, fontWeight: '800', marginBottom: 4 },
  infoText: { color: COLORS.text.secondary, fontSize: 12, marginBottom: 2 },
  priceTag: { color: COLORS.blue.brand, fontSize: 20, fontWeight: '900', marginTop: 4 },
  primaryButton: { backgroundColor: COLORS.blue.brand, borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: COLORS.text.inverse, fontWeight: '900', fontSize: 16 },
  closeBtn: { position: 'absolute', right: 15, top: 15, zIndex: 10 },
});

export default LiveMapScreen;