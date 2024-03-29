import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { format } from "date-fns";
import Resolution from "../models/resolution";
import ResolutionService from "../services/resolution-service";

const getFormattedData = (resolution: Resolution) => {
    const records = resolution.records;
    const dataPerDay: { [name: string]: number } = {};
    const year = resolution.relevantYear;
    const isCurrentYear = resolution.relevantYear == new Date().getFullYear();
    records.forEach((record) => {
        const day = new Date(record.date).toDateString();
        if (!dataPerDay[day]) {
            dataPerDay[day] = 0;
        }
        dataPerDay[day] += record.count;
    });
    const perDayEntry = [
        {
            name: new Date(Date.UTC(year, 0, 1)).toDateString(),
            amount: 0,
        },
    ];
    for (const [key, value] of Object.entries(dataPerDay)) {
        perDayEntry.push({
            name: key,
            amount: value,
        });
    }
    // Add an entry for today to show latest data:
    if (isCurrentYear) {
        perDayEntry.push({
            name: new Date().toDateString(),
            amount: 0,
        });
    } else {
        perDayEntry.push({
            name: new Date(Date.UTC(year, 11, 31)).toDateString(),
            amount: 0,
        });
    }

    const sorted = perDayEntry.sort(
        (a, b) => new Date(a.name).valueOf() - new Date(b.name).valueOf()
    );

    const data = sorted.reduce(function (arrSoFar: any[], next) {
        const start =
            arrSoFar.length === 0 ? 0 : arrSoFar[arrSoFar.length - 1].amount;
        arrSoFar.push({
            name: new Date(next.name),
            amount: start + next.amount,
        });
        return arrSoFar;
    }, []);
    return data;
};

const ResolutionGraph: React.FC = () => {
    const { resolutionId } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [resolution, setResolution] = useState<Resolution | undefined>(
        undefined
    );

    useEffect(() => {
        const resolutions = ResolutionService.loadResolutions();
        const matchingResolutions = resolutions.filter(
            (r) => r.id == resolutionId
        );
        if (matchingResolutions.length !== 1) {
            console.warn("Wrong number of resolutions match!");
            return;
        }
        setResolution(matchingResolutions[0]);
        setLoading(false);
    }, [resolutionId]);

    if (isLoading || !resolution) {
        return <>Loading</>;
    }

    // Assume records in order
    const data = getFormattedData(resolution);
    const year = resolution.relevantYear;

    const ticks = [
        Date.UTC(year, 0, 1),
        Date.UTC(year, 3, 1),
        Date.UTC(year, 6, 1),
        Date.UTC(year, 9, 1),
        Date.UTC(year, 11, 31),
    ];

    const domain = [Date.UTC(year, 0, 1), Date.UTC(year, 11, 31)];
    const dateFormatter = (date: string) => {
        return format(new Date(date), "dd/MMM");
    };

    const isOldResolution = year != new Date().getFullYear();
    const today = new Date();
    const expectedProgress = isOldResolution
        ? resolution.target
        : ((ResolutionService.daysIntoYear(today) - 1) / 365) *
          resolution.target;
    const expected = [
        {
            name: Date.UTC(year, 0, 1),
            expected: 0,
        },
    ];

    if (!isOldResolution) {
        const currentDay = new Date();
        expected.push({
            name: Date.UTC(year, currentDay.getMonth(), currentDay.getDate()),
            expected: expectedProgress,
        });
    }

    expected.push({
        name: Date.UTC(year, 11, 31),
        expected: resolution.target,
    });

    return (
        <ResponsiveContainer aspect={4.0 / 3.0} width="100%">
            <LineChart
                data={data}
                margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
            >
                <XAxis
                    dataKey="name"
                    ticks={ticks}
                    domain={domain}
                    scale="time"
                    tickFormatter={dateFormatter}
                    type="number"
                />
                <YAxis />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#ff7300"
                    yAxisId={0}
                    dot={false}
                />
                <Line
                    type="monotone"
                    data={expected}
                    dataKey="expected"
                    stroke="#ff7399"
                    yAxisId={0}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ResolutionGraph;
