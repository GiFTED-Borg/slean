import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import ProfileCard from "@/components/profile-card";
import SkillsLevelCard from "@/components/skills-level-card";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 px-5 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex flex-col" style={{ marginBottom: 25 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 16 }}
          >
            <Text className="font-medium text-white text-lg">Profile</Text>
          </View>
        </View>
        <View style={{ marginBottom: 27 }}>
          <ProfileCard />
        </View>
        <View style={{ marginBottom: 26 }}>
          <SkillsLevelCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
