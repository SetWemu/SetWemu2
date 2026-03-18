import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Wallet, Bank, Check } from 'phosphor-react-native';

const C = { bg: '#141416', card: '#1C1C1E', blue: '#ADF3FF', text: '#ABABAB', border: 'rgba(255,255,255,0.1)' };

const PaymentScreen = ({ route, navigation }) => {
  const { finalTotal, event, ticket, quantity } = route.params;
  const [method, setMethod] = useState('card');

  const Method = ({ id, label, icon: Icon, desc }) => (
    <TouchableOpacity style={[ps.card, method === id && ps.cardActive]} onPress={() => setMethod(id)} activeOpacity={0.8}>
      <View style={ps.iconWrap}><Icon size={22} color={C.blue} /></View>
      <View style={{ flex: 1 }}><Text style={ps.label}>{label}</Text><Text style={ps.desc}>{desc}</Text></View>
      <View style={[ps.radio, method === id && ps.radioActive]}>{method === id && <Check size={10} color="#141416" weight="bold" />}</View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={ps.safe}>
      <StatusBar barStyle="light-content" />
      <View style={ps.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ps.backBtn}><ArrowLeft color="#fff" /></TouchableOpacity>
        <Text style={ps.headerTitle}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={ps.title}>Choose Payment Method</Text>
        <Method id="card" label="Credit / Debit Card" desc="Visa, Mastercard, Amex" icon={CreditCard} />
        <Method id="pickme" label="PickMe Pay" desc="Fast checkout via PickMe" icon={Wallet} />
        <Method id="bank" label="Bank Transfer" desc="Manual deposit / KOKO" icon={Bank} />
      </ScrollView>

      <View style={ps.footer}>
        <Text style={ps.footerTotal}>LKR {finalTotal.toLocaleString()}</Text>
        <TouchableOpacity style={ps.btn} onPress={() => navigation.navigate('Success', { event })}>
          <Text style={ps.btnText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ps = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, padding: 16, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: C.border },
  cardActive: { borderColor: C.blue, backgroundColor: 'rgba(173,243,255,0.05)' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(173,243,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  label: { color: '#fff', fontSize: 15, fontWeight: '700' },
  desc: { color: C.text, fontSize: 12, marginTop: 2 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { backgroundColor: C.blue, borderColor: C.blue },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, paddingBottom: 35, backgroundColor: C.card, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: C.border },
  footerTotal: { color: C.blue, fontSize: 20, fontWeight: '900' },
  btn: { backgroundColor: C.blue, paddingHorizontal: 35, paddingVertical: 16, borderRadius: 16 },
  btnText: { color: '#141416', fontWeight: '900', fontSize: 16 }
});

export default PaymentScreen;