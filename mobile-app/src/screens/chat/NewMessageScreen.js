import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { ArrowLeft, MagnifyingGlass } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E' },
  blue: { brand: '#4CC1D4' },
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

const NewMessageScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: '1',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      username: '@sarah_w',
    },
    {
      id: '2',
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      username: '@dchen',
    },
    {
      id: '3',
      name: 'Emma Brown',
      avatar: 'https://i.pravatar.cc/150?img=3',
      username: '@emmab',
    },
    {
      id: '4',
      name: 'Tech Events SL',
      avatar: 'https://i.pravatar.cc/150?img=5',
      username: '@techevents',
    },
  ];

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('ChatConversation', { chat: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Message</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <MagnifyingGlass size={18} color={COLORS.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      {/* Contacts */}
      <FlatList
        data={contacts}
        renderItem={renderContact}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.bg.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.text.primary,
  },
  list: { paddingHorizontal: 20 },
  contactItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
    alignItems: 'center',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  contactInfo: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  username: { fontSize: 13, color: COLORS.text.secondary },
});

export default NewMessageScreen;
