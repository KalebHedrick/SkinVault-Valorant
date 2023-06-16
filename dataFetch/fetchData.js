import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

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
          
          console.log("All Weapons Fetch Retrieved");
          return await response.json();
        }
      } catch (error) {
        console.error(error);
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
          
          console.log("Weapon with UUID" + WUUID + "Retreived");
          return await response.json();
        }
      } catch (error) {
        console.error(error);
      }
};
