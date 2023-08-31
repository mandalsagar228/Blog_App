import express from "express";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8700;

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up router.
app.use("/", router);

// setting up the express server.
app.listen(PORT, () => {
  console.log(`Server is running successfully on port no ${PORT}`);
});
// Connecting to the database.
Connection();
