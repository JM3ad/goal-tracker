import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ResolutionsContext from "src/app/contexts/resolution-context";

const HomePage = () => {
    const resolutionContext = useContext(ResolutionsContext);
    const navigate = useNavigate();

    const visitResolution = (id: string) => {
        navigate(`/view/${id}`);
    };

    return (
        <div className="app-page">
            <h1>Your Goals</h1>

            {resolutionContext.resolutions.map((resolution) => {
                return (
                    <div
                        key={resolution.id}
                        onClick={() => visitResolution(resolution.id)}
                    >
                        {resolution.name}
                    </div>
                );
            })}
        </div>
    );
};

export default HomePage;
