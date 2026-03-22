import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ArrowLeft, UserPlus, MapPin } from 'phosphor-react-native';

const COLORS = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', brand: '#4CC1D4' },
  text: {
    primary: '#F2F2F7',
    secondary: '#ABABAB',
    tertiary: '#6B6B6B',
    inverse: '#141416',
  },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

export default function PostDetailsScreen({ route, navigation }) {
  const image = route?.params?.image;
  const [caption, setCaption] = useState('');
  const [taggedPeople, setTaggedPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!image) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No image selected</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleShare = () => {
    if (!caption.trim()) {
      Alert.alert('Add Caption', 'Please write a caption for your post');
      return;
    }

    // TODO: Implement actual post sharing logic
    Alert.alert('Post Shared!', 'Your post has been shared successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.text.primary} weight="bold" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Post</Text>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShare}
          disabled={!caption.trim()}
        >
          <Text
            style={[
              styles.shareText,
              !caption.trim() && styles.shareTextDisabled,
            ]}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image source={{ uri: image.path }} style={styles.image} />

        {/* CAPTION */}
        <View style={styles.captionContainer}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?name=You&background=4CC1D4&color=141416&size=100',
            }}
            style={styles.avatar}
          />

          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor={COLORS.text.tertiary}
            value={caption}
            onChangeText={setCaption}
            style={styles.input}
            multiline
            maxLength={2200}
          />
        </View>

        {/* OPTIONS */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                'Coming Soon',
                'Tag people feature will be available soon',
              )
            }
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <UserPlus size={20} color={COLORS.blue.brand} weight="bold" />
              </View>
              <Text style={styles.optionText}>
                Tag People{' '}
                {taggedPeople.length > 0 && `(${taggedPeople.length})`}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                'Coming Soon',
                'Add location feature will be available soon',
              )
            }
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <MapPin size={20} color={COLORS.blue.brand} weight="bold" />
              </View>
              <Text style={styles.optionText}>
                {selectedLocation ? selectedLocation : 'Add Location'}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },

  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },

  headerTitle: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },

  shareBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.blue.brand,
  },

  shareText: {
    color: COLORS.text.inverse,
    fontWeight: '900',
    fontSize: 14,
  },

  shareTextDisabled: {
    opacity: 0.5,
  },

  image: {
    width: '100%',
    height: 400,
    backgroundColor: COLORS.bg.card,
  },

  captionContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.blue.brand,
  },

  input: {
    flex: 1,
    color: COLORS.text.primary,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  optionsContainer: {
    padding: 16,
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.blue.brand + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    color: COLORS.text.primary,
    fontSize: 15,
    fontWeight: '600',
  },

  arrow: {
    color: COLORS.text.tertiary,
    fontSize: 24,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: COLORS.text.secondary,
    fontSize: 16,
    marginBottom: 20,
  },

  backBtn: {
    backgroundColor: COLORS.blue.brand,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  backBtnText: {
    color: COLORS.text.inverse,
    fontWeight: '900',
    fontSize: 14,
  },
});
