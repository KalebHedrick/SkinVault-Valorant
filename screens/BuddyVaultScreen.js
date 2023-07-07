import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { FetchAllBuddyData,checkBuddyBuddy, checkBuddySkin, getValueFor } from '../fetchData.js';
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BuddyVaultScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [loadedBuddys, setLoadedBuddys] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [buddysReady, setBuddysReady] = useState(false);

  useEffect(() => {
    if (isFocused) {
        
      setLoadedBuddys([]); //reset loaded buddys
        hasReloaded(!reload); //trigger a page reload
        setBuddysReady(false); //reset flatlist render trigger
      };
    }
  ,[isFocused]);
  
  useEffect(() => {
    loadBuddies = async() => {
        let owned = await getValueFor("Buddy",1);
        let res = await FetchAllBuddyData();
        res = await res.data;
            let buddys_loading = [];
            
      for (const element of res) { //for each weapon of allData
        
          let checkOwned = checkBuddySkin(element.uuid, owned)
            if (checkOwned) {
            buddys_loading.push({ name: element.displayName, icon: element.displayIcon});
            }
        }
        setLoadedBuddys(buddys_loading);
    }
    loadBuddies().then(setTimeout(() => setBuddysReady(true), 1000)); //render page after a second to give time for images to process
    
}, [reload]);

  if (!buddysReady) {
    return <LoadingScreen />;
  } else {
    const renderitem = ({ item }) => <Tile name={item.name} icon={item.icon} navigation={navigation} />
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText={"Vault Buddies"}/>
        <FlatList
          data={loadedBuddys}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={renderitem}
        />
      </SafeAreaView>
    );
  }
};

export default BuddyVaultScreen;



const Tile = props => {
  return (
    <View
      style={styles.square}>
      <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, minWidth:"50%", fontSize: (windowHeight + windowWidth) / 120, }}>{props.name}</Text>
      <Image style={styles.tinyLogo} source={{ uri: props.icon }} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.BLACK,
    },
    flatListContent: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 20,
    },
    square: {
      maxWidth: "31.5%",
      height: 100,
      elevation: 10,
      borderRadius: 15,
      alignItems: "center",
      padding: 10,
      marginRight: 10,
      marginBottom: 2,
      display: "flex",
      flex: 1,
      backgroundColor: appColors.GREEN,
    },
    tinyLogo: {
      resizeMode: "contain",
      height: "100%",
      width: "100%",
      flex: 1,
    },
  });