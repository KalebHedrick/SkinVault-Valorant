import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import {addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor, getVaultSize} from '../fetchData.js';
import React from "react";
import { Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SettingsScreen = () => {
    const navigation = useNavigation();
return (
    <SafeAreaView style = {sty.container}>
    
        <PageHead headText="Settings"/>
        <View style= {sty.buttonContainer}>
       <TouchableOpacity onPress = {clearAsyncStorage} style = {sty.button}><Text style = {sty.optionText}>Clear Vault</Text></TouchableOpacity> 
       <TouchableOpacity onPress = {() => navigation.navigate("Tutorial")} style = {sty.button}><Text style = {sty.optionText}>View Tutorial</Text></TouchableOpacity> 
       <TouchableOpacity onPress={() => {
        Linking.openURL("https://ko-fi.com/kalebhedrick");}} style = {sty.button}><Text style = {sty.optionText}>Support the Creator</Text></TouchableOpacity> 
       </View>
    </SafeAreaView>
)
}
clearAsyncStorage = async() => {
    Alert.alert('Delete Vault', 'Are you sure you want to clear your vault? This action cannot be undone.', [
        {
          text: 'Yes',
          onPress: () => clearVault(),
          style: 'cancel',
        },
        {text: 'No'},
      ]);
    
    function clearVault() {
        AsyncStorage.clear();
        
        infiniteAlert = () => {
            Alert.alert('Storage Cleared', 'MUST RESTART APP TO CONTINUE',[ {text: 'OK', onPress: () => infiniteAlert()}]);
        }
        infiniteAlert();
       
    }
    
}
const sty = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.BLACK,

    },
    optionText: {
        fontFamily: "RobotMain_BOLD",
        fontSize: (windowHeight + windowWidth) / 70,
        color: appColors.WHITE,
        textAlign: "center",
        opacity:1,
       
        
    },
    button: {
        width: (windowHeight + windowWidth) / 7,
        height: (windowHeight + windowWidth) / 12,
        borderColor: appColors.RED,
        borderWidth: 5,
        alignItems:"center",
        justifyContent:"center"
        
    },
    buttonContainer: {
        flexDirection:"column",
        justifyContent: "space-evenly",
        alignItems:"flex-start",
        
        flex: 1,
        marginHorizontal: windowWidth/20
    }
})
export default SettingsScreen;