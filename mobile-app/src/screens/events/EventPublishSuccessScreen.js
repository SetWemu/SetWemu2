import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, ShareNetwork, Eye, House } from 'phosphor-react-native';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB' },
  success: '#30D158',
};

const EventPublishSuccessScreen = ({ route, navigation }) => {
  const { eventId, eventTitle } = route.params || {};

  const handleViewEvent = () => {
    navigation.navigate('EventDetail', { eventId });
  };

  const handleShareEvent = () => {
    console.log('Share event');
  };

  const handleBackHome = () => {
    navigation.navigate('Main', { screen: 'HomeTab' });
  };

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      <View style={s.content}>
        <View style={s.iconContainer}>
          <CheckCircle size={80} color={C.success} weight="fill" />
        </View>

        {/* Success Message */}
        <Text style={s.title}>Event Published! 🎉</Text>
        <Text style={s.subtitle}>
          Your event "{eventTitle || 'Untitled Event'}" is now live and visible
          to everyone on SetWemu.
        </Text>

        {/* Event ID (for reference) */}
        <View style={s.idBadge}>
          <Text style={s.idLabel}>Event ID</Text>
          <Text style={s.idText}>{eventId || 'N/A'}</Text>
        </View>

        {/* Action Buttons */}
        <View style={s.actions}>
          <TouchableOpacity style={s.primaryButton} onPress={handleViewEvent}>
            <Eye size={20} color="#141416" weight="bold" />
            <Text style={s.primaryButtonText}>View My Event</Text>
          </TouchableOpacity>

          {/* Share Event */}
          <TouchableOpacity
            style={s.secondaryButton}
            onPress={handleShareEvent}
          >
            <ShareNetwork size={20} color={C.blue.light} weight="bold" />
            <Text style={s.secondaryButtonText}>Share Event</Text>
          </TouchableOpacity>

          {/* Back to Discovery */}
          <TouchableOpacity style={s.tertiaryButton} onPress={handleBackHome}>
            <House size={18} color={C.text.secondary} weight="bold" />
            <Text style={s.tertiaryButtonText}>Back to Discovery</Text>
          </TouchableOpacity>
        </View>

        <View style={s.tipsCard}>
          <Text style={s.tipsTitle}>💡 Next Steps</Text>
          <Text style={s.tipText}>• Share your event on social media</Text>
          <Text style={s.tipText}>
            • Monitor ticket sales in your dashboard
          </Text>
          <Text style={s.tipText}>• Update event details anytime</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Icon
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(48,209,88,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  // Text
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: C.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: C.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },

  // ID Badge
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: C.bg.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 40,
  },
  idLabel: { fontSize: 12, color: C.text.secondary, fontWeight: '600' },
  idText: {
    fontSize: 12,
    color: C.blue.light,
    fontWeight: '800',
    fontFamily: 'monospace',
  },

  // Actions
  actions: { width: '100%', gap: 12, marginBottom: 30 },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: C.blue.light,
    paddingVertical: 16,
    borderRadius: 16,
  },
  primaryButtonText: { fontSize: 16, fontWeight: '900', color: '#141416' },

  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: C.bg.card,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: C.blue.light,
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '800', color: C.blue.light },

  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  tertiaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text.secondary,
  },

  // Tips
  tipsCard: {
    width: '100%',
    backgroundColor: C.bg.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(173,243,255,0.1)',
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: C.text.primary,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: C.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default EventPublishSuccessScreen;
