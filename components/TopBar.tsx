// 상단 바 컴포넌트
// import TopBar from "../../components/TopBar";

import { useState } from "react";
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
            {/* <Svg height="40" width="80">
                <SvgText x="24" y="30" fontSize="20" fontFamily="cookieB" stroke="#30211A" strokeWidth="8">
                    설명서
                </SvgText>
                <SvgText x="24" y="30" fontSize="20" fontFamily="cookieB" fill="#EBE1CD">
                    설명서
                </SvgText>
            </Svg> */}
            <TouchableOpacity style={styles.guideButton} onPress={openGuideModal}>
                <Image
                    source={require("../assets/images/explain_group.png")}
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
                        <Text style={styles.modalTitle}>안녕하세요! 😉</Text>
                        <Text>놀러와요 인후의 숲은 방학 기간 침체된</Text>
                        <Text>인하대학교 후문 상권을 살리기 위해 제작된</Text>
                        <Text>게임형 어플입니다.</Text>
                        <Text />
                        <Text>✔️하루에 한 번, 3개의 퀘스트가 주어집니다.</Text>
                        <Text>✔️퀘스트는 다음 날이면 리셋됩니다.</Text>
                        <Text>✔️하루 딱 한번, 퀘스트를 리셋할 수 있어요.</Text>
                        <Text>✔️퀘스트를 수락하고, 식당을 방문해주세요.</Text>
                        <Text>✔️영수증 인증을 하면 포인트를 획득합니다.</Text>
                        <Text />
                        <Text>모은 포인트로 굿즈 교환은 물론,</Text>
                        <Text>꾸준히 모으면 학기 중에 사용할 수 있는</Text>
                        <Text>프리미엄 공간 이용권도 얻을 수 있답니다!</Text>
                        <Text />
                        <Text>퀘스트를 수행하며 인후 상권도 살리는</Text>
                        <Text>특별한 경험을 해보세요!</Text>

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
        width: 130,
        height: 130,
        resizeMode: "contain",
        marginTop: 8,
        marginLeft: -24,
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
