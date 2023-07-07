import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef, useContext } from 'react';
import { getValueFor, save } from '../fetchData'
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentRenderContext, NavigationContainer, useNavigation, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { FetchWeaponbyUUID } from '../fetchData.js';
import appColors from '../assets/appColors.js';
import SkinsScreen from './SkinsScreen.js';
import { PageHead } from '../displayComponents.js';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from './LoadingScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import { getOwnedSkinsArr } from './VaultScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GeneratorScreen = ({ navigation }) => {
  const [uuid, setUuid] = useState([]); //use state for array of weapons
  const [currSelection, setSelection] = useState(0)  //state for current weapon hovered on generator
  const [endSelection, setEndSelection] = useState(0) // state for last weapon
  const [loadRandom, setLoadRandom] = useState(true)
  const [generation, setGeneration] = useState({name: "initial", icon: "initial"})
  const [vaultOnly, setVaultOnly] = useState(false);
  const [ownedButtonBorderColor, setOwnedButtonBorderColor] = useState(appColors.RED);
  const [reloadPage, setReloadPage] = useState(true);
  const firstLoad = useRef(true)
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
        setGeneration({name: "initial", icon: "initial"})
        setVaultOnly(false)
        setSelection(0);
        
    }
  },[isFocused]);
  useEffect(() => { //setup data for generator
    getValueFor("allData").then(res => {
      res = JSON.parse(res);
      res = res.data;
      const tempUuid = [];

      for (const element of res) {
        tempUuid.push({ name: element.displayName, icon: element.displayIcon });
      }

      setUuid(tempUuid);
      setEndSelection(tempUuid.length-1);
    });
  }, []);
  useEffect(() => { //toggle button border color
    if (vaultOnly) {
        setOwnedButtonBorderColor(appColors.GREEN)
    }
    else {
        setOwnedButtonBorderColor(appColors.RED)
    }
}, [vaultOnly]);
  useEffect(() => {
    
    if (firstLoad.current) {firstLoad.current = false}
    else {
        if (vaultOnly) {
            getOwnedSkinsArr(uuid[currSelection].name).then(skinArray => //get skin array from weapon
        {
            if (skinArray.length == 0) {
                setGeneration({name: "You have no " + uuid[currSelection].name + " skins in vault", icon: "noVault"})
            }
            else {
        const index =  Math.floor(Math.random() * skinArray.length); //get random index from skin array
        setGeneration(skinArray[index])
            }
        })
        }
        else {
    getSkinsArr(uuid[currSelection].name).then(skinArray => //get skin array from weapon
        {
        const index =  Math.floor(Math.random() * skinArray.length); //get random index from skin array
        setGeneration(skinArray[index])
        })
    }
    }
}, [loadRandom]);

  function PrevWeapon() {
    if (currSelection == 0) {
        setSelection(endSelection);
    }
    else {
        setSelection(currSelection - 1);
    }

  }
  function NextWeapon() {
    if (currSelection == endSelection) {
        setSelection(0)
    }
    else {
        setSelection(currSelection + 1);
    }
  }
  if (uuid.length === 0) {
    return <LoadingScreen />;
  } else {
    styles.ownedButton.borderColor = ownedButtonBorderColor;
    return (
      <SafeAreaView style={styles.container}>
      <PageHead headText="Generator" />
      <View style = {styles.pageContainer}>
      <View style = {{height: "18%"}}>
        <TouchableOpacity style = {[styles.ownedButton, {borderColor: ownedButtonBorderColor}]} 
         onPress={() => {
            setVaultOnly(!vaultOnly); 
            }}>
        <Text style = {styles.optionText}>Toggle Vault Skins Only</Text>
        </TouchableOpacity>
        </View>
        <View style= {styles.GenWrapper}>
        <TouchableOpacity style={styles.leftArrowWrapper} onPress={() =>PrevWeapon()}>
        <Ionicons name="arrow-back-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.square} onPress={() => setLoadRandom(!loadRandom)}>
        <Tile name={uuid[currSelection].name} icon={uuid[currSelection].icon} navigation={navigation} />
        </TouchableOpacity>
        <TouchableOpacity style= {styles.rightArrowWrapper} onPress={() => NextWeapon()}>
        <Ionicons name="arrow-forward-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11}/>
        </TouchableOpacity>
        </View>
        <View style = {styles.RandomTileContainer}>
        <RandomTile name = {generation.name} icon = {generation.icon}/>
        </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default GeneratorScreen;

const getSkinsArr = async(name) => { //returns array of all skins from name weapon (different from getSkinsArr in VaultScreen)
    let skins_loading = [];
    let uuid = await getValueFor(name); //get weapon uuid
    let weaponData = await FetchWeaponbyUUID(uuid); //fetch weapon JSON
    weaponData = weaponData.data.skins; //get array of skins from json
    pushSkin = async() => { //function to push each skin into array 
   for (const skin of weaponData) {
       let skinObj = await perSkin(skin);
       if (skinObj != false) {
       skins_loading.push(skinObj);
       }
    }
    return skins_loading; //return skins
}
return await pushSkin();
}
const perSkin = async(skin) => { //returns the skin object of given skin
let skinName = skin.displayName;
let iconPNG = skin.displayIcon;
if (iconPNG === null) {
    iconPNG = skin.levels[0].displayIcon;
  }
  if (skin.contentTierUuid !== null) {
        return ({ name: skinName, icon: iconPNG});
}
return false;
}

const Tile = props => {
    return (<>
      
        <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, fontSize: 20, textAlign:"center"}}>Random{"\n"}{props.name}{"\n"}Generator</Text>
        <Image fadeDuration = {0} style={styles.tinyLogo} source={{ uri: props.icon }} />
        </>
    );
  };

