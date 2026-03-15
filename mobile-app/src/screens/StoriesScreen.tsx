import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const StoriesScreen = ({ navigation }: any) => {
  // State for the heart interaction
  const [isLiked, setIsLiked] = useState(false);

  const storyData = {
    username: 'Amandi De Silva',
    avatar: 'https://i.pravatar.cc/150?img=9',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800&q=80',
    time: '2h ago',
  };

  // Navigation handlers
  const handleNextStory = () => console.log("Next story tapped");
  const handlePrevStory = () => console.log("Previous story tapped");

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* 1. Background Layer */}
      <Image source={{ uri: storyData.image }} style={styles.backgroundImage} />
      <View style={styles.overlay} />

      {/* 2. Invisible Navigation Layer (Tapping sides) */}
      <View style={styles.touchControls}>
        <TouchableOpacity style={styles.touchArea} onPress={handlePrevStory} />
        <TouchableOpacity style={styles.touchArea} onPress={handleNextStory} />
      </View>

      {/* 3. Top Layer: Progress Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
        <View style={styles.progressBarInactive} />
      </View>

      {/* 4. Top Layer: Header (Profile & Close) */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo} 
          onPress={() => navigation.navigate('ChatSettings')} // Redirect placeholder
          activeOpacity={0.8}
        >
          <Image source={{ uri: storyData.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{storyData.username}</Text>
            <Text style={styles.timeText}>{storyData.time}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Icon name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 5. Bottom Layer: Footer (Reply & Reaction) */}
      <View style={styles.footer}>
        <TextInput 
          style={styles.replyInput}
          placeholder="Send a message..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
        
        <TouchableOpacity 
          style={styles.actionIcon} 
          onPress={() => setIsLiked(!isLiked)}
        >
          <Icon 
            name={isLiked ? "heart" : "heart-outline"} 
            size={30} 
            color={isLiked ? "#EF4444" : "#fff"} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionIcon}>
          <Icon name="paper-plane-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundImage: { width, height, position: 'absolute', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },
  
  // Navigation Touch Areas (Hidden but functional)
  touchControls: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 5,
  },
  touchArea: { flex: 1 },

  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 15,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 20,
  },
  progressBarActive: { flex: 1, height: 2.5, backgroundColor: '#fff', marginHorizontal: 2, borderRadius: 2 },
  progressBarInactive: { flex: 1, height: 2.5, backgroundColor: 'rgba(255, 255, 255, 0.3)', marginHorizontal: 2, borderRadius: 2 },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 25, 
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10, borderWidth: 1.5, borderColor: '#4CC1D4' },
  username: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  timeText: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  closeBtn: { padding: 5 },

  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    zIndex: 30, 
  },
  replyInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  actionIcon: { marginLeft: 15 },
});

export default StoriesScreen;