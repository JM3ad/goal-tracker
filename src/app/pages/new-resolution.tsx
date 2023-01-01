import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Resolution from "src/app/models/resolution";
import ResolutionService from "src/app/services/resolution-service";
import ResolutionsContext from "src/app/contexts/resolution-context";

const NewResolutionPage = () => {
    const [title, setTitle] = useState<string>("");
    const [target, setTarget] = useState<number>(0);
    const resolutionContext = useContext(ResolutionsContext);
    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const updateTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO Check this is numeric
        setTarget(Number(e.target.value));
    };

    const create = () => {
        ResolutionService.addResolution(
            new Resolution(uuidv4(), title, target, [])
        );
        resolutionContext.refresh();
    };

    // TODO Split and share with editing
    // useEffect(() => {
    //     const recipe = props.recipe;
    //     if (recipe) {
    //         setRecipeName(recipe.name);
    //         if (recipe.ingredients) setIngredients(recipe.ingredients);
    //         if (recipe.url) setUrl(recipe.url);
    //         if (recipe.method) setSteps(recipe.method);
    //         if (recipe.tags) setTags(recipe.tags);
    //     }
    // }, [props]);

    return (
        <div className="app-page">
            <label htmlFor="title">Name</label>
            <input name="title" value={title} onChange={updateTitle}></input>
            <label htmlFor="target">URL</label>
            <input name="target" value={target} onChange={updateTarget}></input>
            <div>
                <button className="action-button" onClick={create}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default NewResolutionPage;
