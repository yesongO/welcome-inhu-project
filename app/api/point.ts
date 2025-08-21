//api/api/point.ts
//굿즈 뽑기에 사용될 포인트 차감에 관련된 api 파일 입니다

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";  
export const usePoint = async (amount) => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token"); 
    

    if (!accessToken) {
     
      return false;
    }

    const res = await axios.post(
      `${BASE_URL}/points/voucher/use/`, 
      { amount }, 
      
      { headers: { Authorization: `Bearer ${accessToken}` ,
    "Content-Type": "application/json",
        },
        timeout: 10000,} 
    );

     if (res.status >= 200 && res.status < 300) return true;
    return false; 
   
  } catch (err) {
    
    return false;
  }
};
