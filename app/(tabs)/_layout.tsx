import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type TabsLayoutProps = {
  children: React.ReactNode;
};

export default function TabsLayout({ children }: TabsLayoutProps) {
  return (
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

