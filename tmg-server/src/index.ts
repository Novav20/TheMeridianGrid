import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import path from "path";
import assetRouter from "./routes/asset.routes";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());

// =========================================================
// Routes
// =========================================================

app.get("/", (req, res) => {
  res.send("TMG Server is running.");
});

app.use("/api/assets", assetRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
