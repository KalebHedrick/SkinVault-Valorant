import AsyncStorage from '@react-native-async-storage/async-storage';
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
          
          console.log("ALL WEAPON DATA FROM API RETRIEVED");
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

export const FetchWeaponbyUUID = async (WUUID) => { //Return a promise with all weapon data
  const url = "https://valorant-api.com/v1/weapons/".concat(WUUID.replaceAll('"',''))
  console.log(url);
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
          
          console.log("Weapon with UUID" + WUUID + "Retreived")
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
        
        console.log("Weapon with UUID" + WUUID + "Retreived")
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

export async function save(key, value) { //saves data to storage

 return await AsyncStorage.setItem(key,JSON.stringify(value));
}

export async function getValueFor(key) { //returns data from storage
  let result = await AsyncStorage.getItem(key);
  if (typeof result === 'string' || result instanceof String) {
    console.log("data with key: " + key + " retrieved from local storage");
    return await result;
  }
  else {
    
    getValueFor(key);
  }
}
