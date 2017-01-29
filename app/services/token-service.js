import jwt from "jsonwebtoken";
import config from "../../config/config";
import redis from "../../config/redis";
import { expiration, jwtSecret } from "../../config/config";
import * as redisService from "./redis-service";
import Promise from "bluebird";
const ttl = expiration;

export const createToken = (payload) => {
    return validateToken(payload)
        .then(createTokenWithPayloadAndStore)
        .then(token => token)
        .catch(err => err)
}

function validateToken(payload) {
    return new Promise((resolve, reject) => {
        if (payload != null && typeof payload !== 'object') {
            reject('payload is not an Object');
        }

        if (ttl != null && typeof ttl !== 'number') {
            reject('ttl is not a valid Number')
        }

        resolve(payload)
    })
}

function createTokenWithPayloadAndStore(payload) {
    let token = jwt.sign(
        payload.toObject(),
        jwtSecret, { expiresIn: expiration });

    if (redis) {
        return redisService.saveToken(token, ttl, payload)
            .then((token) => token);
    } else {
        return token;
    }
}

/**
 * Expires a token by deleting the entry in redis.
 *
 * @method expireToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, true)` if successfully deleted
 */
export const expireToken = (headers, cb) => {
    try {
        var token = this.extractTokenFromHeader(headers);
        if (token == null) { return cb(new Error('Token is null')); }

        if (redis) {
            // delete token from redis
            redis.del(token, function(err, reply) {
                if (err) {
                    return cb(err);
                }

                if (!reply) {
                    return cb(new Error('Não autorizado'));
                }

                return cb(null, true);
            });
        } else {
            cb(null, true);
        }
    } catch (err) {
        return cb(err);
    }
}


/**
 * Verify if token is valid.
 *
 * @method verifyToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, JSON.parse(userData))` if token exist
 */
export const verifyToken = (headers, cb) => {
    try {
        var token = this.extractTokenFromHeader(headers);

        if (token == null) { return cb(new Error('Token is null')); }

        if (redis) {
            // gets the associated data of the token
            redis.get(token, function(err, userData) {
                if (err) { return cb(err); }

                if (!userData) { return cb(new Error('Token not found')); }

                return cb(null, JSON.parse(userData));
            });
        } else {
            cb(null, true);
        }
    } catch (err) {
        return cb(err);
    }
}

export const extractTokenFromHeader = (headers) => {
    if (headers == null) throw new Error('Header is null');
    if (headers.authorization == null) throw new Error('Authorization header is null');

    var authorization = headers.authorization;
    var authArr = authorization.split(' ');
    if (authArr.length !== 2) throw new Error('Authorization header value is not of length 2');
    // retrieve token
    var token = authArr[1];

    // verify token
    try {
        jwt.verify(token, jwtSecret);
    } catch (err) {
        throw new Error('The token is not valid');
    }

    return token;
}