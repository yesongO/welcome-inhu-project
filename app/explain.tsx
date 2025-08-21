import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

// 식당 등록 조회, 교환권 등록 조회 API 임포트 - 추후 삭제 예정
// import { Button } from "react-native";
// import { createQuest, getPlaces, registerPlace } from "./api/registerAPI";
import { createCoupons } from "./api/registerAPI";

export default function ExplainScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={require("../assets/images/board1.png")} style={styles.board} />
                <Text style={styles.description}>
                    안녕 !!!{'\n'}
                    오늘도 인후의 숲에 와줘서 고마워{'\n'}
                    {'\n'}
                    인후의 숲에 갇혀 있는 {'\n'}
                    인하대 후문 식당 사장님들의{'\n'}
                    부탁을 들어줘!{'\n'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push("/chat")}>
                    <Text style={styles.buttonText}>맡겨줘!!</Text>
                </TouchableOpacity>
            </View>

            {/* 추후 삭제 예정 ================================ */}
            {/* <Button
                title="가게 등록"
                onPress={async () => {
                    try {
                    await registerPlace("레커훈스"); // 등록할 가게 이름
                    alert("가게 등록 완료!");
                    } catch (err) {
                    alert("가게 등록 실패...");
                    }
                }}
            /> */}

            {/* <Button
                title="전체 가게 조회"
                onPress={async () => {
                    try {
                    const places = await getPlaces();
                    console.log(places);
                    alert(`가게 수: ${places.length}`);
                    } catch (err) {
                    alert("가게 조회 실패...");
                    }
                }}
            />

            <Button
                title="퀘스트 생성"
                onPress={async () => {
                    try {
                    await createQuest(6, 100, 
                        "치킨 좋아하시죠! 제가 최근에 아주 바삭한 튀김옷을 연구하고 있는데 일손이 부족해서요. 바삭바삭한 튀김옷 연구, 와서 같이 해보실래요? 🍗"
                    ); // 등록할 퀘스트 (가게id, 보상포인트, 퀘스트 설명)
                    alert("퀘스트 생성 완료!");
                    } catch (err) {
                    alert("퀘스트 생성 실패...");
                    }
                }}
            /> */}

            <Button title="교환권 생성" onPress={async() => {
                const couponsToCreate = {
                    "인후의숲 안뇽인덕 스티커 교환권": 300,
                    "인후의숲 안뇽인덕 학과별 빅스티커 교환권": 300,
                    "인후의숲 안뇽인덕 엽서 교환권": 300,
                    "인후의숲 안뇽인덕 키링 교환권": 300,
                    "인후의숲 안뇽인덕 인형 교환권": 300,
                    "인후의숲 프리미엄 스페이스 출입증": 3000,
                };
                const result = await createCoupons(couponsToCreate);

                if (result) {
                    alert("교환권 생성 완료!");
                } else {
                    alert("교환권 생성 실패...");
                }
            }} 
            />
            {/* ================================ */}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "relative",
        marginTop: -180,
    },
    board: {
        width: "120%",
        height: 380,
    },
    description: {
        fontFamily: "pixel",
        color: "#804F50",
        fontSize: 18,
        marginTop: -280,
        alignSelf: "center",
        marginLeft: 18,
        marginRight: 18,
        lineHeight: 28,
        textAlign: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
    },
    button: {
        width: 170,
        alignSelf: "center",
        backgroundColor: "#6A4546",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "supermagic",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});