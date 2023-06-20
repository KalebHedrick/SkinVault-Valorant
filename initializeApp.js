import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { FetchAllWeaponsData, FetchWeaponbyUUID, save, getValueFor } from './fetchData.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen.js';
const AppRun = ({navigation}) => { //Called when the app starts from the main app file. Executes chain of functions to initialize and fetch api.
  const [fetching, isFetching] = useState(true); //state for fetching data from api
  const [Loading, isLoading] = useState(true); //state for loading the app
  
  useEffect( () => {
    apiDataArray().then(() => {
    console.log("finished async")
   getValueFor('allData').then((res) =>{
   console.log(res + " parse Value");
        res = JSON.parse(res);
        res = res.data;
        for (const element of res) {
          console.log(element.displayName + " UUID: " + element.uuid);
          save(element.displayName, element.uuid);
        }
        isLoading(false);})})
      /*apiDataArray().then(() => {
      return getValueFor('allData')}).then((res) => {
        console.log(res + " parse Value");
        res = JSON.parse(res);
        res = res.data;
        for (const element of res) {
          console.log(element.displayName + " UUID: " + element.uuid);
          save(element.displayName, element.uuid);
        }
        }).then(() => isLoading(false));*/
    },[]);
  
  let results;
  if (Loading) {
  
    results = <Text style = {{padding: 50, flex: 1}}>Loading</Text>
  }
  else {
    console.log("yerp");
    results = <HomeScreen/>
  }
  return results;
}
export default AppRun;

async function apiDataArray() { //returns array of all weapon content 
  const weaponsJson = await FetchAllWeaponsData();
  console.log("saving");
  return await save('allData', (weaponsJson));
//FetchAllWeaponsData().then(json => { save('allData', (json)) }).then(() =>{
 //   console.log("Weapon Data saved Locally")
  //  return true;});
  
}


export const apiWeaponDataArray = (UUID) => { //returns array of weapon content given UUID

  const weaponsJson = FetchWeaponbyUUID(UUID); // call some api
  weaponsJson.then(json => { save(UUID, (json)) }).then(
    console.log(UUID + " Data saved Locally"));
  return true;
}
