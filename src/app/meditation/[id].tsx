import { meditations } from "@/data";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MediationDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { top } = useSafeAreaInsets();

	const mediation = meditations.find((m) => m.id === Number(id));

	if (!mediation) {
		return <Text>Mediation not found</Text>;
	}

	return (
		<SafeAreaView>
			<Text className="text-3xl">{mediation.title}</Text>
			<AntDesign
				onPress={() => router.back()}
				className="absolute right-10"
				name="close"
				style={{ top: top + 16 }}
				size={24}
				color="black"
			/>
		</SafeAreaView>
	);
}
