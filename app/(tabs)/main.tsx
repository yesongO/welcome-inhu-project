import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QuestModal from "../../components/QuestModal";
import TopBar from "../../components/TopBar";
import { Quest, useQuestStore } from "../store/questStore";

// myInfo API 임포트 
import { getUserInfo } from "../../app/api/myInfo";

export default function MainScreen() {
    const router = useRouter();
    const { acceptQuest, isQuestAccepted } = useQuestStore();
    const [userPoints, setUserPoints] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const user = await getUserInfo();
                if (user) {
                    setUserPoints(user.point);
                }
            } catch (error) {
                console.error("포인트 가져오기 실패:", error);
            }
        };
        fetchUserPoints();
    }, []);

    if (!userPoints === null) {
        return <Text>Loading...</Text>;
    }

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
    
    // 전체 퀘스트 데이터
    const allQuests: Quest[] = [
        {
            id: "1",
            image: require("../../assets/images/excharacter_1.png"),
            title: "조선탕반",
            reward: 100,
            description: "오늘 끓여낸 육수가… 평소보다 훨씬 진하구나. 이건 30년 전 전설의 비법이 되살아난 게 분명해. 하지만 아직 확신이 부족하군… 자네가 와서 직접 그 맛을 확인해주게.",
        },
        {
            id: "2",
            image: require("../../assets/images/excharacter_2.png"),
            title: "짜장전설",
            reward: 150,
            description: "짜장면과 탕수육 덕후 찾습니다! 🥢 새로운 짜장 소스 레시피를 테스트 중인데, 제 조수로 와서 평가해주실래요? 보상은 절대 섭섭하지 않아요!",
        },
        {
            id: "3",
            image: require("../../assets/images/excharacter_3.png"),
            title: "미식당",
            reward: 200,
            description: "파스타 좋아하시나요? 🍝 저희가 새로운 파스타 레시피를 개발 중인데, 맛 평가를 도와주세요. 참여해주시면 달콤하고 풍성한 보상을 드릴게요!",
        },
        {
            id: "4",
            image: require("../../assets/images/excharacter_1.png"),
            title: "지붕덮밥",
            reward: 120,
            description: "새로운 덮밥을 개발 중이야. 🍚 새로운 소스와 토핑 조합을 실험 중인데, 시식 조수로 와서 평가해줄 사람을 찾고 있어. 혹시 도와줄 수 있니?",
        },
        {
            id: "5",
            image: require("../../assets/images/excharacter_2.png"),
            title: "이모떡",
            reward: 80,
            description: "저기 부탁 하나만 해도 될까? 내가 만든 떡볶이가 펄펄 끓어야 하는데 불이 약해서 맛있게 끓지를 않아. 혹시 새 부탄가스 하나만 구해다줄 수 있어? 맛있는 떡볶이를 만들어줄게.",
        },
        {
            id: "6",
            image: require("../../assets/images/excharacter_3.png"),
            title: "레커훈스",
            reward: 180,
            description: "치킨 좋아하시죠! 제가 최근에 아주 바삭한 튀김옷을 연구하고 있는데 일손이 부족해서요. 바삭바삭한 튀김옷 연구, 와서 같이 해보실래요? 🍗",
        },
    ];

    // 랜덤으로 3개 퀘스트 선택
    const [randomQuests, setRandomQuests] = useState<Quest[]>([]);

    useEffect(() => {
        // 퀘스트 배열을 섞고 앞에서 3개 선택
        const shuffled = [...allQuests].sort(() => Math.random() - 0.5);
        setRandomQuests(shuffled.slice(0, 3));
    }, []);

    // 퀘스트 클릭 시 모달 여는 함수
    const openQuestModal = (index: number) => {
        if (randomQuests[index]) {
            setSelectedQuest(randomQuests[index]);
            setModalVisible(true);
        }
    }
    
    // 퀘스트 수락 함수
    const handleAcceptQuest = (quest: Quest) => {
        // 이미 수락된 퀘스트인지 확인
        if (isQuestAccepted(quest.id)) {
            Alert.alert("알림", "이미 수락한 퀘스트입니다!");
            return;
        }

        // 퀘스트 수락
        acceptQuest(quest);
        Alert.alert("퀘스트 수락!", `${quest.title} 퀘스트를 수락했습니다!`);
        closeModal();
    }
    
    // 모달 닫는 함수
    const closeModal = () => setModalVisible(false);

    return (
        <>
        <ImageBackground source={require("../../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.overlay}></View>

            <TopBar points={userPoints || 0} />

            {/* 왼쪽 상단 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { top: "26%", left: "10%" }]}
            onPress={() => openQuestModal(0)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={randomQuests[0]?.image || require("../../assets/images/excharacter_1.png")}
                style={styles.characterImage}
            />
            </TouchableOpacity>

            {/* 오른쪽 중간 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { top: "41.2%", left: "55%" }]}
            onPress={() => openQuestModal(1)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={randomQuests[1]?.image || require("../../assets/images/excharacter_2.png")}
                style={styles.characterImage}
            />
            </TouchableOpacity>

            {/* 왼쪽 하단 캐릭터 */}
            <TouchableOpacity
            style={[styles.character, { bottom: "22%", left: "0%" }]}
            onPress={() => openQuestModal(2)}
            >
            <Animated.Image 
                source={require("../../assets/images/light.png")}
                style={[styles.light, { opacity }]}
            />
            <Image
                source={randomQuests[2]?.image || require("../../assets/images/excharacter_3.png")}
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
