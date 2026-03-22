import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image,
  StyleSheet, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, MapPin, CalendarBlank, Trash } from 'phosphor-react-native';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
};

// This will be populated from SwipeScreen when events are liked
// For now, mock data
const MOCK_FAVORITES = [
  { id: '1', title: 'EDM Festival 2026', location: 'BMICH', date: 'Friday, 9:00 PM', image: 'https://picsum.photos/400/300?random=1', category: 'Music' },
  { id: '2', title: 'Art Gallery Opening', location: 'Kollupitiya', date: 'Today, 5:00 PM', image: 'https://picsum.photos/400/300?random=2', category: 'Art' },
];

const FavoritesScreen = ({ route, navigation }) => {
  const { returnTo } = route.params || {};
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleBack = () => {
    if (returnTo === 'Swipe') {
      navigation.navigate('Swipe');
    } else if (returnTo === 'Profile') {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
  };

  const handleRemove = (eventId, eventTitle) => {
    Alert.alert(
      'Remove from Favorites?',
      `Are you sure you want to remove "${eventTitle}" from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(event => event.id !== eventId))
        }
      ]
    );
  };

  const FavoriteCard = ({ event }) => (
    <View style={s.card}>
      <TouchableOpacity
        style={s.cardContent}
        onPress={() => navigation.navigate('EventDetail', { 
          eventId: event.id, 
          event,
          returnTo: 'Favorites'
        })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: event.image }} style={s.cardImage} />
        <View style={s.cardInfo}>
          <View style={s.categoryBadge}>
            <Text style={s.categoryText}>{event.category}</Text>
          </View>
          <Text style={s.cardTitle}>{event.title}</Text>
          <View style={s.cardMeta}>
            <MapPin size={14} color={C.blue.light} weight="fill" />
            <Text style={s.cardMetaText}>{event.location}</Text>
          </View>
          <View style={s.cardMeta}>
            <CalendarBlank size={14} color={C.text.secondary} />
            <Text style={s.cardMetaText}>{event.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={s.removeButton}
        onPress={() => handleRemove(event.id, event.title)}
      >
        <Trash size={18} color={C.error} weight="bold" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Count */}
      <View style={s.countSection}>
        <Heart size={20} color={C.blue.light} weight="fill" />
        <Text style={s.count}>{favorites.length} saved event{favorites.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* List */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FavoriteCard event={item} />}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={s.emptyState}>
          <Heart size={80} color={C.text.tertiary} weight="thin" />
          <Text style={s.emptyTitle}>No Favorites Yet</Text>
          <Text style={s.emptySubtitle}>Events you like will appear here</Text>
          <TouchableOpacity 
            style={s.emptyButton}
            onPress={() => navigation.navigate('Swipe')}
          >
            <Text style={s.emptyButtonText}>Start Swiping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border.subtle },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.text.primary },

  // Count
  countSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
  count: { fontSize: 14, color: C.text.secondary, fontWeight: '700' },

  // Cards
  card: { flexDirection: 'row', backgroundColor: C.bg.card, borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border.subtle },
  cardContent: { flex: 1, flexDirection: 'row' },
  cardImage: { width: 120, height: 140 },
  cardInfo: { flex: 1, padding: 12 },
  categoryBadge: { backgroundColor: C.bg.elevated, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8, borderWidth: 1, borderColor: C.border.light },
  categoryText: { color: C.blue.light, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.text.primary, marginBottom: 8, lineHeight: 20 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  cardMetaText: { fontSize: 12, color: C.text.secondary, fontWeight: '600' },

  // Remove Button
  removeButton: { width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg.elevated, borderLeftWidth: 1, borderLeftColor: C.border.subtle },

  // Empty State
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: '900', color: C.text.primary, marginTop: 20 },
  emptySubtitle: { fontSize: 14, color: C.text.secondary, marginTop: 8, textAlign: 'center' },
  emptyButton: { backgroundColor: C.blue.light, paddingHorizontal: 30, paddingVertical: 16, borderRadius: 16, marginTop: 30 },
  emptyButtonText: { color: '#141416', fontSize: 16, fontWeight: '900' },
});

export default FavoritesScreen;