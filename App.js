import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button, SafeAreaView,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import your screen components
import HomeScreen from './screens/HomeScreen';
import AppRun from './initializeApp';
seeAsyncStorage = async() => {
AsyncStorage.getAllKeys((err, keys) => {
  console.log(keys);

});}
clearAsyncStorage = async() => {
    AsyncStorage.clear();
}
const App = () => {
  return (
    <NavigationContainer>
       <Drawer.Navigator
      initialRouteName="Startup"
      drawerContent={(props) => <DrawerContent {...props} />}
     screenOptions={{
      drawerStyle: {
        backgroundColor: "green",
        width: Dimensions.get('window').width / 1.5
      },
      drawerType: "front"
      }
      
      }
    >
    <Drawer.Screen name = "Startup" component = {AppRun} options = {{headerShown: false}}/>
    <Drawer.Screen name = "Home" component = {HomeScreen}/>
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
const Drawer = createDrawerNavigator();
const DrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "flex-start", paddingVertical: 20, }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 20 }}>
        ValSkin.gg
      </Text>
      <Text style={{ fontSize: 24, padding: 20 }} onPress={clearAsyncStorage}>Tutorial</Text>
      <Text style={{ fontSize: 24, padding: 20 }} onPress={seeAsyncStorage}>Owned</Text>
      <Text style={{ fontSize: 24, padding: 20 }} onPress={() => navigation.navigate("Home")}>All Skins</Text>
      <Text style={{ fontSize: 24, padding: 20 }} onPress={() => navigation.navigate("Home")}>All Bundles</Text>
      <Text style={{ fontSize: 24, padding: 20 }} onPress={() => navigation.navigate("Home")}>About</Text>
    </View>
  );
};