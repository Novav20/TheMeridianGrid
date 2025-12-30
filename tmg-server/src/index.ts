// 1. Import express, Cors, and dotenv
import express from "express";
import Cors from "cors";
import dotenv from "dotenv";

// 2. Configure dotenv to load environment variables
dotenv.config({ path: "../.env" });
// 3. Initialize the express application
const app = express();
// 4. Define the port (use process.env.PORT or default to 3000)
const port = process.env.PORT || 3000;
// 5. Use the express.json() middleware to parse JSON bodies
app.use(express.json());
// 6. Use the cors() middleware
app.use(Cors());
// 7. Create a basic GET route at '/' that returns a "Hello from TMG Server!" message
app.get("/", (req, res) => {
  res.send("Hello from TMG Server!");
});
// 8. Start the server and log a message indicating the port it's running on
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
