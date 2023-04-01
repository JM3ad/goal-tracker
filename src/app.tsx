import ReactDOM from "react-dom";
import React from "react";

import "src/app.css";
import Root from "src/app/root";

const App = () => {
    return <Root />;
};

ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service_worker.js");
    console.log("Registering service worker");
}
