import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  StatusBar, Animated, PanResponder, Dimensions, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, X, Heart, MapPin } from 'phosphor-react-native';

import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../config/api';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 80;

const C = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB' },
  border: { light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
  success: '#30D158',
};

const getCategoryName = (id) => {
  const categories = { 1: 'Technology', 2: 'Sports', 3: 'Music', 4: 'Culture & Food' };
  return categories[id] || 'General';
};

const SwipeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    // Logic Flaw Fix: Only fetch if user is actually loaded
    if (user?.id) {
      fetchRecommendations();
    }
  }, [user?.id]); 

  // 1. FORCED RESET SAFETY: Whenever the front card changes, 
  useEffect(() => {
    if (events.length > 0) {
      position.setValue({ x: 0, y: 0 });
    }
  }, [events[0]?.id]); // Triggers when the top card ID changes

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/swipe/recommendations/${user.id}`);
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // INTERPOLATIONS
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

  const panResponder = useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
    [events[0]?.id, position] // Refresh when top event ID changes
  );

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    
    // STOP any existing animation to prevent callback drop!
    position.stopAnimation();

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250, 
      useNativeDriver: true,
    }).start(() => {
      // FORCE COMPLETION: Never check for "finished". 
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = async (direction) => {
    const currentItem = events[0];
    if (!currentItem) return;

    // A tiny gap to let the animation 'lock' off screen before state change
    setTimeout(() => {
      setEvents((prev) => prev.slice(1));
    }, 50);

    try {
      await fetch(`${API_URL}/swipe/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          eventId: currentItem.id,
          direction: direction,
        }),
      });
    } catch (error) {
      console.error("Failed to sync interaction:", error);
    }
  };

  const resetPosition = () => {
    position.stopAnimation();
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 0, // Solid reset without bounce for state changes
    }).start();
  };

  const handleLike = () => forceSwipe('right');
  const handlePass = () => forceSwipe('left');

  const currentEvent = events[0];

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={C.blue.light} />
        </View>
      ) : events.length === 0 ? (
        <View style={s.emptyState}>
          <Heart size={80} color={C.blue.light} weight="thin" />
          <Text style={s.emptyTitle}>All Caught Up!</Text>
          <TouchableOpacity style={s.emptyButton} onPress={fetchRecommendations}>
            <Text style={s.emptyButtonText}>Check for More</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={s.header}>
            <TouchableOpacity style={s.backButton} onPress={() => navigation.goBack()}>
              <ArrowLeft size={20} color={C.text.primary} weight="bold" />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Discover Events</Text>
            <TouchableOpacity style={s.favButton} onPress={() => navigation.navigate('Favorites')}>
              <Heart size={20} color={C.blue.light} weight="fill" />
            </TouchableOpacity>
          </View>

          <View style={s.cardContainer}>
            {/* Next Card */}
            {events[1] && (
              <View key={`next-${events[1].id}`} style={[s.card, s.nextCard]}>
                <Image source={{ uri: events[1].image }} style={s.cardImage} />
              </View>
            )}

            {/* Current Card - CRITICAL: Added key to force reset */}
            <Animated.View
              key={currentEvent?.id} 
              {...panResponder.panHandlers}
              style={[
                s.card,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate: rotate },
                  ],
                  zIndex: 100, // Z-INDEX LOCK: Always ensure the active card is capture touches
                },
              ]}
            >
              <Image source={{ uri: currentEvent?.image }} style={s.cardImage} />

              <Animated.View style={[s.overlay, s.likeOverlay, { opacity: likeOpacity }]}>
                <Text style={s.overlayText}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[s.overlay, s.nopeOverlay, { opacity: nopeOpacity }]}>
                <Text style={s.overlayText}>PASS</Text>
              </Animated.View>

              <View style={s.cardInfo}>
                <View style={s.categoryBadge}>
                  <Text style={s.categoryText}>{getCategoryName(currentEvent?.category_id)}</Text>
                </View>
                <Text style={s.cardTitle}>{currentEvent?.title}</Text>
                <View style={s.cardMeta}>
                  <MapPin size={16} color={C.blue.light} weight="fill" />
                  <Text style={s.cardMetaText}>{currentEvent?.location}</Text>
                </View>
              </View>
            </Animated.View>
          </View>

          <View style={s.actions}>
            <TouchableOpacity style={[s.actionButton, s.passButton]} onPress={handlePass}>
              <X size={32} color="#fff" weight="bold" />
            </TouchableOpacity>
            <TouchableOpacity style={[s.actionButton, s.likeButton]} onPress={handleLike}>
              <Heart size={32} color="#fff" weight="fill" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default SwipeScreen;

const s = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: C.bg.primary 
  },
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
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: C.text.primary 
  },
  favButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border.light,
  },
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
    position: 'absolute', // Important for stacking
  },
  nextCard: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },
  cardImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  overlay: {
    position: 'absolute',
    top: 50,
    padding: 15,
    borderWidth: 4,
    borderRadius: 10,
  },
  likeOverlay: {
    right: 30,
    borderColor: C.success,
  },
  nopeOverlay: {
    left: 30,
    borderColor: C.error,
  },
  overlayText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  categoryBadge: {
    backgroundColor: 'rgba(173,243,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: C.blue.light,
    fontSize: 12,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardMetaText: { 
    fontSize: 14, 
    color: '#fff' 
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 40,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passButton: { backgroundColor: C.error },
  likeButton: { backgroundColor: C.success },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text.primary,
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    color: C.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: C.blue.light,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  emptyButtonText: { 
    fontWeight: '800', 
    color: '#141416' 
  },
})