import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {FetchAllWeaponsData, FetchWeaponbyUUID, save, getValueFor} from './fetchData.js';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultWeaponsScreen } from './defaultPanel';
export const AppRun = () => { //Called when the app starts from the main app file. Executes chain of functions to initialize and fetch api.
    const [fetching, isFetching] = useState(true);
    const [Loading, isLoading] = useState(true);
    useEffect( () => {
      if (fetching) { 
        
     let doneFetching;
     apiDataArray().then(res => {doneFetching = res}).then(res => {
      if (doneFetching) {
        isFetching(false);
       }
       else {
        console.log("failed to fetch startup data");
       }
     })
      }
      else {
        getValueFor("allData").then(res => { 
          res = JSON.parse(res);
          res = res.data;
        for(const element of res) {
          console.log(element.displayName + " UUID: " + element.uuid);
          save(element.displayName, element.uuid);
          
      }
     
    }).then(res => {
      isLoading(false)
      });
  }
  }, [fetching]);
    let results;
    if (Loading) {
      results = <Text>Loading</Text>
    }
    else {
      results = <DefaultWeaponsScreen/>
    }
  return results;
}

async function apiDataArray() { //returns array of all weapon content 
        
        const weaponsJson = FetchAllWeaponsData(); // call some api
            weaponsJson.then(json => {save('allData',(json))}).then(
        console.log("Weapon Data saved Locally"));
    return true;
}


  export const apiWeaponDataArray = (UUID) => { //returns array of weapon content given UUID
  
        const weaponsJson = FetchWeaponbyUUID(UUID); // call some api
        weaponsJson.then(json => {save(UUID,(json))}).then(
          console.log(UUID + " Data saved Locally"));
    return true;
}
