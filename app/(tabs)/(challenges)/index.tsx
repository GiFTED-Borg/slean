import PlayIcon from "@/assets/icons/play-icon";
import TimeIcon from "@/assets/icons/time-icon";
import Card from "@/components/card";
import Chip, { IconChip } from "@/components/chip";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomButton from "@/components/custom-button";
import CornerBracket from "@/components/corner-bracket";
import { useChallenges } from "@/hooks/queries/useChallenges";
import { getChipVariant } from "@/utils/variant";

export default function Challenges() {
  const router = useRouter();
  const { data: challenges = [] } = useChallenges();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <View
          className="flex flex-col"
          style={{
            paddingBottom: 16,
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#FFFFFF40",
          }}
        >
          <View
            className="flex flex-row items-center justify-between"
            style={{ paddingHorizontal: 20 }}
          >
            <CornerBracket text="Challenges" />
          </View>
        </View>
        {challenges.map((challenge) => (
          <View
            key={challenge.id}
            style={{ marginBottom: 18, paddingHorizontal: 20 }}
          >
            <Card
              gap={20}
              // title="Hello Solana World"
              title={challenge.title}
              rightExtra={
                <Chip
                  size="lg"
                  text={getChipVariant(challenge.difficulty).text}
                  variant={getChipVariant(challenge.difficulty).variant}
                />
              }
              headerExtraGap="sm"
              desc={challenge.description}
              headerExtra={
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 8.71 }}
                >
                  <IconChip type="xp" text={`${challenge.xpReward} XP`} />
                  <View
                    className="flex flex-row items-center"
                    style={{ gap: 2.71 }}
                  >
                    <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                    <Text
                      style={{
                        color: "#FFFFFF66",
                        fontSize: 10,
                        fontFamily: "GeistMono-Regular",
                      }}
                    >
                      15 min
                    </Text>
                  </View>
                </View>
              }
              footer={
                <CustomButton
                  handlePress={() => router.push(`/challenge/${challenge.id}`)}
                  text="Start Challenge"
                  endIcon={<PlayIcon fill="#292D32" />}
                />
              }
              shadow="gold"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
