import jwt from "jsonwebtoken";
import config from "../../config/config";
import redis from "../../config/redis";
import { expiration, jwtSecret } from "../../config/config";
import * as redisService from "./redis-service";
import Promise from "bluebird";
const ttl = expiration;

export const createToken = (payload) => {
    return validateToken(payload)
        .then(user => createTokenWithPayloadAndStore(user))
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
        return redisService.saveToken(token, ttl, payload);
    } else {
        return token;
    }
}

export const expireToken = (headers) => {
    return extractTokenFromHeader(headers)
        .then(token => redisService.deleteToken(token))
}

export const verifyToken = (headers) => {
    return extractTokenFromHeader(headers)
        .then(token => redisService.getToken(token))
        .then(result => result)

}

export const extractTokenFromHeader = (headers) => {
    return new Promise((resolve, reject) => {
        if (headers == null) reject('Header is null');
        if (headers.authorization == null) reject('Authorization header is null');

        var authorization = headers.authorization;
        var authArr = authorization.split(' ');
        console.log(authArr)
        if (authArr.length !== 2) reject('Authorization header value is not of length 2');
        // retrieve token
        var token = authArr[1];
        // verify token
        try {
            jwt.verify(token, config.token.secret);
            resolve(token);
        } catch (err) {
            reject("token invalid");
        }

    })
}