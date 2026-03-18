import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Crown, CheckCircle, X } from 'phosphor-react-native';

const UpgradeModal = ({ visible, onClose }) => {
  const perks = [
    'Custom Ticket Brand Colors',
    'Staff Check-in Dashboard',
    'Advanced Sales Analytics',
    'Custom Registration Fields',
    'Email Marketing Automation',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={m.overlay}>
        <View style={m.sheet}>
          <TouchableOpacity style={m.close} onPress={onClose}>
            <X color="#fff" />
          </TouchableOpacity>

          <View style={m.iconBg}>
            <Crown size={40} color="#FFD700" weight="fill" />
          </View>
          <Text style={m.title}>Switch to Business</Text>
          <Text style={m.sub}>
            Grow your community with professional event management tools.
          </Text>

          <View style={m.list}>
            {perks.map((p, i) => (
              <View key={i} style={m.item}>
                <CheckCircle size={20} color="#FFD700" weight="fill" />
                <Text style={m.itemText}>{p}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={m.btn} activeOpacity={0.8}>
            <Text style={m.btnText}>Start 14-Day Free Trial</Text>
          </TouchableOpacity>
          <Text style={m.footerTxt}>Then LKR 2,500 / month</Text>
        </View>
      </View>
    </Modal>
  );
};

const m = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 44,
    alignItems: 'center',
  },
  close: { alignSelf: 'flex-end', padding: 8 },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,215,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: '900', color: '#fff' },
  sub: {
    fontSize: 14,
    color: '#ABABAB',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  list: { width: '100%', marginTop: 25, gap: 15 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemText: { color: '#F2F2F7', fontSize: 15, fontWeight: '600' },
  btn: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 35,
  },
  btnText: { color: '#141416', fontWeight: '900', fontSize: 16 },
  footerTxt: {
    color: '#6B6B6B',
    fontSize: 12,
    marginTop: 15,
    fontWeight: '600',
  },
});

export default UpgradeModal;
