import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image,
  StyleSheet, StatusBar, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeft, Heart, MapPin, CalendarBlank, Trash } from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../config/api';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
};

const FavoritesScreen = ({ navigation }) => {
  
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/favorites/${user.id}`);
      const data = await res.json();
      // Ensure data is an array before setting state
      setFavorites(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch Favorites Error:", e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Trigger fetch every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  //  HANDLER FUNCTIONS
  const handleRemove = (eventId, eventTitle) => {
    Alert.alert(
      'Remove from Favorites?',
      `Are you sure you want to remove "${eventTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await fetch(`${API_URL}/favorites/toggle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, event_id: eventId }),
              });
              const data = await res.json();
              
              if (!data.favorited) {
                setFavorites(prev => prev.filter(item => item.id !== eventId));
              }
            } catch (e) {
              Alert.alert("Error", "Could not remove favorite.");
            }
          }
        }
      ]
    );
  };

  //  UI RENDERING LOGIC 
  const renderItem = ({ item }) => (
    <View style={s.card}>
      <TouchableOpacity
        style={s.cardContent}
        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image_url || item.image }} style={s.cardImage} />
        <View style={s.cardInfo}>
          <View style={s.categoryBadge}>
            <Text style={s.categoryText}>{item.category?.name || item.category || 'Event'}</Text>
          </View>
          <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
          <View style={s.cardMeta}>
            <MapPin size={14} color={C.blue.light} weight="fill" />
            <Text style={s.cardMetaText} numberOfLines={1}>{item.location}</Text>
          </View>
          <View style={s.cardMeta}>
            <CalendarBlank size={14} color={C.text.secondary} />
            <Text style={s.cardMetaText}>
              {item.date ? new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'TBD'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={s.removeButton}
        onPress={() => handleRemove(item.id, item.title)}
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
        <TouchableOpacity style={s.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* State Transitions */}
      {!user ? (
        <View style={s.emptyState}>
          <Heart size={60} color={C.text.tertiary} weight="thin" />
          <Text style={s.emptyTitle}>Login Required</Text>
          <TouchableOpacity style={s.emptyButton} onPress={() => navigation.navigate('Login')}>
            <Text style={s.emptyButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View style={s.loadingWrap}>
          <ActivityIndicator color={C.blue.light} size="large" />
        </View>
      ) : favorites.length > 0 ? (
        <>
          <View style={s.countSection}>
            <Heart size={20} color={C.blue.light} weight="fill" />
            <Text style={s.count}>{favorites.length} saved event{favorites.length !== 1 ? 's' : ''}</Text>
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={s.emptyState}>
          <Heart size={80} color={C.text.tertiary} weight="thin" />
          <Text style={s.emptyTitle}>No Favorites Yet</Text>
          <Text style={s.emptySubtitle}>Events you like will appear here</Text>
          <TouchableOpacity 
            style={s.emptyButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Explore' })}
          >
            <Text style={s.emptyButtonText}>Explore Events</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border.subtle },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.text.primary },
  countSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
  count: { fontSize: 14, color: C.text.secondary, fontWeight: '700' },
  card: { flexDirection: 'row', backgroundColor: C.bg.card, borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.border.subtle },
  cardContent: { flex: 1, flexDirection: 'row' },
  cardImage: { width: 110, height: 130 },
  cardInfo: { flex: 1, padding: 12 },
  categoryBadge: { backgroundColor: C.bg.elevated, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8, borderWidth: 1, borderColor: C.border.light },
  categoryText: { color: C.blue.light, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.text.primary, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  cardMetaText: { fontSize: 12, color: C.text.secondary, fontWeight: '600' },
  removeButton: { width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg.elevated, borderLeftWidth: 1, borderLeftColor: C.border.subtle },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: '900', color: C.text.primary, marginTop: 20 },
  emptySubtitle: { fontSize: 14, color: C.text.secondary, marginTop: 8, textAlign: 'center' },
  emptyButton: { backgroundColor: C.blue.light, paddingHorizontal: 30, paddingVertical: 16, borderRadius: 16, marginTop: 30 },
  emptyButtonText: { color: '#141416', fontSize: 16, fontWeight: '900' },
});

export default FavoritesScreen;