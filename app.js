import http from 'http'
import { env, mongo, port, ip } from './config/config';
import config from './config/config';
import mongoose from './config/mongoose';
import express from './config/express';

const app = express();
mongoose(()=>{
    app.listen(port, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    });
});

export default app;
