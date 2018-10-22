import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import App from "../../common/components/app";
import template from "./lib/template";

export default (req, res) => {
  try {

    const stylesheet = new ServerStyleSheet();

    const application = renderToString(
      <StyleSheetManager sheet={stylesheet.instance}>
        <App />
      </StyleSheetManager>
    );

    const styles = stylesheet.getStyleTags();
    const html = template(application, styles);
    
    res.send(html);
  } catch (e) {
    console.log(e);
    res.send("Error");
  }
};
