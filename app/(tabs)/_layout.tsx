import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    // <Tabs screenOptions={{ headerShown: false }}>
    //   <Tabs.Screen name="index" options={{ title: "홈" }} />
    //   <Tabs.Screen name="quest" options={{ title: "퀘스트" }} />
    //   <Tabs.Screen name="notification" options={{ title: "알림" }} />
    //   <Tabs.Screen name="mypage" options={{ title: "나의 페이지" }} />
    // </Tabs>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#4CAF50",
      tabBarInactiveTintColor: "#999",
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
      },
      headerShown: false,
    }}
  >
    <Tabs.Screen
      name="main"
      options={{
        title: "메인",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="quest"
      options={{
        title: "퀘스트",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="flag" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="mypage"
      options={{
        title: "마이페이지",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }}
    />
  </Tabs>
  );
}

