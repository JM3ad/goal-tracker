import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ResolutionsContext from "src/app/contexts/resolution-context";
import ResolutionService from "../services/resolution-service";

const HomePage = () => {
    const resolutionContext = useContext(ResolutionsContext);

    return (
        <div className="app-page">
            <h1>Your Goals</h1>

            {resolutionContext.resolutions.map((resolution) => {
                return (
                    <div className="goal-summary">
                        <Link
                            key={resolution.id}
                            to={`/view/${resolution.id}`}
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
                            : {resolution.getProgress()} / {resolution.target}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default HomePage;
