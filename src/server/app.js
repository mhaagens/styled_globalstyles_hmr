import express from "express";
import render from "./server-renderer";

const app = express();

app.get("/", render);

export default app;
