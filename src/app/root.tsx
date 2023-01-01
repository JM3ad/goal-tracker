import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// @ts-ignore
import { BASE_URL } from "env";

import NavBar from "src/app/components/navbar";
import { NavBarLinks } from "src/app/data/navbar-links";

import PageNotFound from "src/app/pages/page-not-found";

const Root: React.FC = () => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
        history.replaceState(null, BASE_URL || "", redirect);
    }

    return (
        <Router basename={BASE_URL}>
            <NavBar links={NavBarLinks} />
            <Routes>
                <Route path="/" element={<>HOME</>}></Route>
                <Route path="/edit" element={<>EDIT</>}></Route>
                <Route element={<PageNotFound />}></Route>
            </Routes>
        </Router>
    );
};

export default Root;
