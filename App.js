import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';
//import {FetchAllWeaponsData, FetchWeaponbyUUID} from './dataFetch/fetchData.js';
import { AppRun } from './dataFetch/initializeApp';
import GLOBALS from '../Globals';

export default function App() {
 
 console.log(GLOBALS.weaponArray[2]);
  return (<>
    <View style={styles.container}>
      <Text>Open  Apjs to sart working on your app!</Text>
      <StatusBar style="auto" />
      <Text>hi</Text>
      <AppRun/>
    </View>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100
  },
});


