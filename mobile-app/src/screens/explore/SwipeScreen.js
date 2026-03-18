import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  X,
  Heart,
  MapPin,
  CalendarBlank,
  Users,
} from 'phosphor-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 80; // Lower threshold for easier swiping

const C = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB' },
  border: { light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
  success: '#30D158',
};

// Mock events for swiping
const SWIPE_EVENTS = [
  {
    id: '1',
    title: 'EDM Festival 2026',
    location: 'BMICH',
    date: 'Friday, 9:00 PM',
    image: 'https://picsum.photos/400/600?random=1',
    category: 'Music',
    attendees: 500,
  },
  {
    id: '2',
    title: 'Art Gallery Opening',
    location: 'Kollupitiya',
    date: 'Today, 5:00 PM',
    image: 'https://picsum.photos/400/600?random=2',
    category: 'Art',
    attendees: 85,
  },
  {
    id: '3',
    title: 'Beach Party Festival',
    location: 'Mount Lavinia',
    date: 'Saturday, 7:00 PM',
    image: 'https://picsum.photos/400/600?random=3',
    category: 'Party',
    attendees: 350,
  },
  {
    id: '4',
    title: 'Tech Conference',
    location: 'Colombo',
    date: 'Wednesday, 6:00 PM',
    image: 'https://picsum.photos/400/600?random=4',
    category: 'Technology',
    attendees: 245,
  },
  {
    id: '5',
    title: 'Comedy Show',
    location: 'Liberty Plaza',
    date: 'Thursday, 8:00 PM',
    image: 'https://picsum.photos/400/600?random=5',
    category: 'Comedy',
    attendees: 200,
  },
];

const SwipeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedEvents, setLikedEvents] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe RIGHT - Like
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe LEFT - Pass
          forceSwipe('left');
        } else {
          // Reset position
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipe = direction => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 400, // Slower animation (was 250)
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = direction => {
    const currentEvent = SWIPE_EVENTS[currentIndex];

    if (direction === 'right') {
      // Add to favorites
      setLikedEvents([...likedEvents, currentEvent]);
    }

    // Move to next card
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const handleLike = () => forceSwipe('right');
  const handlePass = () => forceSwipe('left');

  const currentEvent = SWIPE_EVENTS[currentIndex];

  if (currentIndex >= SWIPE_EVENTS.length) {
    // No more events
    return (
      <SafeAreaView style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.header}>
          <TouchableOpacity
            style={s.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color={C.text.primary} weight="bold" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Swipe</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={s.emptyState}>
          <Heart size={80} color={C.blue.light} weight="thin" />
          <Text style={s.emptyTitle}>No More Events!</Text>
          <Text style={s.emptySubtitle}>You've seen all available events</Text>
          <TouchableOpacity
            style={s.emptyButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={s.emptyButtonText}>Back to Explore</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.navigate('Explore')}
        >
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Swipe to Discover</Text>
        <TouchableOpacity
          style={s.favButton}
          onPress={() =>
            navigation.navigate('Favorites', { returnTo: 'Swipe' })
          }
        >
          <Heart size={20} color={C.blue.light} weight="fill" />
          <Text style={s.favLabel}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <Text style={s.progress}>
        {currentIndex + 1} / {SWIPE_EVENTS.length}
      </Text>

      {/* Cards Stack */}
      <View style={s.cardContainer}>
        {/* Next Card (Behind) */}
        {currentIndex < SWIPE_EVENTS.length - 1 && (
          <View style={[s.card, s.nextCard]}>
            <Image
              source={{ uri: SWIPE_EVENTS[currentIndex + 1].image }}
              style={s.cardImage}
            />
          </View>
        )}

        {/* Current Card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            s.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotate },
              ],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('EventDetail', {
                eventId: currentEvent.id,
                event: currentEvent,
                returnTo: 'Swipe',
              })
            }
            style={s.cardTouchable}
          >
            <Image source={{ uri: currentEvent.image }} style={s.cardImage} />

            {/* LIKE Overlay */}
            <Animated.View
              style={[s.overlay, s.likeOverlay, { opacity: likeOpacity }]}
            >
              <Text style={s.overlayText}>LIKE</Text>
            </Animated.View>

            {/* NOPE Overlay */}
            <Animated.View
              style={[s.overlay, s.nopeOverlay, { opacity: nopeOpacity }]}
            >
              <Text style={s.overlayText}>PASS</Text>
            </Animated.View>

            {/* Event Info */}
            <View style={s.cardInfo}>
              <View style={s.categoryBadge}>
                <Text style={s.categoryText}>{currentEvent.category}</Text>
              </View>
              <Text style={s.cardTitle}>{currentEvent.title}</Text>
              <View style={s.cardMeta}>
                <MapPin size={14} color={C.blue.light} weight="fill" />
                <Text style={s.cardMetaText}>{currentEvent.location}</Text>
              </View>
              <View style={s.cardMeta}>
                <CalendarBlank size={14} color={C.text.secondary} />
                <Text style={s.cardMetaText}>{currentEvent.date}</Text>
              </View>
              <View style={s.cardMeta}>
                <Users size={14} color={C.text.secondary} />
                <Text style={s.cardMetaText}>
                  {currentEvent.attendees} attending
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={s.actions}>
        <TouchableOpacity
          style={[s.actionButton, s.passButton]}
          onPress={handlePass}
        >
          <X size={32} color="#fff" weight="bold" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.actionButton, s.likeButton]}
          onPress={handleLike}
        >
          <Heart size={32} color="#fff" weight="fill" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  headerTitle: { fontSize: 16, fontWeight: '800', color: C.text.primary },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: C.bg.card,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  favLabel: { fontSize: 12, fontWeight: '700', color: C.blue.light },

  progress: {
    textAlign: 'center',
    fontSize: 13,
    color: C.text.secondary,
    fontWeight: '700',
    marginBottom: 10,
  },

  // Cards
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 24,
    backgroundColor: C.bg.card,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextCard: {
    position: 'absolute',
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },
  cardTouchable: { flex: 1 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  // Overlays (Softer colors)
  overlay: {
    position: 'absolute',
    top: 60,
    padding: 20,
    borderRadius: 16,
    borderWidth: 3,
  },
  likeOverlay: {
    right: 40,
    borderColor: C.blue.light,
    backgroundColor: 'rgba(173,243,255,0.15)',
  },
  nopeOverlay: {
    left: 40,
    borderColor: C.text.secondary,
    backgroundColor: 'rgba(171,171,171,0.15)',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },

  // Card Info (Better gradient background for readability)
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  categoryBadge: {
    backgroundColor: 'rgba(173,243,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.blue.light,
  },
  categoryText: {
    color: C.blue.light,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardMetaText: { fontSize: 14, color: '#fff', fontWeight: '600' },

  // Action Buttons
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 30,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  passButton: { backgroundColor: C.error },
  likeButton: { backgroundColor: C.success },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: C.text.primary,
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: C.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: C.blue.light,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 30,
  },
  emptyButtonText: { color: '#141416', fontSize: 16, fontWeight: '900' },
});

export default SwipeScreen;
