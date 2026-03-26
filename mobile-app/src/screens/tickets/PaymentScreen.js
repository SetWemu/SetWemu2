import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Info, Sparkle, ShieldCheck } from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';

const C = { 
  bg: '#141416', 
  card: '#1C1C1E', 
  blue: '#ADF3FF', 
  text: '#ABABAB', 
  border: 'rgba(255,255,255,0.1)',
  elevated: '#242428'
};

const PaymentScreen = ({ route, navigation }) => {
  const { finalTotal, event, ticket, quantity } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const payload = {
        user_id: user.id,
        items: [
          {
            tier_id: ticket.id,
            quantity: quantity
          }
        ],
        payment_method: 'DEMO_PURCHASE'
      };

      const response = await apiClient.post('/bookings', payload);

      if (response.status === 201) {
        navigation.navigate('Success', { event, bookingId: response.data.booking_id });
      }
    } catch (error) {
      console.error("Booking Error:", error.message);
      Alert.alert("Booking Failed", error.response?.data?.error || "Could not complete the demo booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={ps.safe}>
      <StatusBar barStyle="light-content" />
      <View style={ps.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ps.backBtn}>
          <ArrowLeft color="#fff" />
        </TouchableOpacity>
        <Text style={ps.headerTitle}>Confirmation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={ps.title}>Demo Checkout</Text>
        
        <View style={ps.demoCard}>
          <View style={ps.iconRow}>
            <Sparkle size={32} color={C.blue} weight="duotone" />
            <Text style={ps.demoTitle}>Test Environment</Text>
          </View>
          <Text style={ps.demoDesc}>
            This application is currently in demo mode. A real payment gateway will be integrated in the production version.
          </Text>
          <View style={ps.infoBox}>
            <Info size={16} color={C.blue} />
            <Text style={ps.infoText}>No actual charges will be made to any account.</Text>
          </View>
        </View>

        <View style={ps.summaryCard}>
          <Text style={ps.summaryLabel}>Order Summary</Text>
          <View style={ps.summaryRow}>
            <Text style={ps.itemText}>{quantity}x {ticket.name || ticket.type}</Text>
            <Text style={ps.itemPrice}>LKR {finalTotal.toLocaleString()}</Text>
          </View>
          <View style={ps.divider} />
          <View style={ps.secureRow}>
            <ShieldCheck size={16} color={C.blue} weight="fill" />
            <Text style={ps.secureText}>Secure Demo Transaction</Text>
          </View>
        </View>
      </ScrollView>

      <View style={ps.footer}>
        <View>
          <Text style={ps.footerLabel}>PAYABLE</Text>
          <Text style={ps.footerTotal}>LKR {finalTotal.toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
          style={[ps.btn, loading && { opacity: 0.7 }]} 
          onPress={handleConfirmBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#141416" />
          ) : (
            <Text style={ps.btnText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ps = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },
  
  title: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 20 },
  
  demoCard: {
    backgroundColor: C.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(173,243,255,0.2)',
    marginBottom: 20,
  },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  demoTitle: { color: C.blue, fontSize: 18, fontWeight: '800' },
  demoDesc: { color: '#ABABAB', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  infoBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(173,243,255,0.05)', 
    padding: 12, 
    borderRadius: 12, 
    gap: 10 
  },
  infoText: { color: C.blue, fontSize: 12, fontWeight: '600', flex: 1 },

  summaryCard: {
    backgroundColor: C.elevated,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: C.border,
  },
  summaryLabel: { color: '#6B6B6B', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  itemPrice: { color: '#fff', fontSize: 16, fontWeight: '800' },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 16 },
  secureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' },
  secureText: { color: C.blue, fontSize: 12, fontWeight: '700' },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    paddingBottom: 35, 
    backgroundColor: C.card, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderTopWidth: 1, 
    borderTopColor: C.border 
  },
  footerLabel: { color: '#6B6B6B', fontSize: 10, fontWeight: '800', marginBottom: 2 },
  footerTotal: { color: C.blue, fontSize: 22, fontWeight: '900' },
  btn: { backgroundColor: C.blue, paddingHorizontal: 30, paddingVertical: 16, borderRadius: 16, minWidth: 160, alignItems: 'center' },
  btnText: { color: '#141416', fontWeight: '900', fontSize: 15 }
});

export default PaymentScreen;