import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type GiftItem = {
    id: string;
    title: string;
    image: any;
    points: number;
};

const dummyData: GiftItem[] = [
    { id: "1", title: "학교 마스코트 키링", image: require("../../assets/images/intro_gift.png"), points: 100 },
    { id: "2", title: "로고 머그컵", image: require("../../assets/images/intro_gift.png"), points: 200 },
    { id: "3", title: "엽서 세트", image: require("../../assets/images/intro_gift.png"), points: 50 },
];

export default function GiftShop() {
    const renderItem = ({ item }: { item: GiftItem }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.points}>{item.points}P</Text>
    </TouchableOpacity>
    );

    return (
    <View style={styles.container}>
        <Text style={styles.header}>🎁 기프트샵</Text>
        <FlatList
            data={dummyData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        width: "48%",
        marginBottom: 16,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
    },
    points: {
        marginTop: 4,
        fontSize: 12,
        color: "#888",
    },
});
