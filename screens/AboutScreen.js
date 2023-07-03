import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Animated, Image } from 'react-native';
import React, { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { Dimensions } from 'react-native';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHead headText="About" />
      <View style={styles.info}>
        <LinearGradient colors={[appColors.RED, appColors.RED,appColors.RED, appColors.BLACK]} opacity={1} style={styles.gradient}>
          <Text style={styles.text}>
            VaultSkin was created as a tool for easily keeping track of your Valorant skins. The app was developed by Kaleb Hedrick as a personal project.
          </Text>
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={() => {
        Linking.openURL("https://github.com/KalebHedrick");
      }} style={styles.githubLink}>
        <Ionicons name="logo-github" size={windowHeight / 8} color={appColors.WHITE} />
        <Text style={styles.text2}>https://github.com/KalebHedrick</Text>
      </TouchableOpacity>
      <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
    </SafeAreaView>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.BLACK,
    flex: 1,
    
  },
  info: {
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: windowWidth * 0.05,
    opacity:1
  },
  gradient: {
    
    justifyContent: "center",
    padding: 30,
  },
  text: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 70,
    color: appColors.WHITE,
    textAlign: "center",
    opacity:1,
  },
  githubLink: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  text2: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 85,
    color: appColors.WHITE,
    marginLeft: 10,
  },
  logo: {
   // width: windowWidth,
    height: windowHeight / 2,
    alignSelf: "center",
    marginTop: 0,
    opacity:0.3,
  },
});
