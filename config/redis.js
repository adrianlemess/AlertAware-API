// import redisLib from 'redis';
// import redisMock from 'redis-mock';
// const logger = require("mm-node-logger")(module);
// import { env, redis } from './config';

// if (env == 'test') {
//     let redisClient = redisMock.createClient(redis.port, redis.host);
// } else {
//     let redisClient = redisLib.createClient(redis.port, redis.host);
// }
// let redisClient = redisLib.createClient(redis.port, redis.host);


// redisClient.on('connect', function() {
//     logger.info('Redis connected to ' + redis.host + ':' + redis.port);
// });

// redisClient.on('error', function(err) {
//     logger.error('Redis error: ' + err);
// });

// export default redisClient;