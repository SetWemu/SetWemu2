import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const COLORS = {
  bg: { primary: '#141416' },
  text: { secondary: '#ABABAB' },
};

export default function CreatePostScreen({ navigation }) {
  useEffect(() => {
    openGallery();
  }, []);

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && response.assets?.[0]) {
        navigation.replace('PostDetails', { image: response.assets[0] });
      } else {
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opening gallery...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: COLORS.text.secondary, fontSize: 14 },
});
