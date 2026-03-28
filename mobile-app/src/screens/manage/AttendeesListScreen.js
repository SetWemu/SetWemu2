import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  ArrowLeft,
  MagnifyingGlass,
  CheckCircle,
  Circle,
  FunnelSimple,
  Download,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
  error: '#FF453A',
};

const AttendeesListScreen = ({ navigation, route }) => {
  const { event } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); 

  const attendees = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      ticketType: 'VIP',
      checkedIn: true,
      checkInTime: '10:30 AM',
    },
    {
      id: '2',
      name: 'David Chen',
      email: 'david.chen@email.com',
      ticketType: 'General',
      checkedIn: true,
      checkInTime: '10:45 AM',
    },
    {
      id: '3',
      name: 'Emma Brown',
      email: 'emma.b@email.com',
      ticketType: 'VIP',
      checkedIn: false,
      checkInTime: null,
    },
    {
      id: '4',
      name: 'John Smith',
      email: 'john.s@email.com',
      ticketType: 'General',
      checkedIn: false,
      checkInTime: null,
    },
  ];

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'checked-in') return matchesSearch && attendee.checkedIn;
    if (filter === 'not-checked-in')
      return matchesSearch && !attendee.checkedIn;
    return matchesSearch;
  });

  const stats = {
    total: attendees.length,
    checkedIn: attendees.filter(a => a.checkedIn).length,
    notCheckedIn: attendees.filter(a => !a.checkedIn).length,
  };

  const renderAttendee = ({ item }) => (
    <View style={styles.attendeeCard}>
      <View style={styles.attendeeLeft}>
        <View
          style={[
            styles.statusCircle,
            { backgroundColor: item.checkedIn ? COLORS.success : COLORS.error },
          ]}
        >
          {item.checkedIn ? (
            <CheckCircle size={24} color="#FFF" weight="fill" />
          ) : (
            <Circle size={24} color="#FFF" weight="bold" />
          )}
        </View>

        <View style={styles.attendeeInfo}>
          <Text style={styles.attendeeName}>{item.name}</Text>
          <Text style={styles.attendeeEmail}>{item.email}</Text>
          <View style={styles.ticketBadge}>
            <Text style={styles.ticketText}>{item.ticketType}</Text>
          </View>
        </View>
      </View>

      {item.checkedIn && (
        <View style={styles.checkInInfo}>
          <Text style={styles.checkInLabel}>Checked in</Text>
          <Text style={styles.checkInTime}>{item.checkInTime}</Text>
        </View>
      )}
    </View>
  );

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
        <Text style={styles.headerTitle}>Attendees</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Download size={20} color={COLORS.blue.brand} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View
          style={[styles.statBox, { backgroundColor: COLORS.success + '20' }]}
        >
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {stats.checkedIn}
          </Text>
          <Text style={styles.statLabel}>Checked In</Text>
        </View>
        <View
          style={[styles.statBox, { backgroundColor: COLORS.error + '20' }]}
        >
          <Text style={[styles.statValue, { color: COLORS.error }]}>
            {stats.notCheckedIn}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Search & Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MagnifyingGlass size={18} color={COLORS.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search attendees..."
            placeholderTextColor={COLORS.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filters}>
          {['all', 'checked-in', 'not-checked-in'].map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                filter === f && styles.filterChipActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f === 'all'
                  ? 'All'
                  : f === 'checked-in'
                  ? 'Checked In'
                  : 'Pending'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Attendee List */}
      <FlatList
        data={filteredAttendees}
        renderItem={renderAttendee}
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
  downloadBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.bg.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: { fontSize: 11, color: COLORS.text.secondary, fontWeight: '600' },
  searchSection: { paddingHorizontal: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.text.primary,
  },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.bg.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  filterChipActive: {
    backgroundColor: COLORS.blue.brand + '20',
    borderColor: COLORS.blue.brand,
  },
  filterText: { fontSize: 13, fontWeight: '600', color: COLORS.text.secondary },
  filterTextActive: { color: COLORS.blue.brand },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  attendeeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  attendeeLeft: { flexDirection: 'row', flex: 1 },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  attendeeInfo: { flex: 1 },
  attendeeName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  attendeeEmail: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  ticketBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.blue.brand + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ticketText: { fontSize: 10, fontWeight: '700', color: COLORS.blue.brand },
  checkInInfo: { alignItems: 'flex-end' },
  checkInLabel: { fontSize: 11, color: COLORS.text.tertiary, marginBottom: 2 },
  checkInTime: { fontSize: 13, fontWeight: '700', color: COLORS.success },
});

export default AttendeesListScreen;
