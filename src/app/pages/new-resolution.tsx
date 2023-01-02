import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Resolution from "src/app/models/resolution";
import ResolutionService from "src/app/services/resolution-service";
import ResolutionsContext from "src/app/contexts/resolution-context";

const NewResolutionPage = () => {
    const [title, setTitle] = useState<string>("");
    const [target, setTarget] = useState<number>(0);

    const navigate = useNavigate();
    const resolutionContext = useContext(ResolutionsContext);
    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const updateTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO Check this is numeric
        setTarget(Number(e.target.value));
    };

    const create = () => {
        if (target === 0 || !title || title.trim() === "") {
            return;
        }

        ResolutionService.addResolution(
            new Resolution(uuidv4(), title, target, [])
        );
        resolutionContext.refresh();
        navigate("/");
    };

    return (
        <div className="app-page">
            <label htmlFor="title">Name</label>
            <input name="title" value={title} onChange={updateTitle}></input>
            <label htmlFor="target">Target</label>
            <input name="target" value={target} onChange={updateTarget}></input>
            <button className="action-button" onClick={create}>
                Save
            </button>
        </div>
    );
};

export default NewResolutionPage;
