import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, CalendarBlank, Users, Plus } from 'phosphor-react-native';

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
  const [activeTab, setActiveTab] = useState('ongoing');

  const events = {
    ongoing: [
      {
        id: '1',
        title: 'Tech Summit 2025',
        date: 'Mar 25, 2025',
        image:
          'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=400&h=400&fit=crop',
        ticketsSold: 342,
        totalTickets: 500,
        revenue: 'LKR 171,000',
        status: 'ongoing',
      },
      {
        id: '2',
        title: 'Music Festival',
        date: 'Mar 28, 2025',
        image:
          'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
        ticketsSold: 890,
        totalTickets: 1000,
        revenue: 'LKR 445,000',
        status: 'ongoing',
      },
    ],
    past: [
      {
        id: '3',
        title: 'Food Festival 2024',
        date: 'Dec 15, 2024',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
        ticketsSold: 450,
        totalTickets: 500,
        revenue: 'LKR 225,000',
        status: 'completed',
      },
    ],
  };

  const renderEvent = ({ item }) => {
    const percentageSold = Math.round(
      (item.ticketsSold / item.totalTickets) * 100,
    );

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventAnalytics', { event: item })}
      >
        <Image source={{ uri: item.image }} style={styles.eventImage} />

        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <CalendarBlank
              size={14}
              color={COLORS.text.tertiary}
              weight="bold"
            />
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Users size={16} color={COLORS.blue.brand} weight="bold" />
              <Text style={styles.statText}>
                {item.ticketsSold}/{item.totalTickets}
              </Text>
            </View>
            <Text style={styles.revenue}>{item.revenue}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${percentageSold}%` }]}
            />
          </View>
          <Text style={styles.percentageText}>{percentageSold}% sold</Text>

          {/* Status Badge */}
          {item.status === 'ongoing' && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          )}
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

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'ongoing' && styles.activeTabText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Past Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <FlatList
        data={events[activeTab]}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  activeTab: {
    backgroundColor: COLORS.blue.brand + '20',
    borderColor: COLORS.blue.brand,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text.secondary,
  },
  activeTabText: { color: COLORS.blue.brand },
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
  statusBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
  },
});

export default ManageEventsScreen;
