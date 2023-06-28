import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity } from 'react-native';
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
const HomeScreen = props => {
  const isFocused = useIsFocused()
const [loading, isLoading] = useState(true)

useEffect( () => {
  if (isFocused) {
   isLoading(false)
  }
   },[isFocused])
    useEffect( () => {
      
     },[])
      
    if (loading) { return <Loading/>}
   return (
   <SafeAreaView><Text>{props.skinCount / props.totalSkins}</Text></SafeAreaView>
    )
    
}
export default HomeScreen;
  