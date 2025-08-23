// api/receipt.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// ===== 1. 반환 타입을 명확하게 정의해주기 =====
type UploadSuccess = { success: true; data: any };
type UploadFailure = { success: false; message: string };
export type UploadResult = UploadSuccess | UploadFailure | null;

export const uploadReceiptAPI = async (questId: string, photo: { uri: string }): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('image', {
        uri: photo.uri,
        name: `receipt_${questId}.jpg`,
        type: 'image/jpeg',
    } as any);
    formData.append('quest', questId);
    
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) return null;

        const res = await axios.post(
            `${BASE_URL}/receipts/`,
            formData,
            { headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            } }
        );

        // 진짜 성공은 200번대 코드 중에서 201이 아닐 때!
        if (res.status >= 200 && res.status < 300) {
            return { success: true, data: res.data };
        }
        
        // 201 코드는 '특수한 실패'로 처리!
        // if (res.status === 201) {
        //     const message = res.data?.detail || "가게명이 다르거나, 이미 완료된 퀘스트입니다.";
        //     return { success: false, message: message };
        // }
        
        return null; // 그 외의 경우는 일단 실패로 간주
        
    } catch (err: any) {
        // ... (catch 블록도 최신 버전으로!) ...
        if (err.response) {
            console.error("🚨 [API 오류] 서버 응답:", err.response.data);
            console.error("🚨 [API 오류] 상태 코드:", err.response.status);
        } else {
            console.error("🚨 [API 오류] 요청 중 에러:", err.message);
        }
        return null;
    }
};

// 영수증 인증 API 함수
// export const uploadReceiptAPI = async (questId: string, photo: { uri:string }) => {

//     // FormData 객체 새로 만들기
//     const formData = new FormData();

//     // 사진 파일을 FormData에 추가 ( {uri, name, type} 객체를 만들어야 함)
//     formData.append('image', {
//         uri: photo.uri,
//         name: `receipt_${questId}.jpg`,
//         type: 'image/jpeg',
//     } as any);

//     // 퀘스트 ID를 FormData에 추가
//     formData.append('quest', questId);

//     try {
//         const accessToken = await AsyncStorage.getItem("access_token");
//         if (!accessToken) return null;

//         const res = await axios.post(
//             `${BASE_URL}/receipts/`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );

//         if (res.status === 200 && res.status < 300) {
//             return res.data;
//         }
//         console.log(`서버가 성공이 아닌 상태 코드 ${res.status}를 반환했습니다.`);
//         return null;   
        
//     } catch (err: any) {
//         console.error("영수증 인증 API 오류:", err);

//         if (err.response) {
//             // 서버가 에러 응답을 보냈을 경우
//             console.error("🚨 [API 오류] 서버 응답:", JSON.stringify(err.response.data, null, 2));
//             console.error("🚨 [API 오류] 상태 코드:", err.response.status);
//         } else if (err.request) {
//             // 요청은 보냈으나 응답을 받지 못했을 경우
//             console.error("🚨 [API 오류] 서버로부터 응답이 없습니다.");
//         } else {
//             // 요청을 보내기 전에 에러가 발생했을 경우
//             console.error("🚨 [API 오류] 요청 설정 중 에러:", err.message);
//         }

//         return null;
//     }
// };