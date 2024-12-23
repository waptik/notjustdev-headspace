import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
	Easing,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

export default function AnimatedBackground() {
	const { height } = useWindowDimensions();
	const top1 = useSharedValue(height * 0.3);
	const top2 = useSharedValue(height * 0.5);
	const top3 = useSharedValue(height * 0.7);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const options = {
			duration: 5000,
			easing: Easing.bezier(0.5, 0, 0.5, 1),
		};
		top1.value = withRepeat(withTiming(height * 0.2, options), -1, true);
		top2.value = withDelay(
			1000,
			withRepeat(withTiming(height * 0.4, options), -1, true),
		);
		top3.value = withDelay(
			2000,
			withRepeat(withTiming(height * 0.6, options), -1, true),
		);
	}, []);

	return (
		<View className="absolute top-0 bottom-0 right-0 left-0 items-center">
			{/* circles */}
			<Animated.View
				style={{ top: top1 }}
				className="absolute w-[400%] top-[30%] left-[-50%] aspect-square bg-yellow-400 rounded-full"
			/>
			<Animated.View
				style={{ top: top2 }}
				className="absolute w-[400%] top-[50%] left-[-50%] aspect-square bg-cyan-400 rounded-full"
			/>
			<Animated.View
				style={{ top: top3 }}
				className="absolute w-[400%] top-[70%] left-[-50%] aspect-square bg-red-400 rounded-full"
			/>
		</View>
	);
}
