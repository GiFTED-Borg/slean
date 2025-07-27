import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import ProfileCard from "@/components/profile-card";
import SkillsLevelCard from "@/components/skills-level-card";
import { IconChip } from "@/components/chip";
import SettingsIcon from "@/assets/icons/settings-icon";

const markedDates: Record<string, { selected?: boolean; marked?: boolean }> = {
  "2025-07-23": {
    selected: true,
    marked: true,
  },
  "2025-07-17": {
    selected: true,
    marked: true,
  },
};

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
          <View className="flex flex-row items-center justify-between">
            <Text
              className="font-medium text-white text-lg"
              style={{ fontFamily: "GeistMono-Medium" }}
            >
              Profile
            </Text>
            <SettingsIcon
              width={24}
              height={24}
              stroke="#292D32"
              fill="#FFFFFF"
            />
          </View>
        </View>
        <View style={{ marginBottom: 27 }}>
          <ProfileCard />
        </View>
        <View style={{ marginBottom: 26 }}>
          <SkillsLevelCard />
        </View>
        <View
          className="flex flex-col"
          style={{
            backgroundColor: "#161A1A",
            gap: 7,
            paddingVertical: 20,
            borderRadius: 20,
          }}
        >
          <View
            className="flex flex-row items-center justify-between"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#FFFFFF40",
              paddingHorizontal: 24,
              paddingBottom: 13,
            }}
          >
            <Text
              className="text-white font-semibold text-base leading-[19.7px]"
              style={{ fontFamily: "GeistMono-SemiBold" }}
            >
              Streaks
            </Text>
            <IconChip type="streak" text="3 days" />
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <Calendar
              style={{ backgroundColor: "transparent" }}
              theme={{
                calendarBackground: "transparent",
                selectedDayBackgroundColor: "#3D6B6B",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#84e8e8",
              }}
              hideExtraDays
              enableSwipeMonths
              hideArrows
              renderHeader={(date) => {
                return null;
              }}
              markedDates={markedDates}
              customHeader={() => (
                <View
                  className="flex flex-row items-center justify-between"
                  style={{ paddingHorizontal: 6 }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <Text
                      className="text-white text-center"
                      key={`${day}-${i}`}
                      style={{
                        width: 30,
                        height: 30,
                        fontFamily: "GeistMono-Regular",
                      }}
                    >
                      {day}
                    </Text>
                  ))}
                </View>
              )}
              dayComponent={({ date, state }) => {
                const dateKey = date?.dateString ?? "";
                const isMarked = markedDates[dateKey]?.marked;
                const isSelected = markedDates[dateKey]?.selected;

                return (
                  <View
                    className="flex items-center justify-center rounded-[3px]"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 3,
                      backgroundColor: isSelected ? "#3D6B6B" : "#1E2222",
                    }}
                  >
                    <Text
                      className="text-xs"
                      style={{
                        color:
                          state === "disabled"
                            ? "#555"
                            : state === "today"
                              ? "#ccffff"
                              : "#fff",
                        fontFamily: "GeistMono-Regular",
                      }}
                    >
                      {date?.day}
                    </Text>

                    {isMarked && (
                      <View
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: 1.5,
                          backgroundColor: "#ffffff",
                          marginTop: 2,
                        }}
                      />
                    )}
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
