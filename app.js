import { env, mongo, port, ip } from "./config/config";
import mongoose from "./config/mongoose";
import express from "./config/express";
const app = express();

mongoose.connect(mongo.uri);
app.set('port', 7000);

export default app;