import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QuestModal from "../../components/QuestModal";
import TopBar from "../../components/TopBar";
import { Quest, useQuestStore } from "../store/questStore";

// myInfo API 임포트 
import { getUserInfo } from "../../app/api/myInfo";

// quest API (랜덤으로 3개 생성) 임포트 
import { getDailyQuests } from "../../app/api/quest";

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

    // 전체 퀘스트 데이터 -> 상세 정보를 추후 가져오기 위해 서버 측의 DB와 동일하게 유지한다.
    const allQuests: Quest[] = [
        {
            id: "1",
            image: require("../../assets/images/character1.png"),
            title: "조선탕반",
            reward: 100,
            description: "오늘 끓여낸 육수가… 평소보다 훨씬 진하구나. 이건 30년 전 전설의 비법이 되살아난 게 분명해. 하지만 아직 확신이 부족하군… 자네가 와서 직접 그 맛을 확인해주게.",
        },
        {
            id: "2",        
            image: require("../../assets/images/character2.png"),
            title: "짜장전설",
            reward: 100,
            description: "짜장면과 탕수육 덕후 찾습니다! 🥢 새로운 짜장 소스 레시피를 테스트 중인데, 제 조수로 와서 평가해주실래요? 보상은 절대 섭섭하지 않아요!",
        },
        {
            id: "3",
            image: require("../../assets/images/character3.png"),
            title: "미식당",
            reward: 100,
            description: "파스타 좋아하시나요? 🍝 저희가 새로운 파스타 레시피를 개발 중인데, 맛 평가를 도와주세요. 참여해주시면 달콤하고 풍성한 보상을 드릴게요!",
        },
        {
            id: "4",
            image: require("../../assets/images/character4.png"),
            title: "지붕덮밥",
            reward: 100,
            description: "새로운 덮밥을 개발 중이야. 🍚 새로운 소스와 토핑 조합을 실험 중인데, 시식 조수로 와서 평가해줄 사람을 찾고 있어. 혹시 도와줄 수 있니?",
        },
        {
            id: "5",
            image: require("../../assets/images/character5.png"),
            title: "이모떡",
            reward: 100,
            description: "저기 부탁 하나만 해도 될까? 내가 만든 떡볶이가 펄펄 끓어야 하는데 불이 약해서 맛있게 끓지를 않아. 혹시 새 부탄가스 하나만 구해다줄 수 있어? 맛있는 떡볶이를 만들어줄게.",
        },
        {
            id: "6",
            image: require("../../assets/images/character6.png"),
            title: "레커훈스",
            reward: 100,
            description: "치킨 좋아하시죠! 제가 최근에 아주 바삭한 튀김옷을 연구하고 있는데 일손이 부족해서요. 바삭바삭한 튀김옷 연구, 와서 같이 해보실래요? 🍗",
        },
        {
            id: "15",
            image: require("../../assets/images/character7.png"),
            title: "궁중보쌈",
            reward: 100,
            description: "보쌈은 아무나 먹을 수 있는 게 아니야. 고기와 김치를 ‘한입의 예술’로 싸 먹을 줄 알아야 하지. 자네, 그 실력 한번 증명해보겠나? 실패하면… 김치만 줄 수도 있네.",
        },
        {
            id: "16",
            image: require("../../assets/images/character8.png"),
            title: "신촌샤브샤브",
            reward: 100,
            description: "샤브샤브 육수에 수상한 기운이 감돌고 있다네… 자네가 와서 샤브샤브의 균형을 바로잡아 주지 않겠나… 기다리고 있겠네…",
        },
        {
            id: "17",
            image: require("../../assets/images/character9.png"),
            title: "고수찜닭",
            reward: 100,
            description: "찜닭 안의 당면들이 너무 길어져서 서로 발을 걸고 넘어지고 있어! 닭다리까지 휘말려 대혼돈이 됐지. 자네가 와서 젓가락으로 질서를 바로잡아주지 않으면, 이건 국물탕이 되고 말 걸세",
        },
        {
            id: "18",
            image: require("../../assets/images/character10.png"),
            title: "이치라멘",
            reward: 100,
            description: "라멘의 진정한 맛을 완성하기 위해선, 비밀 재료들이 필요해. ‘황금 국물’, ‘마법의 미소’, 그리고 ‘비단 면’을 구해다줄 수 있니? 진정한 라멘의 맛을 완성해보고 싶어! 🍜",
        },
        {
            id: "19",
            image: require("../../assets/images/character11.png"),
            title: "수라국수",
            reward: 100,
            description: "오늘 뽑아낸 면발이 너무 길어… 면발이 테이블들까지 이어지고 있네! 자네가 와서 이 끝없는 면발을 끊어주지 않으면, 국수집이 한 줄로 묶여버릴 거야~",
        },
        {
            id: "20",
            image: require("../../assets/images/character12.png"),
            title: "중경마라탕",
            reward: 100,
            description: "마라탕 국물 속에서 마라(麻)와 라(辣)가 끝없는 전쟁을 벌이고 있네. 혀가 얼얼해질지, 불타오를지는 자네의 선택에 달렸지. 와서 재료를 집어넣어 균형을 맞춰보게나!!",
        },
        {
            id: "21",
            image: require("../../assets/images/character13.png"),
            title: "와이키키피자",
            reward: 100,
            description: "어서 와! 여긴 인후 최고의 피자가게, 와이키키야. 요즘 손님이 많아지면서 피자 도우가 자꾸 모자라곤 해. 내 비밀 레시피 도우를 준비하는 걸 도와줄 수 있겠니? 🍕",
        },
        {
            id: "22",
            image: require("../../assets/images/character14.png"),
            title: "고양이눈카레",
            reward: 100,
            description: "냐옹! 우리 가게 고양이가 카레를 다 먹어치워버렸지 뭐야~ 카레를 다시 만들어야 하는데 한시가 급해. 와서 카레 만드는 것을 도와줄 수 있니? 🍛",
        },
        {
            id: "23",
            image: require("../../assets/images/character15.png"),
            title: "동아리닭갈비",
            reward: 100,
            description: "불판 위에서 양배추는 ‘내가 단맛을 내야 진짜 닭갈비지!’ 하고, 떡은 ‘내가 들어가야 씹는 맛이 산다고!’ 하며 다투고 있네. 자네가 와서 싸움을 말려줄 수 있겠나?",
        },
        {
            id: "24",
            image: require("../../assets/images/character16.png"),
            title: "스톡홀름샐러드",
            reward: 100,
            description: "양상추, 토마토, 닭가슴살… 샐러드 재료들이 서로 자기가 메인이라고 우기고 있어! 너가 와서 재료들을 골라줘야 싸움이 끝날 거 같아. 와서 최고의 조합을 만들어줄래? 🍅",
        },
    ];

    // 화면에 보여줄 오늘의 랜덤 퀘스트 3개
    const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);

    useEffect(() => {
        const fetchDailyQuests = async () => {
            const dailyQuestData = await getDailyQuests();

            if (dailyQuestData) { // API 응답 예시 : [{ quest: 1 }, { quest: 2 }, { quest: 3 }]
                const questsToShow = dailyQuestData.map((daily: { quest: number }) => {
                    return allQuests.find(quest => quest.id === String(daily.quest));
                }).filter((quest: Quest | undefined): quest is Quest => quest !== undefined);

                
                // ========================================================
                // 고양이눈 카레를 추가하기 위한 코드 추후 삭제해야 함
                // 전체 퀘스트 '카탈로그'에서 ID가 22번인 '고양이눈카레' 퀘스트를 찾기
                const quest22 = allQuests.find(q => q.id === "22");

                // 3. 찾았고, 보여줄 퀘스트가 1개 이상 있다면...
                if (quest22 && questsToShow.length > 0) {
                    console.log("--- [TEST] 퀘스트 ID 22번을 첫 번째 슬롯에 강제로 설정합니다! ---");
                    // 준비된 퀘스트 3개 중 첫 번째 자리에 고양이눈카레 퀘스트를 강제로 집어넣기
                    questsToShow[0] = quest22;
                }
                // ========================================================
                
                setDailyQuests(questsToShow);
            }
        };
        fetchDailyQuests();
    }, []);

    // 오늘의 랜덤 퀘스트 3개 콘솔에 출력
    const handleTestDailyQuests = async () => {
        console.log("테스트: 오늘의 퀘스트 API 원본 데이터 확인");
    
        const result = await getDailyQuests(); // 서버에서 주는 원본 데이터를 받는다
    
        if (result) {
            Alert.alert(
                "API 호출 성공!", 
                "콘솔(터미널) 창에서 '원본 데이터'를 확인하세요!"
            );
            // 여기서 result를 가공하지 말고, 받은 그대로 출력!
            console.log("✅ 서버가 보낸 원본 응답:", JSON.stringify(result, null, 2));
        } else {
            Alert.alert("API 호출 실패", "콘솔(터미널) 창에서 에러를 확인하세요.");
        }
    };

    // 퀘스트 클릭 시 모달 여는 함수
    const openQuestModal = (index: number) => {
        if (dailyQuests[index]) {
            setSelectedQuest(dailyQuests[index]);
            setModalVisible(true);
        }
    }
    
    // 퀘스트 수락 함수
    const handleAcceptQuest = async (quest: Quest) => {
        // 이미 수락된 퀘스트인지 확인
        if (isQuestAccepted(quest.id)) {
            Alert.alert("알림", "이미 수락한 퀘스트입니다!");
            return;
        }

        const success = await acceptQuest(quest);

        if (success) {
            Alert.alert("퀘스트 수락!", `${quest.title} 퀘스트를 수락했습니다!`);
            closeModal();
        } else {
            Alert.alert("퀘스트 수락 실패", "퀘스트 수락에 실패했습니다. 다시 시도해주세요.");
        }
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
                source={dailyQuests[0]?.image || require("../../assets/images/excharacter_1.png")}
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
                source={dailyQuests[1]?.image || require("../../assets/images/excharacter_1.png")}
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
                source={dailyQuests[2]?.image || require("../../assets/images/excharacter_1.png")}
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

        <View style={{top: 110, left: 100, position: "absolute", zIndex: 1000}}>
            <Button title="오늘의 퀘스트 출력" onPress={handleTestDailyQuests} />
        </View>
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
