import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
// 1. We must import Rect and Path with capital letters!
import Svg, { Path, Rect } from 'react-native-svg'; 

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoarding'); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* 2. Adjusted width, height, and viewBox so your logo actually fits on the screen */}
      <Svg width="250" height="150" viewBox="100 170 320 160">
        {/* Changed <rect> to <Rect> */}
        <Rect x="129.039" y="191.018" width="53.8592" height="13.9538" transform="rotate(36.3257 129.039 191.018)" fill="#4CC1D4"/>
        
        {/* Changed all <path> to <Path> */}
        <Path d="M183.205 185.077C180.154 185.077 177.68 187.551 177.68 190.603C177.68 193.654 180.154 196.127 183.205 196.127V202.205H120.773C120.773 189.389 131.163 179 143.978 179H183.205V185.077Z" fill="#ADF3FF"/>
        <Path d="M110 240.051C113.051 240.051 115.524 237.577 115.524 234.526C115.524 231.474 113.051 229.001 110 229.001L110 222.923L172.432 222.923C172.432 235.739 162.042 246.128 149.226 246.128L110 246.128L110 240.051Z" fill="#ADF3FF"/>
        <Path d="M208.94 193.94V204.865H230.315V219.02H208.94V231.085H233.165V246H190.32V179.025H233.165V193.94H208.94Z" fill="#ADF3FF"/>
        <Path d="M293.765 179.025V193.845H275.905V246H257.285V193.845H239.615V179.025H293.765Z" fill="#ADF3FF"/>
        <Path d="M205.655 255.025L189.22 322H166.325L157.11 280.96L147.705 322H124.81L108.565 255.025H128.705L136.495 300.815L147.04 255.025H167.465L177.725 300.435L185.515 255.025H205.655ZM232.176 269.94V280.865H253.551V295.02H232.176V307.085H256.401V322H213.556V255.025H256.401V269.94H232.176ZM343.787 255.025V322H325.167V285.045L312.532 322H296.952L284.222 284.76V322H265.602V255.025H288.117L304.932 298.535L321.367 255.025H343.787ZM372.626 255.025V293.88C372.626 297.49 373.45 300.277 375.096 302.24C376.806 304.203 379.371 305.185 382.791 305.185C386.211 305.185 388.776 304.203 390.486 302.24C392.26 300.213 393.146 297.427 393.146 293.88V255.025H411.766V293.88C411.766 300.023 410.468 305.28 407.871 309.65C405.275 313.957 401.728 317.218 397.231 319.435C392.798 321.588 387.858 322.665 382.411 322.665C376.965 322.665 372.088 321.588 367.781 319.435C363.538 317.218 360.181 313.957 357.711 309.65C355.305 305.343 354.101 300.087 354.101 293.88V255.025H372.626Z" fill="#8DE4F2"/>
      </Svg>
      
      <Text style={styles.tagline}>Discover. Connect. Experience.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoText: { color: '#fff', fontSize: 40, fontWeight: 'bold', marginTop: 20 },
  tagline: { color: '#94a3b8', fontSize: 16, marginTop: 10, letterSpacing: 1 },
});

export default SplashScreen;