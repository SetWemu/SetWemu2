import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params || {};

  const eventData = event || {
    id: '1',
    title: 'Colombo Food Festival 2026',
    date: 'February 15, 2026',
    time: '10:00 AM - 8:00 PM',
    location: 'Galle Face Green, Colombo',
    price: 1500,
    description:
      'Join us for the biggest food festival in Colombo! Experience amazing Sri Lankan and international cuisine, live music, and family-friendly activities. Over 50 food stalls, cooking demonstrations, and cultural performances.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    host: {
      name: 'Colombo Events Ltd',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    attendeeCount: 324,
    category: 'Food & Dining',
  };

  const handleBookTicket = () => {
    console.log('Book ticket pressed for:', eventData.title);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: eventData.imageUrl }} style={styles.heroImage} />

        <View style={styles.contentContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{eventData.category}</Text>
          </View>

          <Text style={styles.title}>{eventData.title}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅</Text>
            <Text style={styles.infoText}>{eventData.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🕐</Text>
            <Text style={styles.infoText}>{eventData.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍</Text>
            <Text style={styles.infoText}>{eventData.location}</Text>
          </View>

          <View style={styles.hostSection}>
            <Image
              source={{ uri: eventData.host.avatar }}
              style={styles.hostAvatar}
            />
            <View>
              <Text style={styles.hostLabel}>Hosted by</Text>
              <Text style={styles.hostName}>{eventData.host.name}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.description}>{eventData.description}</Text>
          </View>

          <View style={styles.attendeeRow}>
            <Text style={styles.attendeeCount}>
              👥 {eventData.attendeeCount} people attending
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>Rs. {eventData.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookTicket}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Get Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heroImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
    lineHeight: 32,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text.primary,
    flex: 1,
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: COLORS.background.lightBlue,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  hostLabel: {
    fontSize: 12,
    color: COLORS.text.light,
    marginBottom: 2,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text.secondary,
  },
  attendeeRow: {
    marginBottom: 100,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  attendeeCount: {
    fontSize: 14,
    color: COLORS.text.light,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.primaryDark,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.text.light,
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  bookButton: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;
