import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
    return (
        <div className="app-page">
            <h1>404</h1>
            <p>
                Hmm, looks like that page wasn't found. Return to the homepage?
            </p>
            <Link className="home-link" to={"/"}>
                Home
            </Link>
        </div>
    );
};

export default PageNotFound;
