import React, { useContext } from "react";
import ResolutionsContext from "src/app/contexts/resolution-context";

const HomePage = () => {
    const resolutionContext = useContext(ResolutionsContext);

    return (
        <div className="app-page">
            <h1>Your Goals</h1>

            {resolutionContext.resolutions.map((resolution) => {
                return <div key={resolution.id}>{resolution.name}</div>;
            })}
        </div>
    );
};

export default HomePage;
