import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "../components/TopBar";
import { customFonts } from "../constants/Fonts";

export default function CompleteScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    const handleGoBack = () => {
        router.back();
    };

    return (
        <ImageBackground source={require("../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.container}>
                {/* 상단 바 - TopBar 컴포넌트 사용 */}
                <TopBar points={20} />

                {/* 메인 완료 메시지 영역 */}
                <View style={styles.completeArea}>
                    {/* 완료 메시지 */}
                    <View style={styles.messageContainer}>
                        <Text style={styles.restaurantName}>[ 미식당 ]</Text>
                        <Text style={styles.completeText}>방문 인증 완료!!</Text>
                        <Text style={styles.pointsText}>+ 10 point</Text>
                    </View>

                    {/* 캐릭터와 감사 메시지 */}
                    <View style={styles.characterSection}>
                        <Image 
                            source={require("../assets/images/excharacter_1.png")} 
                            style={styles.characterImage} 
                        />
                        <Text style={styles.thankYouText}>고마워 ~~</Text>
                    </View>

                    {/* 확인 버튼 */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleGoBack}>
                        <Text style={styles.confirmButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    completeArea: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100, // TopBar 아래로 여백 조정
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    restaurantName: {
        fontSize: 24,
        fontFamily: "pixel",
        color: "#000000",
        fontWeight: "bold",
        marginBottom: 15,
    },
    completeText: {
        fontSize: 28,
        fontFamily: "pixel",
        color: "#000000",
        fontWeight: "bold",
        marginBottom: 15,
    },
    pointsText: {
        fontSize: 32,
        fontFamily: "pixel",
        color: "#4CAF50",
        fontWeight: "bold",
    },
    characterSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    characterImage: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    thankYouText: {
        fontSize: 24,
        fontFamily: "pixel",
        color: "#000000",
        fontWeight: "bold",
    },
    confirmButton: {
        backgroundColor: "#6A4546",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    confirmButtonText: {
        color: "#FFFFFF",
        fontFamily: "pixel",
        fontSize: 18,
        fontWeight: "bold",
    },
});
