import ChallengesIcon from "@/assets/icons/challenges-icon";
import CommunityIcon from "@/assets/icons/community-icon";
import CoursesIcon from "@/assets/icons/courses-icon";
import HomeIcon from "@/assets/icons/home-icon";
import ProfileIcon from "@/assets/icons/profile-icon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#84E8E8",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "GeistMono-Regular",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          margin: 0,
        },
        tabBarStyle: {
          backgroundColor: "#0B0C10",
          borderRadius: 0,
          paddingVertical: 14,
          height: 70,
          overflow: "hidden",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? "#84E8E8" : "#ffffff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(courses)"
        options={{
          title: "Courses",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CoursesIcon fill={focused ? "#84E8E8" : "#ffffff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(challenges)"
        options={{
          title: "Challenges",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ChallengesIcon fill={focused ? "#84E8E8" : "#ffffff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CommunityIcon fill={focused ? "#FFFFFF99" : "#FFFFFF99"} />
          ),
          tabBarLabelStyle: {
            color: "#FFFFFF99",
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ProfileIcon fill={focused ? "#84E8E8" : "#ffffff"} />
          ),
        }}
      />
    </Tabs>
  );
}
