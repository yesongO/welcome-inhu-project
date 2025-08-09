import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="quest" options={{ title: "퀘스트" }} />
      <Tabs.Screen name="notification" options={{ title: "알림" }} />
      <Tabs.Screen name="mypage" options={{ title: "나의 페이지" }} />
    </Tabs>
  );
}

