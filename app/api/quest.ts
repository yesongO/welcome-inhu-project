// api/quest.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// 오늘의 퀘스트 목록 ID를 가져오는 API 함수
export const getDailyQuests = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) return null;

        const res = await axios.get(
            `${BASE_URL}/quests/daily/`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // 성공하면 [{ id: 9, quest: 8 }, ...] 형태의 데이터를 반환
        if (res.status === 200) {
            return res.data;
        }
        return null;

    } catch (err) {
        console.error("오늘의 퀘스트 API 오류:", err);
        return null;
    }
};