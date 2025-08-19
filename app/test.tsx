// // screens/ApiTestScreen.tsx
// import axios from "axios";
// import { useEffect } from "react";
// import { Text, View } from "react-native";

// const BASE_URL = "https://inhu-forest.p-e.kr"; // 배포 서버 주소
// const SIGNUP_ENDPOINT = "/users/signup/";       // 백엔드 확인 후 정확히 바꿔야 함
// const QUEST_ENDPOINT = "/quests/";              // 백엔드 확인 후 정확히 바꿔야 함

// export default function ApiTestScreen() {
//   useEffect(() => {
//     // 1️⃣ 회원가입 테스트
//     const testSignup = async () => {
//       try {
//         const res = await axios.post(
//           `${BASE_URL}${SIGNUP_ENDPOINT}`,
//           {
//             student_num: "12243734",
//             password: "test1234",
//             gender: "여",
//             department: "데사",
//             nickname: "민정",
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("회원가입 성공:", res.data);
//       } catch (error: any) {
//         if (error.response) {
//           console.error("회원가입 실패:", error.response.data);
//         } else {
//           console.error("회원가입 네트워크 에러:", error.message);
//         }
//       }
//     };

//     // 2️⃣ 퀘스트 생성 테스트
//     const testQuest = async () => {
//       try {
//         const res = await axios.post(
//           `${BASE_URL}${QUEST_ENDPOINT}`,
//           {
//             place: 3,
//             reward_points: 100,
//             description:
//               "혹시 치킨에 관심이 있나요? 최근에는 바삭한 튀김옷을 연구하고 있는데 일손이 부족해서요. 혹시 제 조수로 일해 볼 생각은 없나요? 보답은 섭섭하지 않게 해주겠습니다.",
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               // JWT 필요하면 여기에 추가
//               // Authorization: `Bearer <토큰>`
//             },
//           }
//         );
//         console.log("퀘스트 생성 성공:", res.data);
//       } catch (error: any) {
//         if (error.response) {
//           console.error("퀘스트 생성 실패:", error.response.data);
//         } else {
//           console.error("퀘스트 네트워크 에러:", error.message);
//         }
//       }
//     };

//     // 테스트 순서대로 실행
//     testSignup();
//     testQuest();
//   }, []);

//   return (
//     <View>
//       <Text>배포 서버 API 테스트 중...</Text>
//     </View>
//   );
// }

// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import { signup } from "./api/auth";

// export default function TestScreen() {
//     useEffect(() => {
//     const testSignup = async () => {
//         try {
//             const res = await signup(
//             "12214317",        // student_num
//             "krista1208",      // password
//             "M",               // gender
//             "디자인테크놀로지학과", // department
//             "예송"              // nickname
//             );
//         console.log("회원가입 성공:", res);
//         } catch (error) {
//         console.error("회원가입 실패:", error);
//         }
//     };

//     testSignup();
// }, []);

//     return (
//     <View>
//         <Text>회원가입 API 테스트 중...</Text>
//     </View>
//     );
// }

// import axios from "axios";
// import { useEffect } from "react";
// import { Text, View } from "react-native";

// const BASE_URL = "https://inhu-forest.p-e.kr";

// export default function QuestTestScreen() {
//     useEffect(() => {
//     const testQuest = async () => {
//         try {
//         const res = await axios.post(
//             `${BASE_URL}/quests/`,
//             {
//             place: 3,
//             reward_points: 100,
//             description: "혹시 치킨에 관심이 있나요? 최근에는 바삭한 튀김옷을 연구하고 있는데 일손이 부족해서요. 혹시 제 조수로 일해 볼 생각은 없나요? 보답은 섭섭하지 않게 해주겠습니다."
//             },
//             {
//             headers: {
//                 "Content-Type": "application/json",
//               // JWT 필요하면 여기에 Authorization 추가
//               // Authorization: `Bearer <토큰>`
//             }
//             }
//         );

//         console.log("퀘스트 생성 성공:", res.data);
//         } catch (error: any) {
//         if (error.response) {
//             console.error("퀘스트 생성 실패:", error.response.data);
//         } else {
//             console.error("네트워크 에러:", error.message);
//         }
//         }
//     };

//     testQuest();
//     }, []);

//     return (
//     <View>
//         <Text>퀘스트 API 테스트 중...</Text>
//     </View>
//     );
// }

// screens/PointsTestScreen.tsx
// import axios from "axios";
// import { useEffect } from "react";
// import { Text, View } from "react-native";

// const BASE_URL = "https://inhu-forest.p-e.kr"; // 배포 서버 주소
// const POINTS_ENDPOINT = "/points/";             // 백엔드 확인 후 정확히 바꿔야 함

// export default function PointsTestScreen() {
//   useEffect(() => {
//     const testPoints = async () => {
//       try {
//         // GET 요청 시 일반적으로 body 대신 params 사용
//         const res = await axios.get(`${BASE_URL}${POINTS_ENDPOINT}`, {
//           params: {
//             voucher_name: "뽑기 교환권",
//           },
//           headers: {
//             "Content-Type": "application/json",
//             // JWT 필요하면 여기에 추가
//             // Authorization: `Bearer <토큰>`
//           },
//         });
//         console.log("포인트 GET 성공:", res.data);
//       } catch (error: any) {
//         if (error.response) {
//           console.error("포인트 GET 실패:", error.response.data);
//         } else {
//           console.error("포인트 네트워크 에러:", error.message);
//         }
//       }
//     };

//     testPoints();
//   }, []);

//   return (
//     <View>
//       <Text>배포 서버 /points/ GET 테스트 중...</Text>
//     </View>
//   );
// }
