// api/receipt.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// 영수증 인증 API 함수
export const uploadReceiptAPI = async (questId: string, photo: { uri:string }) => {

    // FormData 객체 새로 만들기
    const formData = new FormData();

    // 사진 파일을 FormData에 추가 ( {uri, name, type} 객체를 만들어야 함)
    formData.append('image', {
        uri: photo.uri,
        name: `receipt_${questId}.jpg`,
        type: 'image/jpeg',
    } as any);

    // 퀘스트 ID를 FormData에 추가
    formData.append('quest', questId);

    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) return null;

        const res = await axios.post(
            `${BASE_URL}/receipts/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (res.status === 200 && res.status < 300) {
            return res.data;
        }
        return null;
        
    } catch (err) {
        console.error("영수증 인증 API 오류:", err);
        return null;
    }
};