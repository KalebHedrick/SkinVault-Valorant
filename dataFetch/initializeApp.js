import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {FetchAllWeaponsData, FetchWeaponbyUUID} from './fetchData.js';
import { createWeaponObject } from './weaponObject.js';
import GLOBALS from '../Globals';
export const AppRun = () => { //Called when the app starts from the main app file. Executes chain of functions to initialize and fetch api.
    //const allWeapons = useRef([])
    const mainData = apiDataArray();
  for(const element of mainData) {
    console.log(element.displayName + " UUID: " + element.uuid);
    const newWeapon = createWeaponObject(apiWeaponDataArray(element.UUID));
   // allWeapons.current.push(newWeapon);
   GLOBALS.weaponArray.push(newWeapon);
  }
  return (
    <Text>wowzers</Text>
  )
}

export const apiDataArray = () => { //returns array of all weapon content 
    const aRef = useRef([]);
    useEffect(() => {
        
        const weaponsJson = FetchAllWeaponsData(); // call some api
            weaponsJson.then(json => {aRef.current = json.data});
       
    }, []);
    return aRef.current;
}


  export const apiWeaponDataArray = (UUID) => { //returns array of weapon content given UUID
    const aRef = useRef([]);
    useEffect(() => {
        
        const weaponsJson = FetchWeaponbyUUID(UUID); // call some api
            weaponsJson.then(json => {aRef.current = json.data});
       
    }, []);
    return aRef.current;
}