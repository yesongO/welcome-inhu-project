// app/api/login.ts
// 입장하기에서 사용하는 로그인 API
// 로그인 성공 시 토큰과 user의 정보들을 저장합니다. 

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

export const login = async (
    student_num: string,
    password: string,
) => {
    try {
        const res = await axios.post(
            `${BASE_URL}/users/login/`, 
            { student_num, password },
            { headers: { "Content-Type": "application/json" }} 
        );

        console.log("로그인 성공:", res.data);

        const { access_token, refresh_token, user } = res.data;

        if (!access_token || !refresh_token) {
            throw new Error("로그인 실패: 토큰이 없습니다.");
        }

        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        await AsyncStorage.setItem("user_id", user.id.toString());

        console.log("토큰 저장 완료");
        console.log(res.data);
        
        return res.data;
        
    } catch (error: any) {
        if (error.response) {
            console.log("로그인 실패:", error.response.data);
        } else {
            console.log("로그인 에러:", error.message);
        }
        throw error;
    }
};