import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Vercel is working!");
});

export default app;
