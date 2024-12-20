import { Meditation } from "./types";

// generate a list of meditations with random titles(non generic) and durations, max 10. The title should be real meditation titles.
export const meditations: Meditation[] = [
    {
        id: 1,
        title: "60 Seconds Of Mindfulness",
        duration: 1,
        type: "audio",
        pro: false,
    },
    {
        id: 2,
        title: "Body Scan Meditation",
        duration: 10,
        type: "audio",
        pro: false,
    },
    {
        id: 3,
        title: "5 Minutes Breathing Exercise",
        duration: 5,
        type: "video",
        pro: true,
    },
    {
        id: 4,
        title: "Love-Kindness Practice",
        duration: 15,
        type: "audio",
        pro: false,
    },
    {
        id: 5,
        title: "Stress Relief Meditation",
        duration: 45,
        type: "video",
        pro: true,
    },
    {
        id: 6,
        title: "Meditation for Anxiety",
        duration: 20,
        type: "video",
        pro: true,
    },
];
