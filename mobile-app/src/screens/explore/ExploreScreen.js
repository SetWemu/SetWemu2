import apiClient from '../../api/apiClient';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  Fire,
  HandSwipeRight,
} from 'phosphor-react-native';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5', glow: 'rgba(173,243,255,0.10)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const SEARCH_SUGGESTIONS = [
  'Tech Conference',
  'Jazz Night',
  'Beach Party',
  'Food Festival',
  'Comedy Show',
  'Art Exhibition',
  'Startup Event',
  'Music Concert',
];

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // FIX: Added missing state definitions
  const [realEvents, setRealEvents] = useState({ today: [], weekend: [], week: [], trending: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Using apiClient to ensure the JWT interceptor is used
        const response = await apiClient.get('/events');
        const data = response.data; 
  
        console.log("API RESPONSE", data);
  
        // Organize data for the UI categories
        setRealEvents({
          today: Array.isArray(data) ? data.slice(0, 3) : [],
          weekend: Array.isArray(data) ? data.slice(3, 6) : [],
          week: Array.isArray(data) ? data.slice(6, 9) : [],
          trending: Array.isArray(data) ? data : [],
        });
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = SEARCH_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle Search logic
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery });
      setShowSuggestions(false);
    }
  };

  const handleSuggestionTap = suggestion => {
    setSearchQuery(suggestion);
    navigation.navigate('SearchResults', { query: suggestion });
    setShowSuggestions(false);
  };

  // Helper Component: Event Card
  const EventCard = ({ event }) => (
    <TouchableOpacity
      style={s.eventCard}
      onPress={() =>
        navigation.navigate('EventDetail', { eventId: event.id, event })
      }
      activeOpacity={0.8}
    >
      <Image source={{ uri: event.image_url || event.image }} style={s.eventImage} />
      <View style={s.eventOverlay}>
        <View style={s.categoryBadge}>
          <Text style={s.categoryText}>
            {event.category?.name || event.category || 'General'}
          </Text>
        </View>
      </View>
      <View style={s.eventInfo}>
        <Text style={s.eventTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={s.eventMeta}>
          <MapPin size={12} color={C.blue.light} weight="fill" />
          <Text style={s.eventMetaText}>{event.location}</Text>
        </View>
        <View style={s.eventMeta}>
          <CalendarBlank size={12} color={C.text.secondary} weight="regular" />
          <Text style={s.eventMetaText}>{event.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Helper Component: Section List
  const CategorySection = ({ title, data, icon: Icon }) => (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Icon size={20} color={C.blue.light} weight="bold" />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      />
    </View>
  );

  // Loading indicator must come after helper components are defined if used inside them, 
  // but before the main return()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#141416' }}>
        <ActivityIndicator size="large" color="#ADF3FF" />
      </View>
    );
  }
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <View style={s.header}>
        <Text style={s.headerTitle}>Explore</Text>
        <Text style={s.headerSubtitle}>
          Discover events happening around you
        </Text>
      </View>

      <View style={s.searchContainer}>
        <View style={s.searchBar}>
          <MagnifyingGlass size={20} color={C.text.tertiary} weight="bold" />
          <TextInput
            style={s.searchInput}
            placeholder="Search events, artists, venues..."
            placeholderTextColor={C.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleSearch} style={s.searchButton}>
              <Text style={s.searchButtonText}>Search</Text>
            </TouchableOpacity>
          )}
        </View>

        {showSuggestions && suggestions.length > 0 && (
          <View style={s.suggestionsDropdown}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={s.suggestionItem}
                onPress={() => handleSuggestionTap(suggestion)}
              >
                <MagnifyingGlass size={16} color={C.text.tertiary} />
                <Text style={s.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={s.swipeCard}
          onPress={() => navigation.navigate('Swipe')}
          activeOpacity={0.8}
        >
          <View style={s.swipeContent}>
            <HandSwipeRight size={32} color={C.blue.light} weight="fill" />
            <Text style={s.swipeTitle}>Swipe to Discover</Text>
            <Text style={s.swipeSubtitle}>Find your next favorite event</Text>
            <View style={s.swipeButton}>
              <Text style={s.swipeButtonText}>Start Swiping →</Text>
            </View>
          </View>
        </TouchableOpacity>

        <CategorySection
          title="Happening Today"
          data={realEvents.today}
          icon={CalendarBlank}
        />
        <CategorySection
          title="This Weekend"
          data={realEvents.weekend}
          icon={CalendarBlank}
        />
        <CategorySection
          title="Trending"
          data={realEvents.trending}
          icon={Fire}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: C.text.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: { fontSize: 14, color: C.text.secondary, marginTop: 4 },
  searchContainer: { paddingHorizontal: 20, marginBottom: 20, zIndex: 10 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: C.border.light,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: C.text.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: C.blue.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchButtonText: { color: '#141416', fontSize: 14, fontWeight: '800' },
  suggestionsDropdown: {
    backgroundColor: C.bg.elevated,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border.light,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border.subtle,
  },
  suggestionText: {
    flex: 1,
    color: C.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  swipeCard: {
    marginHorizontal: 20,
    marginBottom: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: C.blue.light,
    backgroundColor: C.bg.card,
    overflow: 'hidden',
  },
  swipeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  swipeTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: C.text.primary,
    marginTop: 12,
    letterSpacing: -0.3,
  },
  swipeSubtitle: {
    fontSize: 14,
    color: C.text.secondary,
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
  },
  swipeButton: {
    backgroundColor: C.blue.light,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },
  swipeButtonText: {
    color: '#141416',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text.primary,
    letterSpacing: -0.2,
  },
  eventCard: {
    width: 260,
    backgroundColor: C.bg.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border.subtle,
  },
  eventImage: { width: '100%', height: 140 },
  eventOverlay: { position: 'absolute', top: 12, left: 12 },
  categoryBadge: {
    backgroundColor: 'rgba(20,20,22,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  categoryText: {
    color: C.blue.light,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventInfo: { padding: 12 },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text.primary,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  eventMetaText: { fontSize: 12, color: C.text.secondary, fontWeight: '600' },
});

export default ExploreScreen;
