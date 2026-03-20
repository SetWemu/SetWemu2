import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Check } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const FollowingListScreen = ({ navigation }) => {
  const following = [
    {
      id: '1',
      name: 'Tech Events SL',
      username: '@techevents',
      avatar:
        'https://ui-avatars.com/api/?name=Tech+Events&background=4CC1D4&color=141416&size=150',
    },
    {
      id: '2',
      name: 'Food Festival',
      username: '@foodfest',
      avatar:
        'https://ui-avatars.com/api/?name=Food+Festival&background=FF6B9D&color=fff&size=150',
    },
    {
      id: '3',
      name: 'Music Colombo',
      username: '@musiccmb',
      avatar:
        'https://ui-avatars.com/api/?name=Music+Colombo&background=9D4EDD&color=fff&size=150',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PublicProfile', { userId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.followingBtn}
        onPress={e => {
          e.stopPropagation();
          // Unfollow logic here
        }}
      >
        <Check size={16} color={COLORS.text.primary} weight="bold" />
        <Text style={styles.followingText}>Following</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Following</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={following}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text.primary },
  list: { padding: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  userInfo: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  username: { fontSize: 13, color: COLORS.text.secondary },
  followingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bg.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
});

export default FollowingListScreen;
