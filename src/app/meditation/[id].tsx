import { meditations } from "@/data";
import {
	AntDesign,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import audio1 from "@assets/meditations/audio1.mp3";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function MediationDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const player = useAudioPlayer(audio1);
	const status = useAudioPlayerStatus(player);
	const mediation = meditations.find((m) => m.id === Number(id));
	const duration = status.duration;
	const currentTime = status.currentTime;

	const formatSeconds = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	if (!mediation) {
		return <Text>Mediation not found</Text>;
	}

	return (
		<SafeAreaView className="flex-1 p-2 justify-between bg-orange-400">
			<AnimatedBackground />
			{/* Screen content */}
			<View className="flex-1">
				{/* Top part of the screen */}
				<View className="flex-1">
					<View className="flex flex-row items-center justify-between p-10 ">
						<AntDesign name="infocirlceo" size={24} color="black" />

						<View className="bg-zinc-800 p-2 rounded-md">
							<Text className="text-zinc-100 font-semibold">
								Today's Meditation
							</Text>
						</View>

						<AntDesign
							onPress={() => {
								router.back();
							}}
							name="close"
							size={24}
							color="black"
						/>
					</View>

					<Text className="text-3xl mt-10 text-center text-zinc-800 font-semibold">
						{mediation.title}: ({mediation.duration} min)
					</Text>
				</View>

				{/* Play/Pause button */}
				<Pressable
					onPress={() => (player.playing ? player.pause() : player.play())}
					className="bg-zinc-800 self-center w-20 aspect-square rounded-full items-center justify-center"
				>
					<FontAwesome6
						name={status.playing ? "pause" : "play"}
						size={24}
						color="snow"
					/>
				</Pressable>

				{/* Bottom part of the screen */}
				<View className="flex-1">
					{/* Footer: Player */}
					<View className="p-5 mt-auto">
						<View className="flex-row justify-between">
							<MaterialIcons name="airplay" size={24} color="#3A3937" />
							<MaterialCommunityIcons
								name="cog-outline"
								size={24}
								color="#3A3937"
							/>
						</View>

						{/* Playback slider */}
						<Slider
							onSlidingComplete={(value) => {
								player.seekTo(value * duration);
							}}
							style={{ height: 3, width: "100%" }}
							value={currentTime / duration}
							minimumValue={0}
							maximumValue={1}
							minimumTrackTintColor="#3A3937"
							maximumTrackTintColor="#3A393755"
							thumbTintColor="#3A3937"
						/>
						{/* Timestamps-Duration: */}
						<View className="flex-row  justify-between">
							<Text className="text-zinc-800">
								{formatSeconds(currentTime)}
							</Text>
							<Text className="text-zinc-800">{formatSeconds(duration)}</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
