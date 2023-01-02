import { ProgressRecord } from "./progress-record";

interface Serializable<T> {
    serialize(): T;
}

export type SerializedResolution = {
    id: string;
    name: string;
    target: number;
    records: ProgressRecord[];
};

class Resolution implements Serializable<SerializedResolution> {
    id: string;
    name: string;
    target: number;
    records: ProgressRecord[];

    constructor(
        id: string,
        name: string,
        target: number,
        records: ProgressRecord[]
    ) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.records = records;
    }

    serialize = () => {
        return {
            id: this.id,
            name: this.name,
            target: this.target,
            records: this.records,
        };
    };

    static deserialize = (json: SerializedResolution) => {
        const records = json.records !== null ? json.records : [];
        return new Resolution(json.id, json.name, json.target, records);
    };
}

export default Resolution;
