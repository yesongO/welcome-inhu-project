// app/api/registerAPI.ts
// 식당 등록 API
// 앱 내에서 사용하지는 않지만 식당을 등록하고 조회할 수 있는 api입니다.

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// 식당 등록 API
export const registerPlace = async (name: string) => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) {
            console.log("토큰이 없습니다.");
            return null;
        }

        const response = await axios.post(
        `${BASE_URL}/places/`,
        { name }, // 요청 본문
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } } // 토큰
    );

    console.log("가게 등록 성공:", response.data);
    return response.data;
    } catch (err: any) {
        console.error("가게 등록 실패:", err.response?.data || err.message);
        throw err;
    }
};

// 식당 조회 API
export const getPlaces = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) {
            console.log("토큰이 없습니다.");
            return null;
        }
        const response = await axios.get(`${BASE_URL}/places/`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log("전체 가게 목록:", response.data);
        return response.data;
    } catch (err: any) {
        console.error("가게 목록 조회 실패:", err.response?.data || err.message);
        throw err;
    }
};

// 퀘스트 생성 API
export const createQuest = async (place: number, reward_points: number, description: string) => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) {
            console.log("토큰 없음. 로그인 필요");
            return null;
        }

        const body = {
            place,
            reward_points,
            description,
        };

        const response = await axios.post(
            `${BASE_URL}/quests/`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log("퀘스트 생성 성공:", response.data);
        return response.data;
    } catch (err: any) {
        console.error("퀘스트 생성 실패:", err.response?.data || err.message);
        throw err;
    }
};