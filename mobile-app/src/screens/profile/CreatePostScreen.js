import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function CreatePostScreen({ navigation }) {
  useEffect(() => {
    openGallery();
  }, []);

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(img => {
        navigation.replace('PostDetails', { image: img });
      })
      .catch(() => {
        navigation.goBack(); // if user cancels
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Opening gallery...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E10',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
