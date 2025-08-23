import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import { useFonts } from "expo-font";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "../components/TopBar";
import { customFonts } from "../constants/Fonts";

const { width: screenWidth } = Dimensions.get('window');

import { useQuestStore } from "./store/questStore";

// 영수증 인증 API 함수 임포트
import { uploadReceiptAPI } from "./api/receipt";
// 포인트 적립 API 함수 임포트
import { usePointAdd } from "./api/pointAdd";

export default function CameraScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [flashMode, setFlashMode] = useState<FlashMode>('off');
    const cameraRef = useRef<any>(null);
    const {removeQuest} = useQuestStore();

    const { questId } = useLocalSearchParams<{ questId: string }>();

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);

    if (!fontsLoaded) {
        return null;
    }

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>카메라 권한을 요청 중입니다...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>카메라 접근 권한이 거부되었습니다.</Text>
                <TouchableOpacity 
                    style={styles.permissionButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.permissionButtonText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        // questId나 카메라가 준비되지 않았으면 함수 실행 중단
        if (!cameraRef.current || !questId) {
            console.log("카메라가 준비되지 않았거나 퀘스트 ID가 없습니다.");
            return;
        }
    
        try {
            // 1. 사진 촬영
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
            
            // 2. 서버에 영수증 업로드 시도 (1단계 인증)
            const uploadResult = await uploadReceiptAPI(questId, photo);
    
            // 경우 1: 진짜 성공! (uploadReceiptAPI가 { success: true, ... }를 반환)
            if (uploadResult && uploadResult.success) {
                console.log("✅ 1단계 인증 성공! 포인트 적립을 시작합니다.");
                
                // 2단계: 포인트 적립 시도
                const pointResult = await usePointAdd(parseInt(questId));
    
                if (pointResult && pointResult.points_added) {
                    // 2단계까지 모두 성공!
                    removeQuest(questId);
                    Alert.alert('퀘스트 완료!', `영수증 인증 성공! ${pointResult.points_added}P가 적립되었습니다!`, 
                        [{ text: '확인', onPress: () => router.push("/quest" as any) }]
                    );
                } else {
                    // 1단계는 성공했지만 2단계(포인트 적립)에서 실패
                    Alert.alert('오류', '영수증 인증은 성공했지만 포인트 적립에 실패했습니다.', [
                        { text: '확인', onPress: () => router.back() }
                    ]);
                }
            } 
            // 경우 2: 서버가 알려준 '특수한 실패' (uploadReceiptAPI가 { success: false, message: ... }를 반환)
            else if (uploadResult && !uploadResult.success) {
                console.log("서버가 영수증 인증을 실패 처리했습니다. 이유:", uploadResult.message);
                // 서버가 보내준 구체적인 실패 메시지를 알림창에 그대로 보여주기!
                Alert.alert(
                    '인증 실패', 
                    uploadResult.message, 
                    [{ text: '확인', onPress: () => router.back() }]
                );
            }
            // 경우 3: 통신 오류 등 그 외 모든 실패 (uploadReceiptAPI가 null을 반환)
            else {
                console.log("영수증 업로드 API 호출 자체가 실패했습니다.");
                Alert.alert('오류', '서버와 통신 중 오류가 발생했습니다.', [
                    { text: '확인', onPress: () => router.back() }
                ]);
            }
        } catch (error) {
            // 사진 촬영 자체에 실패하는 등 예상치 못한 에러
            console.error("takePicture 함수 실행 중 심각한 오류 발생:", error);
            Alert.alert('오류', '처리 중 오류가 발생했습니다. 다시 시도해주세요.', [
                { text: '확인', onPress: () => router.back() }
            ]);
        }
    };

    const toggleCameraType = () => {
        setCameraType((current: CameraType) => (
            current === 'back' ? 'front' : 'back'
        ));
    };

    const toggleFlash = () => {
        setFlashMode((current: FlashMode) => (
            current === 'off' ? 'on' : 'off'
        ));
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
                        <CameraView
                            ref={cameraRef}
                            style={styles.camera}
                            facing={cameraType}
                            flash={flashMode}
                            ratio="4:3"
                        >
                            {/* 영수증 가이드 프레임 */}
                            <View style={styles.receiptFrame}>
                                <View style={[styles.corner, styles.topLeft]} />
                                <View style={[styles.corner, styles.topRight]} />
                                <View style={[styles.corner, styles.bottomLeft]} />
                                <View style={[styles.corner, styles.bottomRight]} />
                            </View>
                            
                            {/* 카메라 컨트롤 버튼들 */}
                            <View style={styles.cameraControls}>
                                <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
                                    <Text style={styles.controlButtonText}>전환</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
                                    <Text style={styles.controlButtonText}>
                                        {flashMode === 'off' ? '플래시' : '플래시 끄기'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                    </View>

                    {/* 카메라 촬영 버튼 */}
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
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    permissionText: {
        fontSize: 18,
        fontFamily: "pixel",
        color: "#000000",
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "pixel",
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
    camera: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    receiptFrame: {
        width: Math.min(screenWidth - 80, 280),
        height: 180,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -Math.min(screenWidth - 80, 280) / 2 }, { translateY: -90 }],
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
    cameraControls: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'column',
        gap: 10,
    },
    controlButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    controlButtonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: "pixel",
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
