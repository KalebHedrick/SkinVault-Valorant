import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {FetchAllWeaponsData, FetchWeaponbyUUID} from './fetchData.js';

export const createWeaponObject = (Warray) => {
    const [isName, setName] = useState("");
    const [isIcon, setIcon] = useState("");
    useEffect(() => {
        
        setName(Warray.displayName);
        setIcon(Warray.displayIcon);
    
    }, []);
     

}