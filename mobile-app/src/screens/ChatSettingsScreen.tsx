import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatSettingsScreen = ({ navigation }: any) => {
  const [isMuted, setIsMuted] = useState(false);

  const userData = {
    name: 'Kasun Perera',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Tech enthusiast and lead developer. Let’s connect and talk about React Native!',
  };

  const SettingItem = ({ icon, title, color = '#fff', onPress, type = 'arrow' }: any) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Icon name={icon} size={22} color={color} />
        </View>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
      </View>
      
      {type === 'arrow' && <Icon name="chevron-forward" size={20} color="#475569" />}
      {type === 'switch' && (
        <Switch
          value={isMuted}
          onValueChange={setIsMuted}
          trackColor={{ false: '#334155', true: '#4CC1D4' }}
          thumbColor="#fff"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Info</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: userData.avatar }} style={styles.largeAvatar} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userRole}>{userData.role}</Text>
          <Text style={styles.userBio}>{userData.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <SettingItem 
            icon="notifications-off-outline" 
            title="Mute Notifications" 
            type="switch" 
            color="#4CC1D4" 
          />
          <SettingItem 
            icon="star-outline" 
            title="Add to Favorites" 
            color="#FBBF24" 
          />
          <SettingItem 
            icon="images-outline" 
            title="Media, Links, and Docs" 
            color="#A855F7" 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Privacy & Support</Text>
          <SettingItem 
            icon="ban-outline" 
            title="Block User" 
            color="#EF4444" 
          />
          <SettingItem 
            icon="flag-outline" 
            title="Report User" 
            color="#EF4444" 
          />
        </View>

        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={() => console.log("Clear chat history")}
        >
          <Text style={styles.deleteText}>Clear Chat History</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1E293B',
  },
  backButton: { padding: 5 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  profileSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  largeAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 3, borderColor: '#4CC1D4' },
  userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  userRole: { color: '#4CC1D4', fontSize: 16, marginTop: 4 },
  userBio: { color: '#94a3b8', textAlign: 'center', marginTop: 15, lineHeight: 20, paddingHorizontal: 10 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionLabel: { color: '#475569', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, marginLeft: 10 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { padding: 8, borderRadius: 10, marginRight: 15 },
  settingTitle: { fontSize: 16, fontWeight: '500' },
  deleteBtn: {
    margin: 30,
    padding: 18,
    borderRadius: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
  },
  deleteText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
});

export default ChatSettingsScreen;