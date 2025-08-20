// app/api/myInfo.ts
// 내 정보를 불러와야 할 때 사용합니다.

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

export const getUserInfo = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        const users_id = await AsyncStorage.getItem("user_id");

        if (!accessToken || !users_id) {
            console.log("유저 데이터 없음. 다시 로그인 필요");
            return null;
        }

        const response = await axios.get(`${BASE_URL}/users/${users_id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = response.data.user;
        console.log("내 정보:", user);

        return user;
    } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
        return null;
    }
};