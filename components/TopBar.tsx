// 상단 바 컴포넌트
// import TopBar from "../../components/TopBar";

import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TopBarProps = {
    points?: number; // 나중에 API로 가져올 나의 포인트
    onGuidePress?: () => void; // 설명서 버튼 눌렀을 때
};

export default function TopBar({ points = 0, onGuidePress }: TopBarProps) {
    const [isGuideModalVisible, setGuideModalVisible] = useState(false);

    const openGuideModal = () => {
        setGuideModalVisible(true);
        onGuidePress?.();
    };
    const closeGuideModal = () => setGuideModalVisible(false);

    return (
        <View style={styles.container}>
            {/* 왼쪽: 보유 포인트 */}
            <Text style={styles.pointsText}>보유 포인트: {points}P</Text>

            {/* 오른쪽: 설명서 */}
            <TouchableOpacity style={styles.guideButton} onPress={openGuideModal}>
                <Text style={styles.guideText}>설명서</Text>
                <Image
                    source={require("../assets/images/explain_book.png")}
                    style={styles.bookIcon}
                />
            </TouchableOpacity>

            {/* 설명서 모달 */}
            <Modal
                visible={isGuideModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeGuideModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>설명서</Text>
                        <Text>여기에 설명 내용을 넣어주세요.</Text>
                        <TouchableOpacity onPress={closeGuideModal} style={styles.modalCloseBtn}>
                            <Text style={{ fontWeight: "bold" }}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "transparent",
        zIndex: 10,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    guideButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    guideText: {
        fontSize: 16,
        marginRight: 5,
    },
    bookIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalCloseBtn: {
        marginTop: 20,
        alignSelf: "flex-end",
    },
});
