import express from "express";
import config from "../src/config";

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Config loaded",
    environment: config.env,
  });
});

export default app;
