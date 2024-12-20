import { Slot, Stack } from "expo-router";

// Import your global CSS file
import "../../global.css";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Meditations" }} />
			<Stack.Screen
				name="meditation/[id]"
				options={{ headerShown: false, animation: "slide_from_bottom" }}
			/>
		</Stack>
	);
}
