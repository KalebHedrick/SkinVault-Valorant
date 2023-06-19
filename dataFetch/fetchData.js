import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const FetchAllWeaponsData = async () => { //Return a promise with all weapons
    try {
        const response = await fetch(
          'https://valorant-api.com/v1/weapons',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
        );
        if (response.status == 200) { 
          
          console.log("ALL WEAPON DATA FROM API RETRIEVED");
          return await response.json();
        }
      } catch (error) {
        console.error(error + "IT DIDNT FETCH!!!");
      }
};

export const FetchWeaponbyUUID = async (WUUID) => { //Return a promise with all weapon data
    try {
        const response = await fetch(
          'https://valorant-api.com/v1/weapons/' + WUUID,
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
        );
        if (response.status == 200) { 
          
          console.log("Weapon with UUID" + WUUID + "Retreived")
          return await response.json();
        }
      } catch (error) {
        console.error(error + "IT DIDNT FETCH!!!");
      }
};
export const FetchWeaponSkinbyUUID = async (WUUID) => { //Return a promise with all data from skin
  try {
      const response = await fetch(
        'https://valorant-api.com/v1/weapons/skins/' + WUUID,
          {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'GET',
      }
      );
      if (response.status == 200) { 
        
        console.log("Weapon with UUID" + WUUID + "Retreived")
        return await response.json();
      }
    } catch (error) {
      console.error(error + "IT DIDNT FETCH!!!");
    }
};
export async function save(key, value) { //saves data to storage

  await AsyncStorage.setItem(key,JSON.stringify(value));
}
export async function getValueFor(key) { //returns data from storage
  let result = await AsyncStorage.getItem(key);
  if (result != null) {
    console.log("data with key: " + key + " retrieved from local storage");
    return result;
  }
  else {
    alert('Invalid data key!');
    getValueFor(key);
  }
}
