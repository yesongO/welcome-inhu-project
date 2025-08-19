// select.tsx
// 가입하기 화면 ( 학번, 비번, 성별, 학과, 닉네임 )

import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

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

    if (!fontsLoaded) {
        return null;
    }

    const handleGenderSelect = async (selectedGender: string) => {
        setGender(selectedGender);

        try {
            const res = await signup(
                studentId, 
                password, 
                selectedGender, 
                department, 
                nickname
            );
            // 성공하면 설명 페이지로 이동
            console.log("회원가입 성공:", res);
            router.push("/explain");
        } catch (error) {
            console.error("회원가입 오류:", error);
        }
    };


    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>

                {/* 학번 */}
                <View style={styles.idContainer}>
                    <Image source={require("../assets/images/id_title.png")} style={[styles.titleImage, { width: "54%" }]} />
                    <TextInput style={styles.input} placeholder="학번" placeholderTextColor="#EAEAEA" value={studentId} onChangeText={setStudentId} />
                </View>

                {/* 비번 */}
                <View style={styles.pwContainer}>
                    <Image source={require("../assets/images/pw_title.png")} style={styles.titleImage} />
                    <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#EAEAEA" value={password} onChangeText={setPassword} />
                </View>

                {/* 학과 */}
                <View style={styles.departmentContainer}>
                    <Image source={require("../assets/images/dp_title.png")} style={[styles.titleImage, { width: "52%" }]} />
                    <TextInput style={styles.input} placeholder="학과" placeholderTextColor="#EAEAEA" value={department} onChangeText={setDepartment} />
                </View>

                {/* 닉네임 */}
                <View style={styles.nicknameContainer}>
                    <Image source={require("../assets/images/nick_title.png")} style={styles.titleImage} />
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
                            <Text style={styles.genderText}>남성</Text>
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
                            <Text style={styles.genderText}>여성</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",

    },
    titleImage: {
        width: 240,
        height: 240,
        resizeMode: "contain",
        marginBottom: -94,
    },
    genderRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20, // RN 0.71 이상
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
        marginBottom: 4,
    },
    genderText: {
        fontFamily: "pixel",
        fontSize: 30,
        color: "#f4f4f4",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#fff",
        borderWidth: 1.2,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 30,
    },
    idContainer: {
        width: "100%",
        marginBottom: -60
    },
    pwContainer: {
        width: "100%",
        marginBottom: -60
    },
    departmentContainer: {
        width: "100%",
        marginBottom: -60
    },
    nicknameContainer: {
        width: "100%",
        marginBottom: -60
    },
    genderContainer: {
        width: "100%",
        marginBottom: -60,
        marginTop: 10,
    },
});