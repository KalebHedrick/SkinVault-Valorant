import React from 'react';
import { StyleSheet, Text, View,Dimensions, StatusBar,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from "expo-font";
import appColors from './assets/appColors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons'
import { LogBox } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
// Screen components
import HomeScreen from './screens/HomeScreen';
import WeaponScreen from './screens/WeaponScreen';
import AppRun from './initializeApp';
import SkinsScreen from './screens/SkinsScreen';
import AboutScreen from './screens/AboutScreen';
import  LoadingScreen from './screens/LoadingScreen';
import VaultScreen from './screens/VaultScreen';
import SettingsScreen from './screens/SettingsScreen';
import GeneratorScreen from './screens/GeneratorScreen';
import CardsScreen from './screens/CardsScreen';
import BuddysScreen from './screens/BuddysScreen';
import MainVaultScreen from './screens/MainVaultScreen';
import BuddyVaultScreen from './screens/BuddyVaultScreen';
import CardVaultScreen from './screens/CardVaultScreen';
import TutorialScreen from './screens/TutorialScreen';
//FONTS

let customFonts = {
  'RobotMain': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  'RobotMain_BOLD': require('./assets/fonts/RobotoMono-Bold.ttf'),
};
LogBox.ignoreAllLogs(); //Ignore all log notifications
const App = () => {
  
  // load fonts
    const [isLoaded] = useFonts(customFonts);
  
  if (!isLoaded) {
    return <LoadingScreen/>;
  }
  return (
    <NavigationContainer>
    <StatusBar animated={true} backgroundColor={appColors.BLACK}/>
       <Drawer.Navigator
      initialRouteName="Startup"
      drawerContent={(props) => <DrawerContent {...props} />}
     screenOptions={{
      drawerStyle: {
        backgroundColor: appColors.BLACK,
        width: Dimensions.get('window').width / 1.8,
      },
      drawerType: "front",
      }
      }
      /**NAVIGATION SCREENS */
    >
    <Drawer.Screen name = "Startup" component = {AppRun} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Home" component = {HomeScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Weapons" component = {WeaponScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Skins" component = {SkinsScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "About" component = {AboutScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Vault" component = {MainVaultScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "SkinVault" component = {VaultScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Settings" component = {SettingsScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Generator" component = {GeneratorScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Cards" component = {CardsScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "CardVault" component = {CardVaultScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Buddys" component = {BuddysScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "BuddyVault" component = {BuddyVaultScreen} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Tutorial" component = {TutorialScreen} options = {{headerShown: false}}/>
    </Drawer.Navigator>
    
    </NavigationContainer>
  );
};

export default App;
export const Drawer = createDrawerNavigator();
const DrawerContent = ({ navigation }) => {
  return (<>
     <View style={{justifyContent: "space-evenly", flex:1, flexDirection:"column",  }}>
     <View style = {{height:"10%", width:"100%", paddingBottom: windowHeight/30}}>
     <Image style = {{width:undefined,height:"100%", aspectRatio:1, resizeMode:"contain", alignSelf:"center"}} source={require("./assets/croppedIcon.png")} />
     
     <Text style={[sty.DrawerButton,{fontSize:(windowHeight+windowWidth)/40}]}>SkinVault</Text>
     </View>
      <Divider style = {[sty.Divider, sty.topDivider]}/>
      <TouchableOpacity style = {sty.iconMerge} onPress={() => navigation.navigate("Home")}>
      <Ionicons name="home-outline" size={(windowHeight+windowWidth)/47} color= {appColors.WHITE} /><Text style={sty.DrawerButton}> HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Weapons")}><Text style={sty.DrawerButton}>ALL SKINS</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cards")}><Text style={sty.DrawerButton}>ALL CARDS</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Buddys")}><Text style={sty.DrawerButton}>ALL BUDDIES</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Vault")}><Text style={sty.DrawerButton}>VAULT</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Generator")}><Text style={sty.DrawerButton}>GENERATOR</Text></TouchableOpacity>
      <Divider   style = {[sty.Divider,sty.bottomDivider]}/>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}><Text style={[sty.DrawerButton,{fontSize: (windowHeight+windowWidth)/68}]}>Settings</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}><Text style={[sty.DrawerButton,{fontSize: (windowHeight+windowWidth)/68}]}>About</Text></TouchableOpacity>
      </View>
  
    
  </>);
};
const sty = StyleSheet.create({
  DrawerButton: { fontSize: (windowHeight+windowWidth)/50,fontFamily: "RobotMain", color: appColors.WHITE, alignSelf: "center" },
  Divider: {width: (windowHeight+windowWidth)/10, height:(windowHeight+windowWidth)/200, backgroundColor: appColors.RED, justifyContent: "center", alignSelf: "center", borderRadius: 50},
  bottomDivider: {},
  topDivider: {},
  iconMerge: {flexDirection: "row", justifyContent: "center"}
});
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
