import express from "express";
import dotenv from "dotenv";
import connectToDb from "./Database/DBconnection.js";
import { bootstrap } from "./bootstrap.js";

const app = express();
dotenv.config();

const port = +process.env.PORT;

connectToDb();
bootstrap(app);

app.listen(port, () => console.log(`listening on port ${port}!`));
