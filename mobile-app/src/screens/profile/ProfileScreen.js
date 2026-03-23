import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Pressable,
  StatusBar,
} from 'react-native';
import {
  GridFour,
  CalendarBlank,
  CheckSquare,
  Ticket,
  Heart,
  Gear,
  Question,
  SignOut,
  Crown,
  CaretRight,
} from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const SCREEN_PADDING = 20;
const GAP = 8;
const COLUMN_WIDTH = (width - SCREEN_PADDING * 2 - GAP * 2) / 3;

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: {
    light: '#ADF3FF',
    brand: '#4CC1D4',
    border: 'rgba(173,243,255,0.15)',
  },
  gold: { main: '#FFD700', glow: 'rgba(255, 215, 0, 0.15)' },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { subtle: 'rgba(255,255,255,0.06)' },
};

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isBusiness, setIsBusiness] = useState(false);
  const { logout } = useAuth();

  const [userData, setUserData] = useState({
    name: 'Mueena Shahmy',
    handle: '@mueena_s',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    stats: { events: 2, following: 3, followers: 3 },
  });

  const posts = [
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
    },
    {
      id: '4',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
    },
  ];

  useEffect(() => {
    if (route.params?.updatedData) {
      setUserData(route.params.updatedData);
    }
  }, [route.params?.updatedData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            {isBusiness && (
              <View style={styles.crownBadge}>
                <Crown size={14} color={COLORS.bg.primary} weight="fill" />
              </View>
            )}
          </View>

          <Text style={styles.nameText}>{userData.name}</Text>
          <Text style={styles.handleText}>{userData.handle}</Text>

          {!isBusiness && (
            <TouchableOpacity
              style={styles.businessCTA}
              onPress={() => navigation.navigate('Upgrade')}
            >
              <Crown size={16} color={COLORS.gold.main} weight="fill" />
              <Text style={styles.businessCTAText}>UPGRADE TO BUSINESS</Text>
              <CaretRight size={12} color={COLORS.gold.main} weight="bold" />
            </TouchableOpacity>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() =>
                navigation.navigate('EditProfile', {
                  currentName: userData.name,
                  currentUsername: userData.handle,
                  currentImage: userData.avatar,
                  currentStats: userData.stats,
                })
              }
            >
              <Text style={styles.secondaryBtnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate('CreatePost')}
            >
              <Text style={styles.primaryBtnText}>+ Create</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsBar}>
          {[
            { label: 'EVENTS', val: userData.stats.events, press: null },
            {
              label: 'FOLLOWING',
              val: userData.stats.following,
              press: 'Following',
            },
            {
              label: 'FOLLOWERS',
              val: userData.stats.followers,
              press: 'Followers',
            },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.statItem}
              onPress={() => item.press && navigation.navigate(item.press)}
            >
              <Text style={styles.statNumber}>{item.val}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {[
            { icon: GridFour, name: 'posts' },
            { icon: CalendarBlank, name: 'hosted' },
            { icon: CheckSquare, name: 'attended' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tabItem,
                activeTab === tab.name && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.name)}
            >
              <tab.icon
                size={22}
                color={
                  activeTab === tab.name
                    ? COLORS.blue.brand
                    : COLORS.text.tertiary
                }
                weight={activeTab === tab.name ? 'fill' : 'regular'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Content */}
        <View style={styles.contentSection}>
          {activeTab === 'posts' ? (
            <View style={styles.grid}>
              {posts.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('EventDetail', { eventId: item.id })
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.gridImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nothing to show here yet</Text>
            </View>
          )}
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          <MenuBtn
            label="Manage My Events"
            icon={CalendarBlank}
            color={COLORS.blue.brand}
            onPress={() => navigation.navigate('ManageEvents')}
          />
          <MenuBtn
            label="My Tickets"
            icon={Ticket}
            color={COLORS.blue.brand}
            onPress={() => navigation.navigate('MyTickets')}
          />
          <MenuBtn
            label="Favorites"
            icon={Heart}
            color="#FF453A"
            onPress={() => navigation.navigate('Favorites')}
          />
          <MenuBtn
            label="Settings"
            icon={Gear}
            color={COLORS.text.secondary}
            onPress={() => navigation.navigate('Settings')}
          />
          <MenuBtn
            label="Help Center"
            icon={Question}
            color={COLORS.text.secondary}
            onPress={() => navigation.navigate('Help')}
          />
          <MenuBtn
            label="Logout"
            icon={SignOut}
            color="#FF453A"
            onPress={logout}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuBtn = ({ label, icon: Icon, color, onPress, isLast }) => (
  <Pressable
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
  >
    <View style={styles.menuLeft}>
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Icon size={20} color={color} weight="bold" />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <CaretRight size={16} color={COLORS.text.tertiary} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
  },
  crownBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.gold.main,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.bg.primary,
  },

  nameText: {
    color: COLORS.text.primary,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  handleText: {
    color: COLORS.text.secondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 15,
  },

  businessCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold.glow,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    marginBottom: 20,
    gap: 8,
  },
  businessCTAText: {
    color: COLORS.gold.main,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  buttonRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    backgroundColor: COLORS.bg.elevated,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.blue.border,
  },
  secondaryBtnText: {
    color: COLORS.text.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: COLORS.blue.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },
  primaryBtnText: {
    color: COLORS.text.inverse,
    fontWeight: '900',
    fontSize: 13,
  },

  statsBar: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border.subtle,
    marginTop: 10,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { color: COLORS.text.primary, fontSize: 18, fontWeight: '900' },
  statLabel: {
    color: COLORS.text.tertiary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },

  tabBar: { flexDirection: 'row', height: 55, paddingHorizontal: 10 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: COLORS.blue.brand },

  contentSection: { paddingHorizontal: SCREEN_PADDING, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  gridImage: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
    borderRadius: 10,
    backgroundColor: COLORS.bg.card,
  },

  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { color: COLORS.text.tertiary, fontSize: 14, fontWeight: '600' },

  menuList: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: COLORS.bg.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconBox: { padding: 8, borderRadius: 10 },
  menuLabel: { color: COLORS.text.primary, fontSize: 15, fontWeight: '600' },
});

export default ProfileScreen;
