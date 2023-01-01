import Resolution, { SerializedResolution } from "src/app/models/resolution";

const RESOLUTIONS_KEY = "RESOLUTIONS";

class ResolutionService {
    static loadResolutions: () => Resolution[] = () => {
        // TODO try/catch
        const jsonString = localStorage.getItem(RESOLUTIONS_KEY);
        if (jsonString == null) {
            return [];
        }
        const resolutions = JSON.parse(jsonString).map(
            (res: SerializedResolution) => Resolution.deserialize(res)
        );
        return resolutions;
    };

    static addResolution: (resolution: Resolution) => void = (
        resolution: Resolution
    ) => {
        try {
            const jsonString = localStorage.getItem(RESOLUTIONS_KEY);
            const existingResolutions =
                jsonString != null ? JSON.parse(jsonString) : [];
            existingResolutions.push(resolution.serialize());
            localStorage.setItem(
                RESOLUTIONS_KEY,
                JSON.stringify(existingResolutions)
            );
        } catch (error) {
            console.warn(error);
        }
    };
}

export default ResolutionService;
