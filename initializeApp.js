import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { FetchAllWeaponsData, FetchWeaponbyUUID, save, getValueFor, FetchWeaponSkinbyUUID, checkVaultSkins } from './fetchData.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeaponScreen from './screens/WeaponScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import { useNavigation } from '@react-navigation/native';
const AppRun = ({navigation}) => { //Called when the app starts from the main app file. Executes chain of functions to initialize and fetch api.
  const [Loading, isLoading] = useState(true); //state for loading the app
  useEffect( () => {
    apiDataArray().then(() => {
   getValueFor('allData').then((res) =>{ //store all data in local storage
    
        res = JSON.parse(res);
        res = res.data;
        let total = 0;
        for (const element of res) {
          save(element.displayName, element.uuid); //save data for each weapon

          FetchWeaponbyUUID(element.uuid)          //get total number of skins
          .then(arr => { 
            arr = arr.data.skins;
            for (const element of arr) {
              total++;
              
            }
            updateTotal(total);
          })
        }
      }).then(() => {
        checkVaultSkins().then(isLoading(false))})})
        
    },[]);
  
  let results;
  
  if (Loading) {
    results = <Text style = {{padding: 50, flex: 1}}>Loading</Text>
  }
  else {
    results = <HomeScreen/>
  }
  return results;
}
export default AppRun;

async function apiDataArray() { //returns array of all weapon content 
  const weaponsJson = await FetchAllWeaponsData();
  return await save('allData', (weaponsJson));
  
}


