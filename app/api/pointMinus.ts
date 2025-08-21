//api/api/pointMinus.ts
//굿즈 뽑기에 사용될 포인트 차감에 관련된 api 파일 입니다

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

export const usePointMinus = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token"); 

        console.log("현재 AsyncStorage에 저장된 토큰:", accessToken);

        if (!accessToken) return null;

        const res = await axios.post(
            `${BASE_URL}/points/voucher/use/`, 
            { "voucher_name": "뽑기 교환권" },
            {   
                headers: { 
                    Authorization: `Bearer ${accessToken}` ,
                    "Content-Type": "application/json",
                },
            timeout: 10000,
            } 
        );

        if (res.status >= 200 && res.status < 300) {
            return res.data;
        }
        return null;

    } catch (err) {
        console.error("포인트 차감 오류:", err);
        return null;
    }
};