import AsyncStorage from '@react-native-async-storage/async-storage';
/******************************************************
 * 
 * FETCH FUNCTIONS FOR THE API
 ******************************************************/
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
          
        //  console.log("ALL WEAPON DATA FROM API RETRIEVED");
          return await response.json();
        }
        else {
          console.error("Fetch error occured, retrying");
        FetchAllWeaponsData();
        }
      } catch (error) {
        console.error("Fetch error occured, retrying");
        FetchAllWeaponsData();
      }
};
export const FetchAllCardData = async () => { //Return a promise with all player cards
  try {
      const response = await fetch(
        'https://valorant-api.com/v1/playercards',{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'GET',
      }
      );
      if (response.status == 200) { 
        return await response.json();
      }
      else {
        console.error("Fetch error occured, retrying");
      FetchAllCardData();
      }
    } catch (error) {
      console.error("Fetch error occured, retrying");
      FetchAllCardData();
    }
};
export const FetchWeaponbyUUID = async (WUUID) => { //Return a promise with all weapon data
  const url = "https://valorant-api.com/v1/weapons/".concat(WUUID.replaceAll('"',''))
    try {
        const response = await fetch(
          url,
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
        );
        if (response.status == 200) { 
          
          //console.log("Weapon with UUID" + WUUID + "Retreived")
          return await response.json();
        }
        else {
          console.error("Fetch error occured, retrying");
          FetchWeaponbyUUID(WUUID);
        }
      } catch (error) {
        console.error("Fetch error occured, retrying");
        FetchWeaponbyUUID(WUUID);
      }
};
export const FetchWeaponSkinbyUUID = async (WUUID) => { //Return a promise with all data from skin
  try {
      const response = await fetch(
        'https://valorant-api.com/v1/weapons/skins/' + WUUID,
          {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'GET',
      }
      );
      if (response.status == 200) { 
        
       // console.log("Weapon with UUID" + WUUID + "Retreived")
        return await response.json();
      }
      else {
        console.error("Fetch error occured, retrying");
        FetchWeaponSkinbyUUID(WUUID);
      }
    } catch (error) {
      console.error("Fetch error occured, retrying");
      FetchWeaponSkinbyUUID(WUUID);
    }
};
/***********************************************************
 * 
 * Storage save and retrieve async functions
 * 
 *
 **********************************************************/
export async function save(key, value) { //saves data to storage

 return await AsyncStorage.setItem(key,JSON.stringify(value));
}
export async function saveString(key, value) {
  return await AsyncStorage.setItem(key,value);
}
export async function getValueFor(key, retries) { //returns data from storage
  let result = await AsyncStorage.getItem(key);
  if (typeof result === 'string' || result instanceof String) {
   // console.log("data with key: " + key + " retrieved from local storage");
    return await result;
  }
  else {
    if (retries == 0) {
      console.log("Data value not be found");
      return false;
    }
    if (typeof(retries) == undefined) {
      getValueFor(key, 1);
    }
    else {
    getValueFor(key, retries - 1);
    }
  }
}
/*********************************************************** */
export async function checkVaultSkins() { //initiates creation of vault if it does not already exist
  checkVault = () => {
getValueFor("Vault",2).then(res => {
  if (!res || typeof(res) == undefined) {
    saveString("Vault","noData");
  }
}).then(() => {return true})
}
return await checkVault();
}
export async function addVaultSkin(skinUUID) {
  addSkin= () => {
  getValueFor("Vault",3).then(res => {
    let newVault
    if (res == "noData") {
       newVault = skinUUID;
    }
    else {
   newVault = res.concat("," + skinUUID);
    }
    saveString("Vault",newVault);
  })
}
return await addSkin(skinUUID);
}
export async function deleteVaultSkin(skinUUID) {
  deleteSkin = () => {
    getValueFor("Vault",3).then(res => {
    let dataArray = res.split(",");
    dataArray = dataArray.filter(e => e !== skinUUID);
    let newData;
    if (dataArray.length == 0) {
      newData = "noData";
    }
    else {
    newData = dataArray.join(",");
    }
     saveString("Vault",newData);
    })
  }
  return await deleteSkin(skinUUID);
}
export async function checkVaultSkin(skinUUID) { //returns true if 'skinUUID' exists in vault, false otherwise
   checkSkin =async () => {
      let dataArray = await getValueFor("Vault",1)
      dataArray = dataArray.split(",")
      for(const element of dataArray) {
        if(element == skinUUID) {
          return true;
        }
      }
      return false;
    }
     return await checkSkin();
  }
  
