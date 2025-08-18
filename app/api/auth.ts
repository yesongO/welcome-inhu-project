import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

export const signup = async (
    student_num: string,
    password: string,
    gender: string,
    department: string,
    nickname: string,
) => {
    try {
        const res = await axios.post(`${BASE_URL}/users/signup/`, {
            student_num,
            password,
            gender,
            department,
            nickname,
        });
        console.log("회원가입 성공:", res.data);
        return res.data;
    } catch (error: any) {
        if (error.response) {
            console.log("회원가입 실패:", error.response.data);
        } else {
            console.log("회원가입 에러:", error.message);
        }
        throw error;
    }
};