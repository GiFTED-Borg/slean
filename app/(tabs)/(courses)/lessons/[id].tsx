import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { useRouter } from "expo-router";

export default function Lesson() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 px-5 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 17, paddingHorizontal: 20 }}
        >
          <ChevronRight
            width={24}
            height={24}
            stroke="#292D32"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
        <View
          className="flex flex-col"
          style={{
            gap: 7,
            borderBottomWidth: 1,
            borderColor: "#FFFFFF40",
            paddingBottom: 11.5,
            marginBottom: 24.5,
            paddingHorizontal: 20,
          }}
        >
          <Text className="font-semibold text-white text-lg">
            Solana fundamentals
          </Text>
          <Text
            className="font-medium text-base"
            style={{ color: "#FFFFFFBF" }}
          >
            What is Solana?
          </Text>
        </View>
        <View
          className="flex flex-col"
          style={{ marginBottom: 46, paddingHorizontal: 20 }}
        >
          <Text
            className="font-semibold text-white text-base"
            style={{ marginBottom: 36 }}
          >
            What is Solana?
          </Text>
          <Text
            className="text-base font-medium"
            style={{ color: "#FFFFFFBF", marginBottom: 20 }}
          >
            Solana accounts are fundamental data structures that store state on
            the blockchain. Unlike Ethereum where contracts store state
            internally, Solana separates program logic from data storage.
          </Text>
          <Text
            className="text-base font-medium"
            style={{ color: "#FFFFFFBF", marginBottom: 20 }}
          >
            ## Key Concepts:
          </Text>
          <View className="flex flex-col" style={{ gap: 4 }}>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF" }}
            >
              - **Accounts store data and SOL balance**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF" }}
            >
              - **Programs (smart contracts) are stateless**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF" }}
            >
              - **Each account has a unique public key**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF" }}
            >
              - **Accounts can be owned by programs or users**
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 48,
            backgroundColor: "#161A1A",
            borderRadius: 10,
            gap: 2,
          }}
          className="flex flex-col"
        >
          <Text className="text-xs" style={{ color: "#FFFFFFBF" }}>
            {`
              // Example account structure
            {
                "lamports": 1000000000,     // Balance in lamports
                "owner": "11111111111111111111111111111111",
                "data": [],      // Account data
                "executable": false,     // Is this a program?
                "rent_epoch": 200      // Rent payment info
            }
            `}
          </Text>
        </View>
        <TouchableOpacity
          className="rounded-[10px] w-full py-[9px] items-center"
          style={{ backgroundColor: "#84E8E8" }}
        >
          <Text className="text-white">Next Lesson</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
