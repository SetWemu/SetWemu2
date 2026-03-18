import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatConversationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChatConversationScreen - Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChatConversationScreen;
