import { FlatList } from "react-native";
import { meditations } from "@/data";
import { MediationListItem } from "@/components/MediationListItem";

const meditation = meditations[0];

export default function HomeScreen() {
	return (
		<FlatList
			data={meditations}
			className="bg-white"
			contentContainerClassName="gap-8 p-3"
			renderItem={({ item }) => <MediationListItem meditation={item} />}
		/>
	);
}
