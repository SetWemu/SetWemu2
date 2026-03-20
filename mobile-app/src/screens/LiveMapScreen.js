import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure this is installed

const { width } = Dimensions.get('window');

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const CATEGORIES = ['Music', 'Art', 'Food', 'Tech', 'Business', 'Wellness', 'Fashion'];

const LiveMapScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Music');
  const [showPreview, setShowPreview] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. MOCK MAP BACKGROUND (Replace with API Map later) */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.gridLineH} />
        <View style={styles.gridLineV} />
        
        {/* Mock Custom Markers from Screenshot 7 & 8 */}
        <Marker price="$45" top="30%" left="25%" active />
        <Marker price="Free" top="55%" left="40%" />
        <Marker price="$20" top="70%" left="50%" />
        <Marker price="$35" top="72%" left="65%" />
        <Marker price="$15" top="75%" left="80%" />
      </View>

      {/* 2. TOP OVERLAY: Search & Categories */}
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
          style={styles.categoriesScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive
              ]}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. BOTTOM OVERLAY: Event Preview Card (Screenshot 8) */}
      {showPreview && (
        <View style={styles.previewContainer}>
          <View style={styles.eventCard}>
            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={() => setShowPreview(false)}
            >
              <Icon name="close" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>

            <View style={styles.cardRow}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3' }} 
                style={styles.eventImage} 
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Summer Music Festival 2025</Text>
                <View style={styles.infoRow}>
                  <Icon name="ellipse" size={6} color={COLORS.blue.brand} />
                  <Text style={styles.infoText}>Oct 25, 2025</Text>
                </View>
                <View style={styles.infoRow}>
                  <Icon name="location-sharp" size={12} color={COLORS.text.tertiary} />
                  <Text style={styles.infoText}>Central Park, New York</Text>
                </View>
                <Text style={styles.priceTag}>$45</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewEventBtn}>
              <Text style={styles.viewEventText}>View Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 4. FLOATING ACTION BUTTONS */}
      <View style={styles.floatingActions}>
        <TouchableOpacity style={styles.fab}>
          <Icon name="navigate-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Icon name="add" size={28} color={COLORS.text.inverse} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Sub-component for Custom Map Markers
const Marker = ({ price, top, left, active = false }) => (
  <View style={[styles.markerContainer, { top, left }]}>
    <View style={styles.priceBubble}>
      <Text style={styles.priceBubbleText}>{price}</Text>
    </View>
    <Icon 
      name="location-sharp" 
      size={active ? 40 : 30} 
      color={active ? COLORS.blue.light : COLORS.blue.brand} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  mapPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: '#202022', justifyContent: 'center', alignItems: 'center' },
  gridLineH: { width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.05)', position: 'absolute' },
  gridLineV: { height: '100%', width: 1, backgroundColor: 'rgba(255,255,255,0.05)', position: 'absolute' },
  
  // Top UI
  topOverlay: { position: 'absolute', top: 50, width: '100%', zIndex: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 24,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchInput: { flex: 1, color: COLORS.text.primary, marginLeft: 10, fontSize: 14 },
  categoriesScroll: { marginTop: 15 },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.bg.card,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  categoryChipActive: { borderColor: COLORS.blue.brand, backgroundColor: 'rgba(76, 193, 212, 0.1)' },
  categoryText: { color: COLORS.text.secondary, fontWeight: '600', fontSize: 14 },
  categoryTextActive: { color: COLORS.blue.brand },

  // Markers
  markerContainer: { position: 'absolute', alignItems: 'center' },
  priceBubble: { backgroundColor: COLORS.bg.elevated, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginBottom: -4, zIndex: 1, borderWidth: 1, borderColor: COLORS.blue.border },
  priceBubbleText: { color: COLORS.blue.light, fontSize: 10, fontWeight: 'bold' },

  // Bottom Preview Card
  previewContainer: { position: 'absolute', bottom: 40, width: '100%', paddingHorizontal: 20 },
  eventCard: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  eventImage: { width: 80, height: 80, borderRadius: 12 },
  eventDetails: { flex: 1, marginLeft: 15 },
  eventTitle: { color: COLORS.text.primary, fontSize: 16, fontWeight: '800', marginBottom: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  infoText: { color: COLORS.text.secondary, fontSize: 12, marginLeft: 6 },
  priceTag: { color: COLORS.blue.brand, fontSize: 18, fontWeight: '900', marginTop: 5 },
  viewEventBtn: {
    backgroundColor: COLORS.blue.brand,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  viewEventText: { color: COLORS.text.inverse, fontWeight: '900' },
  closeBtn: { position: 'absolute', right: 10, top: 10, zIndex: 5 },

  // FABs
  floatingActions: { position: 'absolute', right: 20, bottom: 180, gap: 15 },
  fab: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: COLORS.bg.elevated, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
});

export default LiveMapScreen;