import { Text, View } from "react-native";
import type { Meditation } from "@/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome } from "@expo/vector-icons";

export function MediationListItem({ meditation }: { meditation: Meditation }) {
	return (
		<View className="flex flex-row gap-5 items-center">
			<View className="bg-green-700 p-2 rounded-full">
				<FontAwesome name="check" size={16} color="white" />
			</View>
			<View className="flex-1 p-5 py-8 border-2 border-gray-300 rounded-2xl">
				<Text className="font-semibold text-2xl mb-2">{meditation.title}</Text>
				<View className="flex flex-row items-center gap-2">
					<FontAwesome6 name="clock" size={16} color="gray" />
					<Text className="text-gray-600">{meditation.duration} min</Text>
				</View>
			</View>
		</View>
	);
}
