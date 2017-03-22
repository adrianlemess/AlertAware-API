import redisLib from 'redis';
// import redisMock from 'redis-mock';
const logger = require("mm-node-logger")(module);
import { env, redis } from './config';

let redisClient = redisLib.createClient(redis.port, redis.host);

redisClient.on('connect', () => {
    logger.info('Redis connected to ' + redis.host + ':' + redis.port);
});

redisClient.on('error', (err) => {
    logger.error('Redis error: ' + err);
});

export default redisClient;