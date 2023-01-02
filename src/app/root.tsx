import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// @ts-ignore
import { BASE_URL } from "env";
import "src/styles/Pages.scss";

import NavBar from "src/app/components/navbar";
import { NavBarLinks } from "src/app/data/navbar-links";

import PageNotFound from "src/app/pages/page-not-found";
import HomePage from "src/app/pages/home";
import NewResolutionPage from "src/app/pages/new-resolution";
import ResolutionsContext from "src/app/contexts/resolution-context";
import ResolutionService from "src/app/services/resolution-service";
import Resolution from "src/app/models/resolution";
import ViewResolutionPage from "src/app/pages/view-resolution";

const Root: React.FC = () => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
        history.replaceState(null, BASE_URL || "", redirect);
    }

    const [resolutions, setResolutions] = useState<Resolution[]>([]);
    const load = () => {
        const res = ResolutionService.loadResolutions();
        setResolutions(res);
    };
    useEffect(() => {
        load();
    }, []);

    return (
        <ResolutionsContext.Provider
            value={{
                resolutions: resolutions,
                refresh: load,
            }}
        >
            <Router basename={BASE_URL}>
                <NavBar links={NavBarLinks} />
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/new" element={<NewResolutionPage />}></Route>
                    <Route
                        path="/view/:resolutionId"
                        element={<ViewResolutionPage />}
                    ></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </Router>
        </ResolutionsContext.Provider>
    );
};

export default Root;
