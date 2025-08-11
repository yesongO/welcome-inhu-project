import { useState } from "react";
import { useFonts } from "expo-font";
import { customFonts } from "../constants/Fonts";
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function ExplainScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={require("../assets/images/board1.png")} style={styles.board} />
                <Text style={styles.description}>
                    안녕하세요{'\n'}
                    안녕하세요{'\n'}
                    안녕하세요{'\n'}
                    안녕하세요 초기 설명창입니다 {'\n'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push("/chat")}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
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
        position: "relative",
        marginTop: -180,
    },
    board: {
        width: 380,
        height: 380,
    },
    description: {
        fontFamily: "pixel",
        color: "#804F50",
        fontSize: 20,
        marginTop: -280,
        alignSelf: "flex-start",
        marginLeft: 40,
        lineHeight: 28,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
    },
    button: {
        width: 140,
        alignSelf: "center",
        backgroundColor: "#6A4546",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginTop: 20,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "supermagic",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});