import { env, mongo, port, ip } from "./config/config";
import mongoose from "./config/mongoose";
import express from "./config/express";
const app = express();

mongoose.connect(mongo.uri);


app.listen(port, () => {
    console.info("Express server listening on http://%s:%d, in %s mode", ip, port, env);
});


export default app;