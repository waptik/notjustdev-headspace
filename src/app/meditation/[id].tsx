import { meditations } from "@/data";
import {
	AntDesign,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
	Audio,
	type AVPlaybackStatus,
	type AVPlaybackStatusSuccess,
} from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import audio1 from "@assets/meditations/audio1.mp3";
import { useEffect, useState } from "react";

/**
 *
 * TODO:
 * 1. Wait for apple dev account enrollment email status
 * 2. Build the app locally in order to fix `Cannot find module 'ExpoAudio'` error message
 * 3. Revert back to using `expo-audio` package
 */

export default function MediationDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [sound, setSound] = useState<Audio.Sound>(() => new Audio.Sound());
	const [status, setStatus] = useState<AVPlaybackStatusSuccess | undefined>();
	const [isPlaying, setIsPlaying] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const mediation = meditations.find((m) => m.id === Number(id));
	const duration = Number(status?.durationMillis || 0);
	const currentTime = Number(status?.positionMillis || 0);

	const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
		if (!status.isLoaded) {
			setError(status.error);
			return;
		}

		setIsPlaying(status.isPlaying);
		setStatus(status);
	};

	const onPlayPause = async () => {
		console.log(`[onPlayPause] >> sound: ${sound ? "found" : "not found"}`);

		console.log("[onPlayPause] >>", isPlaying);

		if (!sound) {
			return;
		}
		if (isPlaying) {
			await sound.pauseAsync();
		} else {
			await sound.playAsync();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const playSound = async () => {
			const { sound } = await Audio.Sound.createAsync(audio1);
			setSound(sound);

			sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
		};

		playSound();
	}, []);

	useEffect(() => {
		console.log("[useEffect] >> Unloading sound");
		sound ? () => sound.unloadAsync() : undefined;
	}, [sound]);

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
							onPress={async () => {
								await sound.unloadAsync();
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
					<Text className="text-center text-zinc-800">
						Current time: {formatSeconds(currentTime)}, playing:{" "}
						{isPlaying ? "Yes" : "No"}
					</Text>
				</View>

				{/* Play/Pause button */}
				<Pressable
					onPress={onPlayPause}
					className="bg-zinc-800 self-center w-20 aspect-square rounded-full items-center justify-center"
				>
					<FontAwesome6
						name={isPlaying ? "pause" : "play"}
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
								sound.setPositionAsync(value * Number(duration));
							}}
							style={{ height: 3, width: "100%" }}
							value={Number(currentTime) / Number(duration)}
							minimumValue={0}
							maximumValue={1}
							minimumTrackTintColor="#3A3937"
							maximumTrackTintColor="#3A393755"
							thumbTintColor="#3A3937"
						/>
						{/* Timestamps-Duration: */}
						<View className="flex-row  justify-between">
							<Text className="text-zinc-800">
								{formatSeconds(Number(currentTime))}
							</Text>
							<Text className="text-zinc-800">
								{formatSeconds(Number(duration))}
							</Text>
						</View>
						{/* TODO: resume from where you left: -1:40:30 */}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
