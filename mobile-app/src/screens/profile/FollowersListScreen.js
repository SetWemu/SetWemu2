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
import { ArrowLeft, UserPlus, Check } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const FollowersListScreen = ({ navigation }) => {
  const followers = [
    {
      id: '1',
      name: 'Sarah Wilson',
      username: '@sarah_w',
      avatar: 'https://i.pravatar.cc/150?img=1',
      following: true,
    },
    {
      id: '2',
      name: 'David Chen',
      username: '@dchen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      following: false,
    },
    {
      id: '3',
      name: 'Emma Brown',
      username: '@emmab',
      avatar: 'https://i.pravatar.cc/150?img=3',
      following: true,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={[styles.followBtn, item.following && styles.followingBtn]}
      >
        {item.following ? (
          <>
            <Check size={16} color={COLORS.text.primary} weight="bold" />
            <Text style={styles.followingText}>Following</Text>
          </>
        ) : (
          <>
            <UserPlus size={16} color={COLORS.text.inverse} weight="bold" />
            <Text style={styles.followText}>Follow</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
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
        <Text style={styles.headerTitle}>Followers</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={followers}
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
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.blue.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingBtn: {
    backgroundColor: COLORS.bg.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  followText: { fontSize: 13, fontWeight: '700', color: COLORS.text.inverse },
  followingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
});

export default FollowersListScreen;
