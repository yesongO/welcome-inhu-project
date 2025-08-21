// api/pointAdd.ts (새 파일)

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// 퀘스트 완료로 포인트를 적립하는 API 함수
export const usePointAdd = async (questName: string) => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) return null;

        const res = await axios.post(
            `${BASE_URL}/points/quest/complete/`,
            { quest_name: questName }, // 요청 본문
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            }
        );

        // 성공 시, { points_added: 100, ... } 같은 응답 데이터를 그대로 반환
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        }
        return null;

    } catch (err) {
        console.error("퀘스트 포인트 적립 API 오류:", err);
        return null; // 실패 시 null 반환
    }
};