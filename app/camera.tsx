import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from "../components/TopBar";
import { customFonts } from "../constants/Fonts";

const { width: screenWidth } = Dimensions.get('window');

export default function CameraScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [flashMode, setFlashMode] = useState<FlashMode>('off');
    const cameraRef = useRef<any>(null);

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
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    base64: true,
                });
                
                Alert.alert('사진 촬영 완료', '영수증을 촬영했습니다!', [
                    {
                        text: '확인',
                        onPress: () => {
                            // 여기서 촬영된 사진을 처리하거나 저장할 수 있습니다
                            router.push("/complete" as any);
                        },
                    },
                ]);
            } catch (error) {
                Alert.alert('오류', '사진 촬영에 실패했습니다.');
            }
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
