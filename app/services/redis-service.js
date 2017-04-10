import redis from "../../config/redis";
import Promise from "bluebird";

export const saveToken = (token, ttl, payload) => {
    // stores a token with payload data for a ttl period of time

    return new Promise((resolve, reject) => {
        if (redis) {
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
        } else {
            reject("Redis is not working")
        }

    })
}

export const deleteToken = (token) => {
    return new Promise((resolve, reject) => {

        if (redis) {
            redis.del(token, function(err, reply) {
                if (err) {
                    reject(err);
                } else if (reply === 0) {
                    reject(new Error("Token not found"));
                } else if (reply === 1)
                    resolve("Deletado com sucesso");
            })

        } else {
            resolve("Redis unavailable");
        }
    })
}

export const getToken = (token) => {

    return new Promise((resolve, reject) => {
        if (redis) {
            redis.get(token, (err, userData) => {
                console.log(err + userData)
                if (err) { reject(err); }

                if (!userData) {
                    reject('Token not found');
                }
                resolve(JSON.parse(userData));
            });
        }
    })
}