import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Star } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  gold: '#FFD700',
};

const ReviewsListScreen = ({ navigation }) => {
  const reviews = [
    {
      id: '1',
      user: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Amazing event! Great organization and atmosphere.',
      time: '2 days ago',
      event: 'Tech Summit 2025',
    },
    {
      id: '2',
      user: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 4,
      text: 'Really enjoyed it. Would love to see more events like this.',
      time: '1 week ago',
      event: 'Food Festival',
    },
    {
      id: '3',
      user: 'Emma Brown',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'Incredible experience! The venue was perfect.',
      time: '2 weeks ago',
      event: 'Music Night',
    },
  ];

  const renderStars = rating => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={14}
            color={star <= rating ? COLORS.gold : COLORS.text.tertiary}
            weight={star <= rating ? 'fill' : 'regular'}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.reviewText}>{item.text}</Text>
      <Text style={styles.eventName}>Event: {item.event}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
  list: { padding: 20 },
  card: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  userInfo: { flex: 1 },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  starsRow: { flexDirection: 'row', gap: 2 },
  time: { fontSize: 11, color: COLORS.text.tertiary },
  reviewText: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 20,
    marginBottom: 8,
  },
  eventName: { fontSize: 12, color: COLORS.text.secondary, fontWeight: '600' },
});

export default ReviewsListScreen;
