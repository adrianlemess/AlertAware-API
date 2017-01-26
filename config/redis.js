import redisLib from 'redis';
import { redis } from './config';
const logger = require("mm-node-logger")(module);

var redisClient = redisLib.createClient(redis.port, redis.host);

redisClient.on('connect', function() {
    logger.info('Redis connected to ' + redis.host + ':' + redis.port);
});

redisClient.on('error', function(err) {
    logger.error('Redis error: ' + err);
});

export default redisClient;