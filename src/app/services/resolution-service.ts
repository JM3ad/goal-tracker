import Resolution, { SerializedResolution } from "src/app/models/resolution";
import { ProgressRecord } from "../models/progress-record";

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

    static addRecord = (id: string, record: ProgressRecord) => {
        try {
            const jsonString = localStorage.getItem(RESOLUTIONS_KEY);
            const existingResolutions =
                jsonString != null ? JSON.parse(jsonString) : [];
            const existingIndex = existingResolutions.findIndex(
                (e: SerializedResolution) => e.id === id
            );
            if (existingIndex === -1) {
                console.warn("No such element");
                return;
            }
            existingResolutions[existingIndex].records.push(record);
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
