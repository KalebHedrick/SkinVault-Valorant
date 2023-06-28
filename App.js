import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions, StatusBar } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';
import appColors from './assets/appColors'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createContext } from 'react';
import { Divider } from 'react-native-paper';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
// Screen components
import HomeScreen from './screens/HomeScreen';
import WeaponScreen from './screens/WeaponScreen';
import AppRun from './initializeApp';
import SkinsScreen from './screens/SkinsScreen';
import AboutScreen from './screens/AboutScreen';
//FONTS
let customFonts = {
  'RobotMain': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  'RobotMain_BOLD': require('./assets/fonts/RobotoMono-LightItalic.ttf'),
};

const App = () => {
  StatusBar.setBarStyle(appColors.RED, true);
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
  return (<>
    
     <View style={{justifyContent: "space-evenly", flex:1, flexDirection:"column", backgroundColor: appColors.BLACK}}>
      
     <Text style={[sty.DrawerButton,{fontSize: (windowHeight+windowWidth)/33}]}>
        SkinVault
      </Text>
      <Divider style = {[sty.Divider, sty.topDivider]}/>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={sty.DrawerButton}>HOME</Text></TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Weapons")}><Text style={sty.DrawerButton}>ALL SKINS</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Bundles")}><Text style={sty.DrawerButton}>ALL BUNDLES</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Vault")}><Text style={sty.DrawerButton}>VAULT</Text></TouchableOpacity>

      <Divider   style = {[sty.Divider,sty.bottomDivider]}/>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}><Text style={[sty.DrawerButton,{fontSize: (windowHeight+windowWidth)/68}]}>Settings</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}><Text style={[sty.DrawerButton,{fontSize: (windowHeight+windowWidth)/68}]}>About</Text></TouchableOpacity>
      </View>
  
    
  </>);
};
const sty = StyleSheet.create({
  DrawerButton: { fontSize: (windowHeight+windowWidth)/50, padding: 20,fontFamily: "RobotMain", color: appColors.WHITE, alignSelf: "center" },
  Divider: {width: (windowHeight+windowWidth)/10, height:(windowHeight+windowWidth)/200, backgroundColor: appColors.RED, justifyContent: "center", alignSelf: "center", borderRadius: 50},
  bottomDivider: {},
  topDivider: {}
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
  clearAsyncStorage = async() => {
      AsyncStorage.clear();
  }