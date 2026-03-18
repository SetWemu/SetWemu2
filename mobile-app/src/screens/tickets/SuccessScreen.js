import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { CheckCircle, Ticket, House } from 'phosphor-react-native';

const SuccessScreen = ({ route, navigation }) => {
  const { event } = route.params;

  return (
    <View style={ss.container}>
      <StatusBar barStyle="light-content" />
      <View style={ss.iconBg}><CheckCircle size={80} color="#30D158" weight="fill" /></View>
      <Text style={ss.title}>Booking Confirmed!</Text>
      <Text style={ss.sub}>Your tickets for {event.title} are now ready.</Text>
      
      <TouchableOpacity style={ss.btn} onPress={() => navigation.navigate('MyTickets')}>
        <Ticket size={20} color="#141416" weight="bold" />
        <Text style={ss.btnText}>View in My Tickets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ss.homeBtn} onPress={() => navigation.navigate('Main', { screen: 'HomeTab' })}>
        <House size={18} color="#ADF3FF" />
        <Text style={ss.homeText}>Back to Discovery</Text>
      </TouchableOpacity>
    </View>
  );
};

const ss = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141416', alignItems: 'center', justifyContent: 'center', padding: 30 },
  iconBg: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(48,209,88,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', textAlign: 'center' },
  sub: { fontSize: 14, color: '#ABABAB', textAlign: 'center', marginTop: 12, lineHeight: 22 },
  btn: { backgroundColor: '#ADF3FF', width: '100%', padding: 18, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40 },
  btnText: { fontWeight: '900', color: '#141416', fontSize: 16 },
  homeBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 },
  homeText: { color: '#ADF3FF', fontWeight: '700', fontSize: 14 }
});

export default SuccessScreen;