import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";


// login API 임포트
import { login } from "../app/api/login";

export default function IntroScreen() {
    const router = useRouter();
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    const handleSignup = () => {
        router.push("/select"); 
    }
    
    const handleEnter = async () => {
        try {
            const res = await login(
                studentId, 
                password, 
            );
            // 성공하면 설명 페이지로 이동
            console.log("로그인 성공:", res);
            router.push("/explain");
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={require("../assets/images/inha_logo.png")} style={styles.logo} />
                <Image source={require("../assets/images/title.png")} style={styles.titleImage} />
                <Text style={[styles.subtitle, styles.subtitleStroke]}>방학미션 시작! 인후를 구해라!</Text>
                <TextInput style={styles.input} placeholder="학번" placeholderTextColor="#7F7F7F" value={studentId} onChangeText={setStudentId} />
                <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#7F7F7F" value={password} onChangeText={setPassword} secureTextEntry={true}/>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>가입하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleEnter}>
                        <Text style={styles.buttonText}>입장하기</Text>
                    </TouchableOpacity>
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
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: -112,
        marginTop: -80,
    },
    titleImage: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: -114,
    },
    subtitle: {
        fontSize: 26,
        fontFamily: "kirang",
        color: "#ffffff",
        marginBottom: 20,
    },
    subtitleStroke: {
        textShadowColor: "#D2D2D2",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    input: {
        fontFamily: "supermagic",
        fontSize: 16,
        color: "#000000",
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        marginTop: 24,
        gap: 16,
    },
    button: {
        flex: 1,
        backgroundColor: "#567778",
        paddingVertical: 6,
        borderRadius: 8,
        marginHorizontal: 2,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "supermagic",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
    },
});
