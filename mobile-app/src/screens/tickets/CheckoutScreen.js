import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  Image, StyleSheet, Alert, ActivityIndicator, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EnvelopeSimple, Phone, Tag, CheckCircle, ArrowLeft } from 'phosphor-react-native';

const C = {
  bg:       { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue:     { light: '#ADF3FF', mid: '#8DDFF5', glow: 'rgba(173,243,255,0.10)' },
  text:     { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border:   { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success:  '#30D158',
};

const CheckoutScreen = ({ route, navigation }) => {
  const { event, ticket, quantity } = route.params;
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState({ terms: false, refund: false });
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Dynamic Pricing Logic
  const subtotal = ticket.price * quantity;
  const serviceFee = subtotal * 0.05;
  const finalTotal = subtotal + serviceFee - discount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setIsApplyingPromo(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SETWEMU10') {
        setDiscount(subtotal * 0.1);
        Alert.alert('Success', '10% discount applied!');
      } else {
        Alert.alert('Invalid', 'Code not found.');
      }
      setIsApplyingPromo(false);
    }, 800);
  };

  const Section = ({ title, children, noBorder }) => (
    <View style={[s.section, noBorder && { borderBottomWidth: 0 }]}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Section title="Order Summary">
          <View style={s.eventCard}>
            <Image source={{ uri: event.hero_images?.[0] }} style={s.eventImage} />
            <View style={s.eventInfo}>
              <Text style={s.eventTitle} numberOfLines={1}>{event.title}</Text>
              <Text style={s.eventMeta}>{event.time} • {quantity}× {ticket.type}</Text>
              <Text style={s.blueLabel}>LKR {ticket.price.toLocaleString()} / ticket</Text>
            </View>
          </View>
        </Section>

        <Section title="Contact Information">
          <View style={s.inputGroup}>
            <View style={s.inputWrap}>
              <EnvelopeSimple size={18} color={C.blue.light} />
              <TextInput style={s.input} placeholder="Email for tickets" placeholderTextColor={C.text.tertiary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
            <View style={s.inputWrap}>
              <Phone size={18} color={C.blue.light} />
              <TextInput style={s.input} placeholder="Phone number" placeholderTextColor={C.text.tertiary} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>
          </View>
        </Section>

        <Section title="Promo Code">
          <View style={s.promoRow}>
            <View style={s.promoInputWrap}>
              <Tag size={18} color={C.text.tertiary} />
              <TextInput style={s.promoInput} placeholder="Enter code" placeholderTextColor={C.text.tertiary} value={promoCode} onChangeText={setPromoCode} autoCapitalize="characters" />
            </View>
            <TouchableOpacity style={[s.applyBtn, discount > 0 && { backgroundColor: C.success }]} onPress={handleApplyPromo}>
              {isApplyingPromo ? <ActivityIndicator size="small" color="#141416" /> : <Text style={s.applyBtnText}>{discount > 0 ? 'Applied' : 'Apply'}</Text>}
            </TouchableOpacity>
          </View>
        </Section>

        <Section title="Payment Details" noBorder>
          <View style={s.priceCard}>
            <View style={s.priceRow}><Text style={s.priceLabel}>Subtotal</Text><Text style={s.priceVal}>LKR {subtotal.toLocaleString()}</Text></View>
            <View style={s.priceRow}><Text style={s.priceLabel}>Service Fee (5%)</Text><Text style={s.priceVal}>LKR {serviceFee.toFixed(2)}</Text></View>
            {discount > 0 && (
              <View style={s.priceRow}><Text style={[s.priceLabel, { color: C.success }]}>Discount</Text><Text style={[s.priceVal, { color: C.success }]}>- LKR {discount.toFixed(2)}</Text></View>
            )}
            <View style={s.dashDivider} />
            <View style={s.priceRow}><Text style={s.totalLabel}>Total Amount</Text><Text style={s.totalVal}>LKR {finalTotal.toLocaleString()}</Text></View>
          </View>
        </Section>

        <View style={s.policySection}>
          {['terms', 'refund'].map(type => (
            <TouchableOpacity key={type} style={s.checkRow} onPress={() => setAgreed(p => ({ ...p, [type]: !p[type] }))}>
              <CheckCircle size={22} color={agreed[type] ? C.blue.light : C.text.tertiary} weight={agreed[type] ? "fill" : "regular"} />
              <Text style={s.checkText}>I agree to the <Text style={s.link}>{type === 'terms' ? 'Terms' : 'Refund Policy'}</Text></Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={s.footer}>
        <View><Text style={s.footerLabel}>Total</Text><Text style={s.footerPrice}>LKR {finalTotal.toLocaleString()}</Text></View>
        <TouchableOpacity 
          style={[s.payBtn, (!agreed.terms || !agreed.refund) && { opacity: 0.4 }]}
          disabled={!agreed.terms || !agreed.refund}
          onPress={() => navigation.navigate('Payment', { finalTotal, event, ticket, quantity })}
        >
          <Text style={s.payBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.text.primary },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.bg.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border.light },
  section: { paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.border.subtle },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: C.text.tertiary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  eventCard: { flexDirection: 'row', backgroundColor: C.bg.card, borderRadius: 16, padding: 12, gap: 12, borderWidth: 1, borderColor: C.border.light },
  eventImage: { width: 70, height: 70, borderRadius: 10 },
  eventInfo: { flex: 1, justifyContent: 'center' },
  eventTitle: { fontSize: 16, fontWeight: '700', color: C.text.primary, marginBottom: 2 },
  eventMeta: { fontSize: 12, color: C.text.secondary, marginBottom: 4 },
  blueLabel: { fontSize: 12, fontWeight: '700', color: C.blue.light },
  inputGroup: { gap: 12 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg.card, borderRadius: 12, paddingHorizontal: 15, height: 54, borderWidth: 1, borderColor: C.border.light, gap: 12 },
  input: { flex: 1, color: C.text.primary, fontSize: 15, fontWeight: '600' },
  promoRow: { flexDirection: 'row', gap: 10 },
  promoInputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg.elevated, borderRadius: 12, paddingHorizontal: 15, height: 50, gap: 10 },
  promoInput: { flex: 1, color: C.text.primary, fontWeight: '700', fontSize: 14 },
  applyBtn: { backgroundColor: C.blue.light, paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center' },
  applyBtnText: { color: '#141416', fontWeight: '800', fontSize: 14 },
  priceCard: { backgroundColor: C.bg.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border.subtle },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceLabel: { color: C.text.secondary, fontSize: 14 },
  priceVal: { color: C.text.primary, fontSize: 14, fontWeight: '700' },
  dashDivider: { height: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: C.border.light, marginVertical: 8 },
  totalLabel: { color: C.text.primary, fontSize: 16, fontWeight: '800' },
  totalVal: { color: C.blue.light, fontSize: 20, fontWeight: '900' },
  policySection: { paddingHorizontal: 20, marginTop: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  checkText: { color: C.text.secondary, fontSize: 13, flex: 1 },
  link: { color: C.blue.light, fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: C.bg.card, padding: 20, paddingBottom: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: C.border.subtle },
  footerLabel: { fontSize: 11, color: C.text.tertiary, fontWeight: '700', textTransform: 'uppercase' },
  footerPrice: { fontSize: 22, fontWeight: '900', color: C.blue.light },
  payBtn: { backgroundColor: C.blue.light, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 16 },
  payBtnText: { color: '#141416', fontWeight: '900', fontSize: 16 }
});

export default CheckoutScreen;