const RandomTile = props => {
    if (props.icon == "noVault") {
        return (<>
      
            <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, fontSize: (windowHeight+windowWidth)/70, textAlign:"center"}}>{props.name}</Text>
            <Ionicons name="sad" fadeDuration = {0} color={appColors.RED} size = {(windowHeight)/5} alignSelf = {"center"}/>
            </>
        );
    }
    else if (props.icon == "initial") {
        return (<>
      
            <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, fontSize: (windowHeight+windowWidth)/70, textAlign:"center"}}>Click the button to Generate A Skin</Text>
            <Ionicons name="cube" fadeDuration = {0} color={appColors.RED} size = {(windowHeight)/5} alignSelf = {"center"}/>
            </>
        );
    }
    else {
    return (<>
        <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, fontSize: (windowHeight+windowWidth)/70, textAlign:"center"}}>{props.name}</Text>
        
        <Image fadeDuration = {0} style={styles.generationIcon} source={{ uri: props.icon }} />
        
        </>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.BLACK,
    
  },
  pageContainer: {
    flexDirection:"column",
    gap:(windowHeight)/50,
    flex:1,
    marginTop: (windowHeight)/15
  },
  square: {
    elevation: 10,
    borderRadius: 20,
    backgroundColor: appColors.RED,
    padding: 15,
    flex:2,
    alignItems: "center"
  },
  tinyLogo: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  GenWrapper: {
    alignSelf: "center",
    width: "100%",
    height:"25%",
    flexDirection:"row",
   alignContent:"space-between",
  },
  leftArrowWrapper: {
    alignSelf:"stretch",
    justifyContent:"center"
  },
  rightArrowWrapper: {
    alignSelf:"stretch",
    justifyContent:"center"
  },
  optionText: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 70,
    color: appColors.WHITE,
    textAlign: "center",
    opacity:1,
},
ownedButton: {
    width: (windowHeight + windowWidth) / 7,
    height: (windowHeight + windowWidth) / 12,
    borderWidth: 5,
    alignItems:"center",
    justifyContent:"center",
    alignSelf: "center"
},
generationIcon: {
    resizeMode: "contain",
    height: "100%",
    width: "90%",
    flex:1,
    alignSelf:"center"
  },
  RandomTileContainer: {
    flex:1,
    marginTop: "10%"
  }
});


