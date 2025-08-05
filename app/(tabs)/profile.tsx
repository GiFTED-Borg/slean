import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import ProfileCard from "@/components/profile-card";
import SkillsLevelCard from "@/components/skills-level-card";
import { IconChip } from "@/components/chip";
import SettingsIcon from "@/assets/icons/settings-icon";
import ShareIcon from "@/assets/icons/share-icon";
import CustomButton from "@/components/custom-button";
import CornerBracket from "@/components/corner-bracket";
import { useUser, useUserStreaks } from "@/hooks/queries/useUser";
import { format } from "date-fns";

export default function Profile() {
  const { data: user } = useUser();
  const { data: streaks = [] } = useUserStreaks();

  const markedDates = streaks.reduce(
    (acc, streak) => {
      const [date] = streak.date.split("T");
      acc[date] = {
        selected: true,
        marked: true,
      };
      return acc;
    },
    {} as Record<string, { selected?: boolean; marked?: boolean }>
  );

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
            <CornerBracket text="Profile" />
            <SettingsIcon
              width={24}
              height={24}
              stroke="#292D32"
              fill="#FFFFFF"
            />
          </View>
        </View>
        <View style={{ marginBottom: 27 }}>
          <ProfileCard
            name="Kenpachi_Mazino"
            level={1}
            lessons={user?.stats.totalTopicsCompleted || 0}
            challenges={user?.stats.totalChallengesCompleted || 0}
            streak={user?.stats.currentStreak || 0}
            xp={user?.xp || 0}
            profileImage=""
            dateJoined={format(
              new Date(user?.createdAt || Date.now()),
              "MMMM d, yyyy"
            )}
          />
        </View>
        <View style={{ marginBottom: 26 }}>
          <SkillsLevelCard lvl1={1} lvl2={1} lvl3={1} lvl4={1} />
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
              style={{ fontFamily: "GeistMono-SemiBold", fontSize: 16 }}
            >
              Streaks
            </Text>
            <IconChip
              type="streak"
              text={`${user?.stats.currentStreak || 0} day${
                user?.stats.currentStreak && user?.stats.currentStreak === 1
                  ? ""
                  : "s"
              }`}
            />
          </View>
          <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
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
                  style={{ paddingHorizontal: 2 }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <Text
                      className="text-white text-center"
                      key={`${day}-${i}`}
                      style={{
                        width: 24,
                        height: 24,
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
                      width: 32,
                      height: 32,
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
                        fontSize: 12,
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
          <View
            className="flex flex-row items-center"
            style={{ paddingHorizontal: 24 }}
          >
            <Text
              className="text-xs text-white"
              style={{ fontFamily: "GeistMono-Regular", fontSize: 12 }}
            >
              Longest Streak:{" "}
            </Text>
            <Text
              className="text-xs font-medium"
              style={{
                color: "#F6A10F",
                fontFamily: "GeistMono-Medium",
                fontSize: 12,
              }}
            >
              {user?.stats.longestStreak || 0} day
              {user?.stats.longestStreak && user?.stats.longestStreak === 1
                ? ""
                : "s"}
            </Text>
          </View>
        </View>
        <CustomButton
          startIcon={<ShareIcon />}
          style={{ marginTop: 54 }}
          text="Share Profile"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
