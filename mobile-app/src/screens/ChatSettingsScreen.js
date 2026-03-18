import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Switch, 
  ScrollView, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Official SetWemu Design System Colors
const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { lightest: '#D6F9FF', light: '#ADF3FF', brand: '#4CC1D4', glow: 'rgba(173,243,255,0.10)', border: 'rgba(173,243,255,0.22)' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B', inverse: '#141416' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  success: '#30D158',
  error: '#FF453A',
  gold: '#FFD700',
};

const ChatSettingsScreen = ({ navigation, route }) => {
  const { userName, userImage } = route.params || { 
    userName: 'User', 
    userImage: 'https://via.placeholder.com/150' 
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={28} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Info</Text>
          <View style={{ width: 28 }} /> 
        </View>

        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userImage }} style={styles.avatar} />
          </View>
          <Text style={styles.userNameText}>{userName}</Text>
          <Text style={styles.statusText}>Online</Text>
        </View>

        {/* ACTION GRID */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.iconCircle}>
              <Icon name="phone" size={22} color={COLORS.blue.brand} />
            </View>
            <Text style={styles.gridLabel}>Audio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.iconCircle}>
              <Icon name="video" size={22} color={COLORS.blue.brand} />
            </View>
            <Text style={styles.gridLabel}>Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.iconCircle}>
              <Icon name="star-outline" size={22} color={COLORS.gold} />
            </View>
            <Text style={styles.gridLabel}>Favorite</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.iconCircle}>
              <Icon name="magnify" size={22} color={COLORS.blue.brand} />
            </View>
            <Text style={styles.gridLabel}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* PREFERENCES SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.card}>
            {/* Mute Notifications */}
            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(83, 193, 222, 0.1)' }]}>
                  <Icon name="bell-outline" size={20} color={COLORS.blue.brand} />
                </View>
                <Text style={styles.listText}>Mute Notifications</Text>
              </View>
              <Switch 
                trackColor={{ false: '#3A3A3C', true: COLORS.blue.brand }} 
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Media, Links, and Docs */}
            <TouchableOpacity style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                  <Icon name="image-outline" size={20} color="#A855F7" />
                </View>
                <Text style={styles.listText}>Media, Links, and Docs</Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.text.tertiary} />
            </TouchableOpacity>

            {/* Export Chat */}
            <TouchableOpacity style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
                  <Icon name="export-variant" size={20} color={COLORS.text.secondary} />
                </View>
                <Text style={styles.listText}>Export Chat</Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.text.tertiary} />
            </TouchableOpacity>

            {/* Clear Chat */}
            <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 0 }]}>
              <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]}>
                  <Icon name="trash-can-outline" size={20} color={COLORS.error} />
                </View>
                <Text style={[styles.listText, { color: COLORS.error }]}>Clear Chat</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRIVACY & SUPPORT */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>PRIVACY & SUPPORT</Text>
          
          <TouchableOpacity style={styles.dangerButton}>
             <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]}>
                  <Icon name="slash-circle" size={20} color={COLORS.error} />
                </View>
                <Text style={[styles.listText, { color: COLORS.error }]}>Block {userName}</Text>
             </View>
             <Icon name="chevron-right" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dangerButton, { marginTop: 12 }]}>
             <View style={styles.listLeft}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]}>
                  <Icon name="flag-outline" size={20} color={COLORS.error} />
                </View>
                <Text style={[styles.listText, { color: COLORS.error }]}>Report {userName}</Text>
             </View>
             <Icon name="chevron-right" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    padding: 3,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userNameText: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 32,
  },
  gridItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.bg.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  gridLabel: {
    color: COLORS.blue.light,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    color: COLORS.text.tertiary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.bg.card,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  dangerButton: {
    backgroundColor: COLORS.bg.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
    height: 64, 
  },
});

export default ChatSettingsScreen;