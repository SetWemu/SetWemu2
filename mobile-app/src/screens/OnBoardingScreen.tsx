import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: 1, title: 'Find Local Events', desc: 'Discover the best tech, music, and art events happening in Sri Lanka.', icon: 'map-outline' },
  { id: 2, title: 'Connect with People', desc: 'See who is attending and expand your professional network.', icon: 'people-outline' },
  { id: 3, title: 'Book Your Tickets', desc: 'Secure your spot instantly with our seamless booking system.', icon: 'qr-code-outline' },
];

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Horizontal Swipeable Area */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Icon name={slide.icon} size={120} color="#4CC1D4" />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.desc}>{slide.desc}</Text>
            
            {/* Show 'Get Started' button ONLY on the last slide */}
            {index === slides.length - 1 && (
              <TouchableOpacity 
                style={styles.button}
                // Temporary navigation: goes to the screen we built earlier today!
                onPress={() => navigation.replace('Login')} 
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Little hint at the bottom */}
      <Text style={styles.swipeText}>Swipe left to continue {'>>'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  slide: { width, height, justifyContent: 'center', alignItems: 'center', padding: 40 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 40, textAlign: 'center' },
  desc: { color: '#94a3b8', fontSize: 16, textAlign: 'center', marginTop: 20, lineHeight: 24 },
  button: { backgroundColor: '#4CC1D4', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, marginTop: 50 },
  buttonText: { color: '#0F172A', fontSize: 18, fontWeight: 'bold' },
  swipeText: { position: 'absolute', bottom: 40, alignSelf: 'center', color: '#64748b' }
});

export default OnboardingScreen;