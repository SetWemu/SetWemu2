import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, 
  ScrollView, SafeAreaView, Dimensions, Pressable, FlatList 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 3; // Accounting for padding

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)' },
};

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userData, setUserData] = useState({
    name: "You",
    handle: "@username",
    avatar: "https://ui-avatars.com/api/?name=User&background=4CC1D4&color=141416",
    stats: { events: 18, following: 142, followers: 845 }
  });

  const posts = [
    { id: '1', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400' },
    { id: '2', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400' },
    { id: '3', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400' },
  ];

  const menuItems = [
    { id: 'tickets', label: 'My Tickets', icon: 'ticket-outline', color: COLORS.blue.brand },
    { id: 'favorites', label: 'Favorites', icon: 'heart-outline', color: '#FF453A' },
    { id: 'settings', label: 'Settings', icon: 'settings-outline', color: COLORS.text.secondary },
    { id: 'logout', label: 'Logout', icon: 'log-out-outline', color: '#FF453A', isLogout: true },
  ];

  useEffect(() => {
    if (route.params?.updatedData) setUserData(route.params.updatedData);
  }, [route.params?.updatedData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Profile Info */}
        <View style={styles.header}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <Text style={styles.nameText}>{userData.name}</Text>
          <Text style={styles.handleText}>{userData.handle}</Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate('EditProfile', { currentName: userData.name })}
            >
              <Text style={styles.secondaryBtnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>+ Create</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}><Text style={styles.statNumber}>{userData.stats.events}</Text><Text style={styles.statLabel}>EVENTS</Text></View>
          <View style={styles.statItem}><Text style={styles.statNumber}>{userData.stats.following}</Text><Text style={styles.statLabel}>FOLLOWING</Text></View>
          <View style={styles.statItem}><Text style={styles.statNumber}>{userData.stats.followers}</Text><Text style={styles.statLabel}>FOLLOWERS</Text></View>
        </View>

        {/* Content Tabs */}
        <View style={styles.tabBar}>
          {['grid-outline', 'calendar-outline', 'checkbox-outline'].map((icon, idx) => {
            const tabNames = ['posts', 'hosted', 'attended'];
            const isSelected = activeTab === tabNames[idx];
            return (
              <TouchableOpacity 
                key={icon} 
                style={[styles.tabItem, isSelected && styles.activeTab]} 
                onPress={() => setActiveTab(tabNames[idx])}
              >
                <Icon name={icon} size={22} color={isSelected ? COLORS.blue.brand : COLORS.text.secondary} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Post Grid */}
        <View style={styles.gallerySection}>
          <View style={styles.galleryHeader}>
            <Text style={styles.galleryTitle}>ALL POSTS ({posts.length})</Text>
            <Icon name="options-outline" size={16} color={COLORS.text.secondary} />
          </View>
          <View style={styles.grid}>
            {posts.map((item) => (
              <Image key={item.id} source={{ uri: item.image }} style={styles.gridImage} />
            ))}
          </View>
        </View>

        {/* Menu Items (Restored below posts) */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <Pressable key={item.id} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={[styles.iconBox, {backgroundColor: item.color + '15'}]}>
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={[styles.menuLabel, item.isLogout && {color: '#FF453A'}]}>{item.label}</Text>
              </View>
              <Icon name="chevron-forward" size={16} color={COLORS.text.tertiary} />
            </Pressable>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 85, height: 85, borderRadius: 42.5, marginBottom: 12, borderWidth: 2, borderColor: COLORS.blue.brand },
  nameText: { color: COLORS.text.primary, fontSize: 24, fontWeight: '900' },
  handleText: { color: COLORS.text.secondary, fontSize: 13, marginBottom: 15 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: { backgroundColor: COLORS.bg.elevated, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: COLORS.blue.border },
  secondaryBtnText: { color: COLORS.text.primary, fontWeight: '700', fontSize: 13 },
  primaryBtn: { backgroundColor: COLORS.blue.brand, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  primaryBtnText: { color: COLORS.text.inverse, fontWeight: '900', fontSize: 13 },
  statsBar: { flexDirection: 'row', paddingVertical: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.border.subtle, marginTop: 10 },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { color: COLORS.text.primary, fontSize: 18, fontWeight: '900' },
  statLabel: { color: COLORS.text.secondary, fontSize: 9, fontWeight: '700' },
  tabBar: { flexDirection: 'row', height: 50 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: COLORS.blue.brand },
  gallerySection: { paddingHorizontal: 15, marginTop: 10 },
  galleryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  galleryTitle: { color: COLORS.text.secondary, fontSize: 11, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  gridImage: { width: COLUMN_WIDTH, height: COLUMN_WIDTH, borderRadius: 8, backgroundColor: COLORS.bg.card },
  menuList: { paddingHorizontal: 20, marginTop: 25 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, backgroundColor: COLORS.bg.card, borderWidth: 1, borderColor: COLORS.border.subtle },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { padding: 8, borderRadius: 8, marginRight: 15 },
  menuLabel: { color: COLORS.text.primary, fontSize: 15, fontWeight: '600' },
});

export default ProfileScreen;