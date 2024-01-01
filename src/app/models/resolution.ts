import { ProgressRecord } from "./progress-record";

interface Serializable<T> {
    serialize(): T;
}

export type SerializedResolution = {
    id: string;
    name: string;
    target: number;
    records: ProgressRecord[];
    relevantYear: number;
};

class Resolution implements Serializable<SerializedResolution> {
    id: string;
    name: string;
    target: number;
    records: ProgressRecord[];
    relevantYear: number;

    constructor(
        id: string,
        name: string,
        target: number,
        records: ProgressRecord[],
        relevantYear: number
    ) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.records = records;
        this.relevantYear = relevantYear;
    }

    serialize = () => {
        return {
            id: this.id,
            name: this.name,
            target: this.target,
            records: this.records,
            relevantYear: this.relevantYear,
        };
    };

    getProgress = () => {
        return this.records.reduce((prev, curr) => prev + curr.count, 0);
    };

    static deserialize = (json: SerializedResolution) => {
        const records = json.records !== null ? json.records : [];
        // For historical reasons, assume any resolutions without this specified were created in 2023
        const relevantYear =
            json.relevantYear !== null && json.relevantYear !== undefined
                ? json.relevantYear
                : 2023;
        return new Resolution(
            json.id,
            json.name,
            json.target,
            records,
            relevantYear
        );
    };
}

export default Resolution;
