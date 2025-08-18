import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { customFonts } from "../constants/Fonts";

export default function CameraScreen() {
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
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← 뒤로가기</Text>
                </TouchableOpacity>

                {/* 상단 바 */}
                <View style={styles.topBar}>
                    <View style={styles.pointsBox}>
                        <Text style={styles.pointsText}>보유 포인트 : 20 p</Text>
                    </View>
                    <View style={styles.manualBox}>
                        <Image 
                            source={require("../assets/images/explain_book.png")} 
                            style={styles.bookIcon} 
                        />
                        <Text style={styles.manualText}>설명서</Text>
                    </View>
                </View>

                {/* 메인 카메라 영역 */}
                <View style={styles.cameraArea}>
                    <Text style={styles.cameraTitle}>영수증을 촬영해 주세요</Text>
                    
                    {/* 영수증 이미지 영역 */}
                    <View style={styles.receiptArea}>
                        <Image 
                            source={require("../assets/images/board1.png")} 
                            style={styles.receiptImage} 
                        />
                    </View>

                    {/* 카메라 버튼 */}
                    <TouchableOpacity style={styles.cameraButton}>
                        <View style={styles.cameraIcon}>
                            <View style={styles.cameraLens} />
                        </View>
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
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1000,
        backgroundColor: "#6A4546",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    backButtonText: {
        color: "#FFFFFF",
        fontFamily: "pixel",
        fontSize: 14,
        fontWeight: "bold",
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 100, // 뒤로가기 버튼 아래로 여백 조정
        marginBottom: 30,
    },
    pointsBox: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    pointsText: {
        color: "#FFFFFF",
        fontFamily: "pixel",
        fontSize: 14,
        fontWeight: "bold",
    },
    manualBox: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    manualText: {
        color: "#FFFFFF",
        fontFamily: "pixel",
        fontSize: 14,
        fontWeight: "bold",
    },
    cameraArea: {
        flex: 1,
        backgroundColor: "#D3D3D3", // 연한 회색
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cameraTitle: {
        fontSize: 18,
        fontFamily: "pixel",
        color: "#000000",
        fontWeight: "bold",
        marginTop: 20,
        textAlign: 'center',
    },
    receiptArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    receiptImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        opacity: 0.7, // 흐릿하게 표시
    },
    cameraButton: {
        marginBottom: 30,
        alignItems: 'center',
    },
    cameraIcon: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 40,
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraLens: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 25,
        backgroundColor: "transparent",
    },
});
