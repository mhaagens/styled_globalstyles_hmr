import React from "react";
import { hydrate } from "react-dom";
import App from "../common/components/app";

const renderApp = () => hydrate(<App />, document.getElementById("root"));

renderApp();