import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {getValueFor, save} from './dataFetch/fetchData.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * This file defines all functions to help get retreive data for rendering.
 */

export function GetDefaultWeaponNames() {
   const ret = useRef([]);
    storeLocalData().then(res => console.log(res));
  // console.log(res + "hi");
   //for(let i = 0; i < dex;i++ ) {
   // console.log("this is dex:" + dex);
   // getValueFor("Dweap" + i).then(res =>{
   //     ret.current.push(res);
   // })
  // }
   //return ret.current;})
}

async function storeLocalData() {
    let index = useRef(0);
    getValueFor("allData").then(res => { 
        res = JSON.parse(res);
        res = res.data;
        
      for(let i = 0; i < res.length; i++) {
        save("Dweap" + i, res[i].displayName);
        console.log(res[i].displayName);
        //console.log(i);
        index.current++;
        console.log(index.current);
      }
    }).then(res=>{console.log(res);
    return index.current;});
}