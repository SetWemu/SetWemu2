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
import {
  ArrowLeft,
  Heart,
  UserPlus,
  Ticket,
  CalendarCheck,
} from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { light: '#ADF3FF' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
  error: '#FF453A',
  success: '#30D158',
};

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'liked your event',
      time: '2h ago',
    },
    {
      id: '2',
      type: 'follow',
      user: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      text: 'started following you',
      time: '5h ago',
    },
    {
      id: '3',
      type: 'ticket',
      user: 'System',
      avatar: null,
      text: 'Your ticket for Tech Summit is confirmed',
      time: '1d ago',
    },
    {
      id: '4',
      type: 'event',
      user: 'Music Fest',
      avatar: 'https://i.pravatar.cc/150?img=3',
      text: 'Event starts tomorrow!',
      time: '2d ago',
    },
  ];

  const getIcon = type => {
    switch (type) {
      case 'like':
        return <Heart size={20} color={COLORS.error} weight="fill" />;
      case 'follow':
        return <UserPlus size={20} color={COLORS.blue.light} weight="bold" />;
      case 'ticket':
        return <Ticket size={20} color={COLORS.success} weight="bold" />;
      case 'event':
        return (
          <CalendarCheck size={20} color={COLORS.blue.light} weight="bold" />
        );
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.systemIcon}>{getIcon(item.type)}</View>
        )}
      </View>
      <View style={styles.notifInfo}>
        <Text style={styles.notifText}>
          <Text style={styles.userName}>{item.user}</Text> {item.text}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={notifications}
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
  iconContainer: { marginRight: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  systemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  notifInfo: { flex: 1 },
  notifText: { fontSize: 14, color: COLORS.text.primary, lineHeight: 20 },
  userName: { fontWeight: '700' },
  time: { fontSize: 12, color: COLORS.text.secondary, marginTop: 4 },
});

export default NotificationsScreen;
