import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  SlidersHorizontal,
} from 'phosphor-react-native';
import eventService from '../../api/eventService';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};


const SearchResultsScreen = ({ route, navigation }) => {
  const { query } = route.params;
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async (q) => {
    try {
      setLoading(true);
      const data = await eventService.searchEvents(q);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchResults(query);
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchResults(searchQuery);
    }
  };

  const ResultCard = ({ event }) => (
    <TouchableOpacity
      style={s.resultCard}
      onPress={() =>
        navigation.navigate('EventDetail', { eventId: event.id, event })
      }
      activeOpacity={0.8}
    >
      <Image source={{ uri: event.image_url || event.image }} style={s.resultImage} />
      <View style={s.resultInfo}>
        <View style={s.categoryBadge}>
          <Text style={s.categoryText}>{event.category?.name || event.category || 'Event'}</Text>
        </View>
        <Text style={s.resultTitle}>{event.title}</Text>
        <View style={s.resultMeta}>
          <MapPin size={14} color={C.blue.light} weight="fill" />
          <Text style={s.resultMetaText}>{event.location}</Text>
        </View>
        <View style={s.resultMeta}>
          <CalendarBlank size={14} color={C.text.secondary} weight="regular" />
          <Text style={s.resultMetaText}>{event.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <View style={s.searchBar}>
          <MagnifyingGlass size={18} color={C.text.tertiary} weight="bold" />
          <TextInput
            style={s.searchInput}
            placeholder="Search by event name"
            placeholderTextColor={C.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
        </View>
        <TouchableOpacity style={s.filterButton}>
          <SlidersHorizontal size={20} color={C.blue.light} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={s.resultsHeader}>
        <Text style={s.resultsCount}>{results.length} events found</Text>
        <Text style={s.resultsQuery}>for "{searchQuery}"</Text>
      </View>

      {/* Results List */}
      {loading ? (
        <View style={s.loader}>
          <ActivityIndicator size="large" color={C.blue.light} />
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ResultCard event={item} />}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={s.emptyContainer}>
          <MagnifyingGlass size={48} color={C.text.tertiary} weight="light" />
          <Text style={s.emptyText}>No events found</Text>
          <Text style={s.emptySubtext}>Try a different search term</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border.light,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: C.border.light,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: C.text.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border.light,
  },

  // Results Header
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border.subtle,
  },
  resultsCount: { fontSize: 16, fontWeight: '800', color: C.text.primary },
  resultsQuery: { fontSize: 13, color: C.text.secondary, marginTop: 2 },

  // Result Cards
  resultCard: {
    flexDirection: 'row',
    backgroundColor: C.bg.card,
    borderRadius: 16,
    marginTop: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border.subtle,
  },
  resultImage: { width: 120, height: 140 },
  resultInfo: { flex: 1, padding: 12 },
  categoryBadge: {
    backgroundColor: C.bg.elevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  categoryText: {
    color: C.blue.light,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text.primary,
    marginBottom: 8,
    lineHeight: 20,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  resultMetaText: { fontSize: 12, color: C.text.secondary, fontWeight: '600' },
  attendees: {
    fontSize: 11,
    color: C.blue.light,
    fontWeight: '700',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text.primary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: C.text.secondary,
    marginTop: 8,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchResultsScreen;
