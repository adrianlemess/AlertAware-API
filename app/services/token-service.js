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

function getValidtokenFromHeaders(headers) {
    return new Promise((resolve, reject) => {
        var token = extractTokenFromHeader(headers);
        if (token == null)
            reject('Token is null');
        resolve(token);
    })

}

export const expireToken = (headers) => {
    return getValidtokenFromHeaders(headers)
        .then(token => redisService.deleteToken(token))
        .then(result => (result))
        .catch(err => err)
}

export const verifyToken = (headers) => {
    return getValidtokenFromHeaders(headers)
        .then(token => redisService.getToken(token))
        .then(result => console.log(result))
        .catch(err => err)

}

export const extractTokenFromHeader = (headers) => {
    console.log(headers.authorization);
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