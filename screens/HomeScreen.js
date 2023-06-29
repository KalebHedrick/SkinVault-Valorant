import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity, Animated, Easing } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import {addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor, getVaultSize} from '../fetchData.js';
import React from "react";
import { Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import JsonQuery from 'json-query';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {Loading} from './LoadingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PageHead } from '../displayComponents.js';
import { Divider } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  
  return (<SafeAreaView style = {sty.container}>
    <PageHead headText={"Home"}/>
    <View style = {sty.welcome}>
    <Text style = {sty.topText}>Welcome to the SkinVault Home Screen!</Text>
    </View>
    <TouchableOpacity ><Text style = {sty.baseText}>First time Opening app? Click Here.</Text></TouchableOpacity>
    <View style ={sty.skinVault}><Text style = {sty.mainWheelHeadText}>Total Skins in Vault</Text>
    <SkinProgressCircle/>
    </View>
  </SafeAreaView>
  )
    
}
export default HomeScreen;
const sty = StyleSheet.create({
  container: {backgroundColor: appColors.BLACK, flex: 1},
  welcome: {alignSelf: "center", width: "70%",height:"25%", marginTop: windowHeight/50,borderWidth: 10, borderColor: appColors.RED},
  topText: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/50, color: appColors.WHITE, marginTop: windowHeight/50,
   textAlign:"center" },
  
  baseText: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/110,
    color: appColors.WHITE,  marginTop: windowHeight/80, lineHeight:windowHeight/30},
  
    mainWheelHeadText: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/55, color: appColors.WHITE},
  skinVault: {alignSelf: "center", justifyContent: "center", alignItems: "center", padding:(windowHeight+windowWidth)/60},
  divider: {width: "99.9%",height:1, alignSelf:"center", backgroundColor: appColors.WHITE},
  tinyLogo: {resizeMode:"contain",height: "100%", width: "100%", flex:1}
});
export const SkinProgressCircle = () => {
  const isFocused = useIsFocused()
const [loading, isLoading] = useState(true); //loading render state
const [reload, isReloaded] = useState(true); //reload page state
const [skinCount, setSkinCount] = useState(0); //number of skins owned state
const [skinsTotal, updateTotal] = useState(0); //total skins state
const [fill, setFill] = useState(0);
useEffect( () => {
  if (isFocused) { //sets loading state and reloads data.
    isLoading(true);
   isReloaded(!reload);
   
  }
   },[isFocused])
    useEffect( () => { //run on reload, gets data from skins owned to total skins
      let total = 0;
        getValueFor("Vault",1).then(res => res.split(",")).then(res => {res[0] == "noData" ? setSkinCount(0) : setSkinCount(res.length)})
        .catch((error) => {console.log(error)}).then(
          getValueFor('allData').then((res) =>{ //store all data in local storage
    
            res = JSON.parse(res);
            res = res.data;
            
            for (const element of res) {
              FetchWeaponbyUUID(element.uuid)          //get total number of skins
              .then(arr => { 
                arr = arr.data.skins;
                for (const element of arr) {
                  if (element.contentTierUuid != null) {
                  total++;
                  }
                }
                updateTotal(total);
              })
            }
          })
        ).then(setTimeout(() => {isLoading(false)},600)) //set timeout to allow short period for states to update
     },[reload])
     useEffect(() => {setFill((skinCount/skinsTotal)*100)},[loading])
    if (loading) { return <Text>Loading</Text>}
    else {}
   return (
    <AnimatedCircularProgress
  size={(windowHeight+windowWidth)/7}
  width={50}
  duration={2000}

  fill={skinCount/skinsTotal*100}
  tintColor={appColors.GREEN}
  backgroundColor={appColors.WHITE}>
  {
    (fill) => (
      <Text style = {sty.mainWheelHeadText}>
        {(Math.round(skinCount/skinsTotal*1000)) / 10}%
      </Text>
    )
  }
</AnimatedCircularProgress>
    )
}

  