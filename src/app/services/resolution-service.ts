import Resolution, { SerializedResolution } from "src/app/models/resolution";
import { ProgressRecord } from "../models/progress-record";

const RESOLUTIONS_KEY = "RESOLUTIONS";

class ResolutionService {
    static loadResolutions: () => Resolution[] = () => {
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

    public static daysIntoYear = (date: Date) => {
        return (
            (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
                Date.UTC(date.getFullYear(), 0, 0)) /
            24 /
            60 /
            60 /
            1000
        );
    };

    static getProgressColor = (resolution: Resolution): string => {
        const numberOfDaysInCurrentYear = this.daysIntoYear(new Date());
        // Ignores leap years, won't worry
        const proportionOfYearPassed = numberOfDaysInCurrentYear / 365;

        const onTrackDark = "#73C740",
            targetCloseDark = "#FBA640",
            targetFarDark = "#F5A0C2";

        const percent = resolution.getProgress() / resolution.target;
        if (percent >= proportionOfYearPassed) {
            return onTrackDark;
        } else if (percent >= proportionOfYearPassed * 0.5) {
            return targetCloseDark;
        } else {
            return targetFarDark;
        }
    };
}

export default ResolutionService;
