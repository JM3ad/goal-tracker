interface Serializable<T> {
    serialize(): T;
}

export type SerializedResolution = {
    id: string;
    name: string;
    target: number;
    records: string[];
};

class Resolution implements Serializable<SerializedResolution> {
    id: string;
    name: string;
    target: number;
    records: Date[];

    constructor(id: string, name: string, target: number, records: string[]) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.records = records.map((dateString) => new Date(dateString));
    }

    addRecord = () => {
        this.records.push(new Date());
    };

    serialize = () => {
        return {
            id: this.id,
            name: this.name,
            target: this.target,
            records: this.records.map((date) => date.toDateString()),
        };
    };

    static deserialize = (json: SerializedResolution) => {
        const records = json.records !== null ? json.records : [];
        const dateRecords = records;
        return new Resolution(json.id, json.name, json.target, dateRecords);
    };
}

export default Resolution;
