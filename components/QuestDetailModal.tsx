import { useFonts } from "expo-font";
import React from 'react';
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { customFonts } from "../constants/Fonts";

type QuestDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    quest: {
        id: string;
        title: string;
        description: string;
        reward: number;
        image: any;
    };
};

export default function QuestDetailModal({ visible, onClose, quest }: QuestDetailModalProps) {
    const [fontsLoaded] = useFonts(customFonts);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <ImageBackground
                    source={require("../assets/images/boards2.png")}
                    style={styles.modalBackground}
                >
                    {/* 닫기 버튼 */}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Image source={require("../assets/images/close_btn.png")} style={styles.closeBtnImage} />
                    </TouchableOpacity>

                    {/* 퀘스트 정보 */}
                    <View style={styles.questInfo}>
                        <Image source={quest.image} style={styles.characterImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{quest.title}</Text>
                            <Text style={styles.description}>{quest.description}</Text>
                            <Text style={styles.reward}>보상: {quest.reward}P</Text>
                        </View>
                    </View>

                    {/* 액션 버튼들 */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.viewQuestBtn}>
                            <Text style={styles.viewQuestText}>퀘스트 보기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.authenticateBtn}>
                            <Image source={require("../assets/images/icon.png")} style={styles.cameraIcon} />
                            <Text style={styles.authenticateText}>인증하기</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBackground: {
        width: 350,
        height: 400,
        padding: 20,
        alignItems: 'center',
    },
    closeBtn: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 2000,
        width: 40,
        height: 40,
    },
    closeBtnImage: {
        width: "100%",
        height: "100%",
    },
    questInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 30,
    },
    characterImage: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: "pixel",
        color: "#5D3838",
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        fontFamily: "pixel",
        color: "#5D3838",
        marginBottom: 10,
        lineHeight: 18,
    },
    reward: {
        fontSize: 16,
        fontFamily: "pixel",
        color: "#4CAF50",
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    },
    viewQuestBtn: {
        backgroundColor: "#6A4546",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        minWidth: 120,
        alignItems: "center",
    },
    viewQuestText: {
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 16,
        fontWeight: "bold",
    },
    authenticateBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        minWidth: 120,
        alignItems: "center",
        flexDirection: "row",
    },
    cameraIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    authenticateText: {
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 16,
        fontWeight: "bold",
    },
});
