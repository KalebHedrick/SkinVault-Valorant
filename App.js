import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button, SafeAreaView,Dimensions } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';
import appColors from './assets/appColors'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createContext } from 'react';
// Screen components
import HomeScreen from './screens/HomeScreen';
import WeaponScreen from './screens/WeaponScreen';
import AppRun from './initializeApp';
import SkinsScreen from './screens/SkinsScreen';
import AboutScreen from './screens/AboutScreen';
//FONTS

let customFonts = {
  'RobotMain': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  'RobotMain_BOLD': require('./assets/fonts/RobotoMono-Bold.ttf'),
};

const App = () => {
  
  // load fonts
    const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
       <Drawer.Navigator
      initialRouteName="Startup"
      drawerContent={(props) => <DrawerContent {...props} />}
     screenOptions={{
      drawerStyle: {
        backgroundColor: appColors.RED,
        width: Dimensions.get('window').width / 1.5,
      },
      drawerType: "front",
      }
      }
    >
    <Drawer.Screen name = "Startup" component = {AppRun} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Home" component = {HomeScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Weapons" component = {WeaponScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Skins" component = {SkinsScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "About" component = {AboutScreen} options = {{headerShown: false}}/>
    </Drawer.Navigator>
    
    </NavigationContainer>
  );
};

export default App;
export const Drawer = createDrawerNavigator();
const DrawerContent = ({ navigation }) => {
  return (
    
    
<LinearGradient style={{ position: "absolute", 
       left:0,right: 0, top: 0,bottom: 0,
        }}
        colors={[appColors.RED, appColors.BLACK]}
        start={{x:0.05,y:0.05}}
        end={{x:1,y:1}}
      >

      <Text style={{ fontSize: 29, padding: 35,fontFamily: "RobotMain_BOLD" }}>
        SkinVault: Valorant
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={{ fontSize: 24, padding: 20 }}>Home</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Weapons")}><Text style={{ fontSize: 24, padding: 20 }}>All Skins</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Bundles")}><Text style={{ fontSize: 24, padding: 20 }}>All Bundles</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}><Text style={{ fontSize: 24, padding: 20,fontFamily: "RobotMain" }}>Settings</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}><Text style={{ fontSize: 24, padding: 20,fontFamily: "RobotMain" }}>About</Text></TouchableOpacity>
      <TouchableOpacity onPress={clearAsyncStorage}><Text style={{ fontSize: 24, padding: 20,fontFamily: "RobotMain" }}>clear async</Text></TouchableOpacity>
      <TouchableOpacity onPress={seeAsyncStorage}><Text style={{ fontSize: 24, padding: 20,fontFamily: "RobotMain" }}>view local storage</Text></TouchableOpacity>
      </LinearGradient>
  
    
  );
};

/**
 * debug tool to easily view keys in local storage
 */
seeAsyncStorage = async() => {       
  AsyncStorage.getAllKeys((err, keys) => {
    console.log(keys);
    
  /**
   * debug tool to easiy clear data in local storage
   */
  });}
  clearAsyncStorage = async() => {
      AsyncStorage.clear();
  }