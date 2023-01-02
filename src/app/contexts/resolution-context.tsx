import React from "react";
import Resolution from "src/app/models/resolution";

export type ResolutionContextType = {
    resolutions: Resolution[];
    refresh: () => void;
};

const ResolutionsContext = React.createContext<ResolutionContextType>({
    resolutions: [],
    refresh: () => null,
});

export default ResolutionsContext;
