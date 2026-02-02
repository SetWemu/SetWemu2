import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/colors';

const TestScreen = ({ navigation }) => {
  // Dummy event data for testing
  const foodEvent = {
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

  const techEvent = {
    id: '2',
    title: 'Tech Conference Colombo 2026',
    date: 'March 10, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'BMICH, Colombo',
    price: 2500,
    description:
      'Annual tech conference featuring the latest in AI, blockchain, machine learning, and startup innovation. Network with industry leaders and learn from expert speakers.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    host: {
      name: 'Tech Sri Lanka',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    attendeeCount: 856,
    category: 'Technology',
  };

  const musicEvent = {
    id: '3',
    title: 'Galle Music Festival 2026',
    date: 'April 20, 2026',
    time: '5:00 PM - 11:00 PM',
    location: 'Galle Fort, Galle',
    price: 3000,
    description:
      'Experience an unforgettable night of live music at the historic Galle Fort. Featuring top local and international artists performing across multiple stages.',
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    host: {
      name: 'Galle Music Foundation',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    attendeeCount: 1200,
    category: 'Music',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🧪</Text>
          <Text style={styles.title}>SetWemu Test Lab</Text>
          <Text style={styles.subtitle}>
            Click any button to test EventDetail screen
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EventDetail', { event: foodEvent })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.buttonEmoji}>🍕</Text>
            <Text style={styles.buttonText}>Food Festival</Text>
            <Text style={styles.buttonSubtext}>Rs. 1,500 • 324 attending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EventDetail', { event: techEvent })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.buttonEmoji}>💻</Text>
            <Text style={styles.buttonText}>Tech Conference</Text>
            <Text style={styles.buttonSubtext}>Rs. 2,500 • 856 attending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EventDetail', { event: musicEvent })
            }
            activeOpacity={0.8}
          >
            <Text style={styles.buttonEmoji}>🎵</Text>
            <Text style={styles.buttonText}>Music Festival</Text>
            <Text style={styles.buttonSubtext}>
              Rs. 3,000 • 1,200 attending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.navigate('EventDetail')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonOutlineEmoji}>🎭</Text>
            <Text style={styles.buttonOutlineText}>No Data Test</Text>
            <Text style={styles.buttonOutlineSubtext}>
              Uses default dummy data
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Testing EventDetailScreen.js</Text>
          <Text style={styles.footerSubtext}>
            All screens use your SetWemu brand colors! 🎨
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.lightBlue,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.9,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primaryDark,
  },
  buttonOutlineEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  buttonOutlineText: {
    color: COLORS.primaryDark,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonOutlineSubtext: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.text.light,
  },
});

export default TestScreen;
