import React, { useContext, useState } from "react";
import ResolutionsContext from "src/app/contexts/resolution-context";
import ResolutionService from "src/app/services/resolution-service";

const Export = () => {
    const resolutionContext = useContext(ResolutionsContext);
    const [backingData, setBackingData] = useState<string>("");

    const generateJson = () => {
        return JSON.stringify(resolutionContext.resolutions);
    };
    const copyToClipboard = () => {
        const output = generateJson();
        console.log(output);
        navigator.clipboard.writeText(output);
    };

    const saveImport = () => {
        ResolutionService.overrideValues(JSON.parse(backingData));
    };
    const updateBackingData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackingData(e.target.value);
    };

    return (
        <div className="app-page">
            <h1>Transfer Data</h1>

            <button className="action-button" onClick={copyToClipboard}>
                Copy resolutions to clipboard
            </button>

            <input
                type="text"
                value={backingData}
                onChange={updateBackingData}
            ></input>
            <button className="action-button" onClick={saveImport}>
                Override with import
            </button>
        </div>
    );
};

export default Export;
