import { useState } from "react";
import { useFonts } from "expo-font";
import { customFonts } from "../constants/Fonts";
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function SelectScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);
    const [gender, setGender] = useState<string | null>(null);

    if (!fontsLoaded) {
        return null;
    }

    const handleGenderSelect = (selectedGender: string | null) => {
        setGender(selectedGender);
        console.log("선택된 성별:", selectedGender);
        
        // 백엔드 API 연동 예정
        router.push("/explain");
    }


    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
            <Image source={require("../assets/images/select_title.png")} style={styles.titleImage} />

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
                            source={require("../assets/images/women.png")}
                            style={styles.genderImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.genderText}>여성</Text>
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
    titleImage: {
        width: 240,
        height: 240,
        resizeMode: "contain",
        marginTop: -120,
    },
    genderRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20, // RN 0.71 이상
    },
    genderBox: {
        alignItems: "center",
        padding: 10,
        marginTop: -78,
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
        color: "#000000",
    },
});