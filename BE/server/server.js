import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", async (req, res) => {
  res.send("API GREENPROBO OK");
});

// start the Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
