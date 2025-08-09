import { useState } from "react";
import { useFonts } from "expo-font";
import { customFonts } from "../constants/Fonts";
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function IntroScreen() {
    const router = useRouter();
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = () => {
        // 백엔드 API 연동 예정
        console.log("학번", studentId, "비번", password);
        router.push("/select");
    }

    const handleGuest = () => {
        router.push("/select");
    }

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={require("../assets/images/inha_logo.png")} style={styles.logo} />
                <Text style={styles.title}>놀러와요 인후의 숲</Text>
                <Text style={styles.subtitle}>방학미션 시작! 인후를 구해라!</Text>
                <TextInput style={styles.input} placeholder="학번" value={studentId} onChangeText={setStudentId} />
                <TextInput style={styles.input} placeholder="비번" value={password} onChangeText={setPassword} />
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>입장하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleGuest}>
                        <Text style={styles.buttonText}>게스트 입장</Text>
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
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontFamily: "kirang",
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 45,
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
        width: "100%",
        marginTop: 10,
    },
    button: {
        flex: 1,
        backgroundColor: "#4A90E2",
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
});
