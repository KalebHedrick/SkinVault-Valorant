import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity, Animated, Easing } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { FetchAllCardData, addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor, getVaultSize } from '../fetchData.js';
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import JsonQuery from 'json-query';
import { FetchWeaponbyUUID, FetchAllBuddyData } from '../fetchData.js';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PageHead } from '../displayComponents.js';
import { Divider } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//WHEEL SCALARS
let wheelSize = (windowHeight + (windowWidth/2)) / 7;
let wheelWidth = (windowHeight + (windowWidth/2)) / 40;
let outerWheelTextSize = (windowHeight + windowWidth) / 50;
let innerWheelTextSize = (windowHeight + windowWidth) / 60;
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <PageHead headText={"Home"} />
      <View style={styles.welcomeContainer}>
        <Text style={styles.topText}>Welcome to the SkinVault Home Screen!</Text>
        <View style={styles.border} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}><Text style={styles.baseText}>First time Opening app? Click Here.</Text></TouchableOpacity>
      <View style={styles.skinVault}>
        <Text style={styles.outerWheelText}>Skins</Text>
        <SkinProgressCircle />
      </View>
      <View style = {styles.otherVaults}>
      <View>
      <Text style={styles.outerWheelText}>Cards</Text>
      <CardProgressCircle/>
      </View>
      <View>
      <Text style={styles.outerWheelText}>Buddies</Text>
      <BuddyProgressCircle/>
      </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

export const SkinProgressCircle = () => {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true); //loading render state
  const [reload, isReloaded] = useState(true); //reload page state
  const [skinCount, setSkinCount] = useState(0); //number of skins owned state
  const [skinsTotal, updateTotal] = useState(0); //total skins state
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (isFocused) { //sets loading state and reloads data.
      isLoading(true);
      isReloaded(!reload);
    }
  }, [isFocused]);

  useEffect(() => { //run on reload, gets data from skins owned to total skins
    let total = 0;
    getValueFor("Vault", 1)
      .then(res => res.split(","))
      .then(res => {
        res[0] == "noData" ? setSkinCount(0) : setSkinCount(res.length);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(
        getValueFor('allData')
          .then((res) => { //store all data in local storage
            res = JSON.parse(res);
            res = res.data;

            for (const element of res) {
              FetchWeaponbyUUID(element.uuid) //get total number of skins
                .then(arr => {
                  arr = arr.data.skins;
                  for (const element of arr) {
                    if (element.contentTierUuid != null) {
                      total++;
                    }
                  }
                  updateTotal(total);
                });
            }
          })
      )
      .then(setTimeout(() => {
        isLoading(false);
      }, 600)); //set timeout to allow short period for states to update
  }, [reload]);

  useEffect(() => {
    setFill((skinCount / skinsTotal) * 100);
  }, [loading]);

  if (loading) {
    return <View></View>;
  } else {
    return (
      <AnimatedCircularProgress
        size={wheelSize}
        width={wheelWidth}
        duration={2000}
        fill={skinCount / skinsTotal * 100}
        tintColor={appColors.GREEN}
        backgroundColor={appColors.WHITE}
      >
        {
          (fill) => (
            <Text style={styles.innerWheel}>
              {(Math.round(skinCount / skinsTotal * 1000)) / 10}%
            </Text>
          )
        }
      </AnimatedCircularProgress>
    );
  }
}

export const CardProgressCircle = () => {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true); //loading render state
  const [reload, isReloaded] = useState(true); //reload page state
  const [skinCount, setSkinCount] = useState(0); //number of skins owned state
  const [skinsTotal, updateTotal] = useState(0); //total skins state
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (isFocused) { //sets loading state and reloads data.
      isLoading(true);
      isReloaded(!reload);
    }
  }, [isFocused]);

  useEffect(() => { //run on reload, gets data from skins owned to total skins
    let total = 0;
    getValueFor("Card", 1)
      .then(res => res.split(","))
      .then(res => {
        res[0] == "noData" ? setSkinCount(0) : setSkinCount(res.length);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(
        FetchAllCardData()
          .then((res) => { //store all data in local storage
            res = res.data;
            updateTotal(res.length)
          })
      )
      .then(setTimeout(() => {
        isLoading(false);
      }, 600)); //set timeout to allow short period for states to update
  }, [reload]);

  useEffect(() => {
    setFill((skinCount / skinsTotal) * 100);
  }, [loading]);

  if (loading) {
    return <View></View>;
  } else {
    return (
      <AnimatedCircularProgress
        size={wheelSize}
        width={wheelWidth}
        duration={2000}
        fill={skinCount / skinsTotal * 100}
        tintColor={appColors.GREEN}
        backgroundColor={appColors.WHITE}
      
      >
        {
          (fill) => (
            <Text style={styles.innerWheel}>
              {(Math.round(skinCount / skinsTotal * 1000)) / 10}%
            </Text>
          )
        }
      </AnimatedCircularProgress>
    );
  }
}
export const BuddyProgressCircle = () => {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true); //loading render state
  const [reload, isReloaded] = useState(true); //reload page state
  const [skinCount, setSkinCount] = useState(0); //number of skins owned state
  const [skinsTotal, updateTotal] = useState(0); //total skins state
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (isFocused) { //sets loading state and reloads data.
      isLoading(true);
      isReloaded(!reload);
    }
  }, [isFocused]);

  useEffect(() => { //run on reload, gets data from skins owned to total skins
    let total = 0;
    getValueFor("Buddy", 1)
      .then(res => res.split(","))
      .then(res => {
        res[0] == "noData" ? setSkinCount(0) : setSkinCount(res.length);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(
        FetchAllBuddyData()
          .then((res) => { //store all data in local storage
            res = res.data;
            updateTotal(res.length)
          })
      )
      .then(setTimeout(() => {
        isLoading(false);
      }, 600)); //set timeout to allow short period for states to update
  }, [reload]);

  useEffect(() => {
    setFill((skinCount / skinsTotal) * 100);
  }, [loading]);

  if (loading) {
    return <View></View>;
  } else {
    return (
      <AnimatedCircularProgress
        size={wheelSize}
        width={wheelWidth}
        duration={2000}
        fill={skinCount / skinsTotal * 100}
        tintColor={appColors.GREEN}
        backgroundColor={appColors.WHITE}
      
      >
        {
          (fill) => (
            <Text style={styles.innerWheel}>
              {(Math.round(skinCount / skinsTotal * 1000)) / 10}%
            </Text>
          )
        }
      </AnimatedCircularProgress>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.BLACK,
    flex: 1,
  },
  welcomeContainer: {
    alignSelf: "center",
    width: "60%",
    height: "25%",
    marginTop: windowHeight / 50,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 50,
    color: appColors.WHITE,
    textAlign: "center",
  },
  border: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 10,
    borderColor: appColors.RED,
    borderRadius: (windowHeight + windowWidth) / 50,
    opacity: 1,
  },
  baseText: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 110,
    color: appColors.WHITE,
    marginTop: windowHeight / 80,
    lineHeight: windowHeight / 30,
    textAlign: "center",
  },
  outerWheelText: {
    fontFamily: "RobotMain",
    fontSize: outerWheelTextSize,
    color: appColors.WHITE,
    textAlign: "center",
  },
  innerWheel: {
    fontFamily: "RobotMain",
    fontSize: innerWheelTextSize,
    color: appColors.WHITE,
    textAlign: "center",
  },
  skinVault: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: (windowHeight + windowWidth) / 40,
  },
  otherVaults: {
    flexDirection:"row",
    alignContent:"space-around",
    flex:1,
    justifyContent:"space-evenly"
  }
});
