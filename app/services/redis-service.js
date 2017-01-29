import redis from "../../config/redis";
import Promise from "bluebird";



export const saveToken = (token, ttl, payload) => {

    // stores a token with payload data for a ttl period of time
    return new Promise((resolve, reject) => {
        redis.setex(token, ttl, JSON.stringify(payload), function(token, err, reply) {
            if (err) {
                reject(err);
            }
            if (reply) {
                resolve(token);
            } else {
                reject('Token not set in Redis');
            }
        }.bind(null, token))
    })
}