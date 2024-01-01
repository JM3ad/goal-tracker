import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ResolutionsContext from "src/app/contexts/resolution-context";
import ResolutionService from "../services/resolution-service";

const OldResolutions = () => {
    const resolutionContext = useContext(ResolutionsContext);
    const currentYear = new Date().getFullYear();

    return (
        <div className="app-page">
            <h1>Your Old Goals</h1>

            {resolutionContext.resolutions
                .filter(
                    (resolution) =>
                        resolution.relevantYear &&
                        resolution.relevantYear != currentYear
                )
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((resolution) => {
                    return (
                        <div className="goal-summary" key={resolution.id}>
                            <Link
                                key={resolution.id}
                                to={`/view/${resolution.id}/graph`}
                                className="action-button"
                                style={{
                                    marginTop: "0.5rem",
                                }}
                            >
                                {resolution.name}
                            </Link>
                            <span
                                className="progress-summary"
                                style={{
                                    color: ResolutionService.getProgressColor(
                                        resolution
                                    ),
                                }}
                            >
                                {resolution.getProgress()} / {resolution.target}
                            </span>
                        </div>
                    );
                })}
        </div>
    );
};

export default OldResolutions;
