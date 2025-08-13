import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import QuestModal from "../../components/QuestModal";

type Quest = {
    title: string;
    reward: number;
    description: string;
    characterImage?: any;
};

export default function MainScreen() {
    const router = useRouter();


    // 전구 반짝이는 애니메이션 관련
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 400, // 꺼지는 속도
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400, // 켜지는 속도
                useNativeDriver: true,
            }),
            Animated.delay(4000),
            ])
        );
        blink.start();
    
        return () => blink.stop();
    }, []);


    // *** 퀘스트 모달 관련 ***
    // 모달 열림 여부 상태관리
    const [modalVisible, setModalVisible] = useState(false);
    // 현재 선택된 퀘스트 상태관리
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    // 퀘스트 예시 데이터
    const quests = [
            {
                title: "식당이름",
                reward: 100,
                description: "식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다. 식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다.",
                characterImage: require("../../assets/images/excharacter_1.png"),
            },
            {
                title: "식당이름",
                reward: 100,
                description: "식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다. 식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다.",
                characterImage: require("../../assets/images/excharacter_2.png"),
            }, 
            {
                title: "식당이름",
                reward: 100,
                description: "식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다. 식당별로 컨셉에 맞게 퀘스트 설명창을 준비할 예정입니다.",
                characterImage: require("../../assets/images/excharacter_3.png"),
            },
    ];
    // 퀘스트 클릭 시 모달 여는 함수
    const openQuestModal = (index: number) => {
        setSelectedQuest(quests[index]);
        setModalVisible(true);
    }
    // 퀘스트 수락 함수
    const handleAcceptQuest = (quest: Quest) => {
        console.log("퀘스트 수락:", quest);
        // 퀘스트 수락 로직 구현
        // 예시: 퀘스트 데이터 저장 또는 서버 요청
        // 수락 후 모달 닫기
        closeModal();
    }
    // 모달 닫는 함수
    const closeModal = () => setModalVisible(false);


    return (
        <>
        <ImageBackground source={require("../../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.overlay}></View>

            {/* 왼쪽 상단 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { top: "25%", left: "2%" }]}
            onPress={() => openQuestModal(0)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={require("../../assets/images/excharacter_1.png")}
                style={styles.characterImage}
            />
            </TouchableOpacity>

            {/* 오른쪽 중간 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { top: "42%", left: "55%" }]}
            onPress={() => openQuestModal(1)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={require("../../assets/images/excharacter_2.png")}
                style={styles.characterImage}
            />
            </TouchableOpacity>


            {/* 왼쪽 하단 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { bottom: "19%", left: "2%" }]}
            onPress={() => openQuestModal(2)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={require("../../assets/images/excharacter_3.png")}
                style={styles.characterImage}
            />
            </TouchableOpacity>

        </ImageBackground>

        {/* *** 퀘스트 모달 관련 *** */}
        {selectedQuest && (
            <QuestModal
                visible={modalVisible}
                onClose={closeModal}
                quest={selectedQuest}
                onAccept={handleAcceptQuest}
            />
        )}
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
    },
    character: {
        position: "absolute",
        zIndex: 2,
    },
    characterImage: {
        width: 180,
        height: 180,
        resizeMode: "contain",
    },
    light: {
        position: "absolute",
        top: -46,
        left: "50%",
        transform: [{ translateX: -22}],
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
});
