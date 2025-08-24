// select.tsx
// 가입하기 화면 ( 학번, 비번, 성별, 학과, 닉네임 )

import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

// 선택 가능한 학과 목록
const departments = [
    "기계공학과",
    "항공우주공학과",
    "조선해양공학과",
    "산업경영공학과",
    "화학공학과",
    "고분자공학과",
    "신소재공학과",
    "사회인프라공학과",
    "환경공학과",
    "물리학과",
    "공간정보공학과",
    "수학과",
    "통계학과",
    "물리학과",
    "화학과",
    "해양과학과",
    "식품영양학과",
    "경영학부",
    "아태물류학부",
    "국제통상학과",
    "간호학과",
    "인공지능공학과",
    "데이터사이언스학과",
    "스마트모빌리티공학과",
    "디자인테크놀로지학과",
    "컴퓨터공학과",
];

// signup API 임포트
import { signup } from "../app/api/auth";

export default function SelectScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    const [studentId, setStudentId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string | null>(null);
    const [department, setDepartment] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    if (!fontsLoaded) {
        return null;
    }

    const handleGenderSelect = async (selectedGender: string) => {
        setGender(selectedGender);
    }

    const handleSignup = async () => {
        try {
            if (!gender) {
                Alert.alert("성별을 선택해주세요.");
                return;
            }
            const res = await signup(
                studentId, 
                password, 
                gender, 
                department, 
                nickname
            );
            // 성공하면 설명 페이지로 이동
            console.log("회원가입 성공:", res);
            Alert.alert("가입 성공! 환영합니다!");
            router.back();
        } catch (error) {
            console.error("회원가입 오류:", error);
        }
    };

    // 모달에서 학과를 선택했을 때 실행되는 함수
    const handleDepartmentSelect = (selectedDepartment: string) => {
        setDepartment(selectedDepartment);
        setIsPickerVisible(false);
    }


    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="뒤로가기" accessibilityRole="button">
                    <Text style={styles.backButtonText}>뒤로가기</Text>
                </TouchableOpacity>

                {/* 학번 */}
                <View style={styles.idContainer}>
                    <Image source={require("../assets/images/id_title.png")} style={[styles.titleImage, { width: "52%" }]} />
                    <TextInput style={styles.input} placeholder="학번" placeholderTextColor="#EAEAEA" value={studentId} onChangeText={setStudentId} />
                </View>

                {/* 비번 */}
                <View style={styles.pwContainer}>
                    <Image source={require("../assets/images/pw_title.png")} style={[styles.titleImage, { width: "62%" }]} />
                    <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#EAEAEA" value={password} onChangeText={setPassword} />
                </View>

                {/* 학과 */}
                <View style={styles.departmentContainer}>
                    <Image source={require("../assets/images/dp_title.png")} style={[styles.titleImage, { width: "50%" }]} />
                    <TouchableOpacity style={styles.input} onPress={() => setIsPickerVisible(true)}>
                        <Text style={styles.input}>{department}</Text>
                    </TouchableOpacity>
                    {/* <TextInput style={styles.input} placeholder="학과" placeholderTextColor="#EAEAEA" value={department} onChangeText={setDepartment} /> */}
                </View>

                {/* 닉네임 */}
                <View style={styles.nicknameContainer}>
                    <Image source={require("../assets/images/nick_title.png")} style={[styles.titleImage, { width: "56%" }]} />
                    <TextInput style={styles.input} placeholder="닉네임" placeholderTextColor="#EAEAEA" value={nickname} onChangeText={setNickname} />
                </View>

                {/* 성별 */}
                <View style={styles.genderContainer}>
                    <Image source={require("../assets/images/gender_title.png")} style={[styles.titleImage, { width: "52%" }]} />
                    <View style={styles.genderRow}>
                        <TouchableOpacity
                            style={[
                                styles.genderBox,
                                gender === "male" && styles.selectedBox,
                            ]}
                            onPress={() => handleGenderSelect("male")}
                        >
                            <Image
                                source={require("../assets/images/man.png")}
                                style={styles.genderImage}
                                resizeMode="contain"
                            />
                            <Text style={[styles.genderText, gender === "male" && { color: "#fff" }]}>남성</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.genderBox,
                                gender === "female" && styles.selectedBox,
                            ]}
                            onPress={() => handleGenderSelect("female")}
                        >
                            <Image
                                source={require("../assets/images/woman.png")}
                                style={styles.genderImage}
                                resizeMode="contain"
                            />
                            <Text style={[styles.genderText, gender === "female" && { color: "#fff" }]}>여성</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupText}>가입하기</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: -90,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    titleImage: {
        width: 240,
        height: 240,
        resizeMode: "contain",
        top: 1.6,
        marginBottom: -102,
    },
    genderRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    genderBox: {
        alignItems: "center",
        padding: 10,
    },
    selectedBox: {
        borderColor: "#4CAF50",
    },
    genderImage: {
        width: 120,
        height: 120,
        marginBottom: 2,
        marginTop: -10
    },
    genderText: {
        fontFamily: "pixel",
        fontSize: 30,
        color: "#000",
    },
    input: {
        width: "100%",
        height: 36,
        borderColor: "#fff",
        borderWidth: 1.2,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 30,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 10, // 최상단으로 올림
    },
    idContainer: {
        width: "100%",
        marginBottom: -90
    },
    pwContainer: {
        width: "100%",
        marginBottom: -90
    },
    departmentContainer: {
        width: "100%",
        marginBottom: -90
    },
    nicknameContainer: {
        width: "100%",
        marginBottom: -90
    },
    genderContainer: {
        width: "100%",
        marginBottom: -80,
        marginTop: 10,
    },
    signupButton: {
        backgroundColor: "#567778",
        padding: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 10,
        marginTop: 80,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    signupText: {
        fontFamily: "supermagic",
        fontSize: 26,
        color: "#fff",
    },
    backButton: {
        position: "absolute",
        top: 150,
        left: 10,
        zIndex: 100,
    },
    backButtonText: {
        fontFamily: "pixel",
        fontSize: 20,
        color: "#fff",
    },
});