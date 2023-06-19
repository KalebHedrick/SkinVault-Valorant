import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {FetchAllWeaponsData, FetchWeaponbyUUID, save, getValueFor} from './fetchData.js';
import {GetDefaultWeaponNames} from '../helperFunctions.js';
export const DefaultWeaponsScreen = () => {
    const [uuid, Setuuid] = useState([]);
    console.log("blagglgg");
    useEffect( () => {
    getValueFor("allData").then(res => { 
        res = JSON.parse(res);
        res = res.data;
        const tempUuid = [];
      for(const element of res) {
       tempUuid.push( <Text style = {styles.square}>{element.displayName}</Text>);
      }
    Setuuid(tempUuid);})
    },[])
   return (
    <ScrollView>{uuid}</ScrollView>)
   
}
const styles = StyleSheet.create({
    square: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    },
  });