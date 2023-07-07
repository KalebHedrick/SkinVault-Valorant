import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor } from '../fetchData.js';
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MainVaultScreen = ({navigation}) => {
    return (
        <SafeAreaView style = {styles.container}>
        <PageHead headText={"Vault"}></PageHead>
        <View style = {styles.tileContainer}>

        <TouchableOpacity onPress={() => navigation.navigate("SkinVault")} style = {styles.tile}>
        <Text style = {styles.tileText}>Skins</Text>
        <MaterialCommunityIcons name="pistol" size={(windowHeight+windowWidth)/7} color={appColors.WHITE} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CardVault")} style = {styles.tile}>
        <Text style = {styles.tileText}>Cards</Text>
        <MaterialCommunityIcons name="cards-outline" size = {(windowHeight+windowWidth)/7} color={appColors.WHITE} />
        </TouchableOpacity>

        </View>
        <View style = {styles.tileContainer}>

        <TouchableOpacity onPress={() => navigation.navigate("BuddyVault")} style = {styles.tile}><Text style = {styles.tileText}>Buddies</Text>
        <FontAwesome5 name="key" size = {(windowHeight+windowWidth)/8} color={appColors.WHITE} />
        </TouchableOpacity>

        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.BLACK,
    },
    tileContainer: {
      paddingTop: windowHeight/30,
      width: "100%",
      flexDirection: "row",
      alignContent:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    tile: {
      padding: 10,
      borderRadius: 15,
     alignItems:"center",
      marginBottom: 10, 
      
    },
    tileText: {
      fontFamily: "RobotMain",
      color: appColors.WHITE,
      fontSize: (windowHeight + windowWidth) / 40,
      minWidth: "50%",
      textAlign:"center"
      
    },
    tinyLogo: {
      resizeMode: "contain",
      height: "100%",
      width: "100%",
      flex: 1,
    },
    numText: {
      fontFamily: "RobotMain",
      color: appColors.WHITE,
      fontSize: (windowHeight + windowWidth) / 60,
      textAlign: "auto"
    },
  });
  export default MainVaultScreen;