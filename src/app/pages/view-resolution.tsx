import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ResolutionsContext from "../contexts/resolution-context";
import ResolutionService from "../services/resolution-service";

const ViewResolutionPage: React.FC = () => {
    const { resolutionId } = useParams();
    const resolutionContext = useContext(ResolutionsContext);
    const [progress, setProgress] = useState<number>(1);

    const updateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO Check this is numeric
        setProgress(Number(e.target.value));
    };

    const recordNew = () => {
        if (resolutionId) {
            ResolutionService.addRecord(resolutionId, {
                date: new Date().toISOString(),
                count: progress,
            });
            resolutionContext.refresh();
        }
    };

    // TODO deal with missing ones
    const resolution = resolutionContext.resolutions.filter(
        (res) => res.id == resolutionId
    )[0];
    if (!resolution) {
        return <></>;
    }

    const existingProgress = resolution.getProgress();
    return (
        <div className="app-page">
            <h2>{resolution.name}</h2>
            <div>
                {existingProgress} / {resolution.target}
            </div>
            <div className="record-progress-form">
                <input
                    name="progress"
                    value={progress}
                    onChange={updateProgress}
                ></input>
                <button className="action-button" onClick={recordNew}>
                    Record progress
                </button>
            </div>
        </div>
    );
};

export default ViewResolutionPage;
