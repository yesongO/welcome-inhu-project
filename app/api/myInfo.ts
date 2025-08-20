// app/api/myInfo.ts
// 내 정보를 불러오는 API

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

export const getUserInfo = async (users_id: string) => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) {
        console.log("토큰 없음. 다시 로그인 필요");
        return;
    }

    const response = await axios.get(
        `${BASE_URL}/users/${users_id}/`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

        console.log("내 정보:", response.data);
        return response.data;
    } catch (err) {
    console.error("유저 정보 불러오기 실패:", err);
    }
};