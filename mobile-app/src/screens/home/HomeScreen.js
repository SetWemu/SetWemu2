import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { House, Article, UsersThree, Sparkle } from 'phosphor-react-native';

const COLORS = {
  bg: '#141416',
  card: '#1C1C1E',
  brand: '#4CC1D4',
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
  }
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.glow} />
          <Article size={64} color={COLORS.brand} weight="duotone" />
        </View>
        
        <Text style={styles.title}>Social Feed</Text>
        <Text style={styles.subtitle}>
          Connect with friends, share your experiences, and discover what's happening around you.
        </Text>

        <View style={styles.badge}>
          <Sparkle size={14} color={COLORS.brand} weight="fill" />
          <Text style={styles.badgeText}>COMING SOON</Text>
        </View>

        <View style={styles.featureList}>
          <FeatureItem icon={UsersThree} text="Connect with other users" />
          <FeatureItem icon={House} text="Share your event highlights" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon: Icon, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.bullet}>
      <Icon size={18} color={COLORS.brand} weight="bold" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: COLORS.brand,
    borderRadius: 50,
    opacity: 0.1,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.text.secondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 193, 212, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 193, 212, 0.2)',
    marginBottom: 40,
    gap: 6,
  },
  badgeText: {
    color: COLORS.brand,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  featureList: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  bullet: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(76, 193, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
