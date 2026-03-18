import "dotenv/config";
import { getTrackCurriculum } from "./app/actions/curriculum-actions";

async function run() {
    const trackSlug = "data-science";
    const track = await getTrackCurriculum(trackSlug);

    if (!track || !track.courses || track.courses.length === 0) {
        console.log("Returned NULL!");
    } else {
        console.log("Will render with courses count:", track.courses.length);
        const sortedCourses = [...track.courses].sort((a, b) => {
            if (a.title.includes("Standard")) return -1;
            if (b.title.includes("Standard")) return 1;
            if (a.title.includes("Fast")) return -1;
            if (b.title.includes("Fast")) return 1;
            return 0;
        });
        
        console.log("Sorted courses:");
        sortedCourses.forEach(c => console.log(c.title, c.modules.length, "modules"));
        
        console.log("First course modules:", sortedCourses[0]?.modules);
    }
}

run();
