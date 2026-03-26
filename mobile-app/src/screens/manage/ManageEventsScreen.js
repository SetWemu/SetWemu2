import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { ArrowLeft, CalendarBlank, Users, Plus, Warning } from 'phosphor-react-native';
import eventService from '../../api/eventService';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
  warning: '#FFD60A',
};

const ManageEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true);
      else setIsLoading(true);
      
      const data = await eventService.getMyEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Fetch Events Error:', err);
      setError('Failed to load your events. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = () => {
    fetchEvents(true);
  };

  const renderEvent = ({ item }) => {
    // Calculate total sold count from tiers if not provided
    const totalSold = item.ticket_tiers?.reduce((sum, tier) => sum + (tier.sold_count || 0), 0) || 0;
    const totalCapacity = item.total_capacity || 0;
    
    const percentageSold = totalCapacity > 0 
      ? Math.round((totalSold / totalCapacity) * 100) 
      : 0;

    // Format revenue
    const revenue = item.total_revenue 
      ? `LKR ${item.total_revenue.toLocaleString()}` 
      : 'LKR 0';

    // Status: backend 'active' or 'completed'
    const status = item.status === 'completed' ? 'completed' : 'ongoing';

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventAnalytics', { eventId: item.id })}
      >
        <Image 
          source={{ uri: item.image || item.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop' }} 
          style={styles.eventImage} 
        />

        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <CalendarBlank
              size={14}
              color={COLORS.text.tertiary}
              weight="bold"
            />
            <Text style={styles.eventDate}>
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Users size={16} color={COLORS.blue.brand} weight="bold" />
              <Text style={styles.statText}>
                {totalSold}/{totalCapacity}
              </Text>
            </View>
            <Text style={styles.revenue}>{revenue}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${percentageSold}%` }]}
            />
          </View>
          <Text style={styles.percentageText}>{percentageSold}% sold</Text>


        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Events</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Plus size={20} color={COLORS.blue.brand} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Event List */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.blue.brand} />
          <Text style={styles.loadingText}>Fetching your events...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Warning size={48} color={COLORS.warning} weight="duotone" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => fetchEvents()}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.centerContainer}>
          <CalendarBlank size={48} color={COLORS.text.tertiary} weight="light" />
          <Text style={styles.emptyText}>No events found</Text>
          <Text style={styles.emptySubText}>Start by creating your first event!</Text>
          <TouchableOpacity 
            style={styles.createFirstBtn}
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <Text style={styles.createFirstText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.blue.brand}
              colors={[COLORS.blue.brand]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text.primary },
  createBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  list: { padding: 20 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  eventInfo: { flex: 1 },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  revenue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.success,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.bg.elevated,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.blue.brand,
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 11,
    color: COLORS.text.tertiary,
    fontWeight: '600',
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.text.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 12,
    color: COLORS.text.primary,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  retryText: {
    color: COLORS.blue.brand,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 16,
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  emptySubText: {
    marginTop: 8,
    color: COLORS.text.tertiary,
    fontSize: 14,
    textAlign: 'center',
  },
  createFirstBtn: {
    marginTop: 24,
    backgroundColor: COLORS.blue.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createFirstText: {
    color: COLORS.text.inverse,
    fontWeight: '800',
    fontSize: 14,
  },
});

export default ManageEventsScreen;
