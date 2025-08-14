// 상단 바 컴포넌트
// import TopBar from "../../components/TopBar";

import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";


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
            <Svg height="40" width="200">
                <SvgText x="3" y="30" fontSize="20" fontFamily="cookieB" stroke="#30211A" strokeWidth="8">
                    보유 포인트: {points}P
                </SvgText>
                <SvgText x="3" y="30" fontSize="20" fontFamily="cookieB" fill="#fff">
                    보유 포인트: {points}P
                </SvgText>
            </Svg>

            {/* 오른쪽: 설명서 */}
            {/* <TouchableOpacity style={styles.guideButton} onPress={openGuideModal}>
                <Text style={styles.guideText}>설명서</Text>
                <Image
                    source={require("../assets/images/explain_book.png")}
                    style={styles.bookIcon}
                />
            </TouchableOpacity> */}
            <Svg height="40" width="80">
                <SvgText x="24" y="30" fontSize="20" fontFamily="cookieB" stroke="#30211A" strokeWidth="8">
                    설명서
                </SvgText>
                <SvgText x="24" y="30" fontSize="20" fontFamily="cookieB" fill="#EBE1CD">
                    설명서
                </SvgText>
            </Svg>
            <TouchableOpacity style={styles.guideButton} onPress={openGuideModal}>
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
        top: 8,
        left: 4,
        right: 0,
        height: 150,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "transparent",
        zIndex: 10,
    },
    guideButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    bookIcon: {
        width: 76,
        height: 76,
        resizeMode: "contain",
        marginTop: 8,
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
