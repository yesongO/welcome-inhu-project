import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "../components/TopBar";
import { customFonts } from "../constants/Fonts";

export default function CameraScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    const takePicture = () => {
        Alert.alert('사진 촬영', '영수증을 촬영하시겠습니까?', [
            {
                text: '취소',
                style: 'cancel',
            },
            {
                text: '촬영',
                onPress: () => {
                    // 영수증 API 인식 시뮬레이션
                    setTimeout(() => {
                        router.push("/complete" as any);
                    }, 1000);
                },
            },
        ]);
    };

    return (
        <ImageBackground source={require("../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.container}>
                {/* 상단 바 - TopBar 컴포넌트 사용 */}
                <TopBar points={20} />

                {/* 메인 카메라 영역 - 흰색 패널 */}
                <View style={styles.cameraArea}>
                    <Text style={styles.cameraTitle}>영수증을 촬영해 주세요</Text>
                    
                    {/* 카메라 프리뷰 영역 */}
                    <View style={styles.cameraContainer}>
                        <View style={styles.cameraPreview}>
                            {/* 영수증 가이드 프레임 */}
                            <View style={styles.receiptFrame}>
                                <View style={[styles.corner, styles.topLeft]} />
                                <View style={[styles.corner, styles.topRight]} />
                                <View style={[styles.corner, styles.bottomLeft]} />
                                <View style={[styles.corner, styles.bottomRight]} />
                            </View>
                            <Text style={styles.cameraPlaceholder}>카메라 프리뷰</Text>
                        </View>
                    </View>

                    {/* 카메라 버튼 */}
                    <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                        <View style={styles.cameraIcon}>
                            <Image 
                                source={require("../assets/images/camera.png")} 
                                style={styles.cameraButtonImage} 
                            />
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
    cameraArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 100, // TopBar 아래로 여백 조정
    },
    cameraTitle: {
        fontSize: 18,
        fontFamily: "pixel",
        color: "#000000",
        fontWeight: "bold",
        marginTop: 20,
        textAlign: 'center',
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 20,
    },
    cameraPreview: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    cameraPlaceholder: {
        fontSize: 16,
        color: '#666',
        fontFamily: "pixel",
    },
    receiptFrame: {
        width: 280,
        height: 180,
        position: 'absolute',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#8B4513',
        borderWidth: 3,
        backgroundColor: 'transparent',
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
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
    cameraButtonImage: {
        width: 50,
        height: 50,
    },
});
