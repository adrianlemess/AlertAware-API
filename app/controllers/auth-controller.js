import mongoose from "mongoose";
import passport from "passport";
import * as tokenService from "../services/token-service";
import * as userService from "../services/user-service";
import User from "../models/user";

export const signin = (req, res, next) => {

    passport.authenticate('local', (err, user) => {
        var error = err;
        if (error) {
            res.status(401).json(error)
        } else {
            user.password = undefined;
            user.salt = undefined;
            console.log(user);
            tokenService.createToken(user)
                .then(token => {
                    res.status(202).json({ user: user, token: token });
                })
        }
        // Remove sensitive data before login

    })(req, res, next)
}

export const signout = (req, res) => {
    tokenService.expireToken(req.headers)
        .then(success => {
            if (success) {
                delete req.user;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(err => {
            res.status(401).send(err.message);
        })
}

export const signup = (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    const username = req.body.username || '';
    const name = req.body.name || '';

    if (email == '' || password == '' || username == '' || name == '') {
        return res.sendStatus(400);
    }

    // Init Variables
    let user = new User(req.body);
    // Add missing user fields
    user.provider = 'local';
    // Then save the user
    console.log(user);
    userService.insertUser(user)
        .then(user => removeSensitiveDataAndCreateToken(user))
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err.message))
}

function removeSensitiveDataAndCreateToken(user) {
    return new Promise((resolve, reject) => {
        user.password = undefined;
        user.salt = undefined;
        tokenService.createToken(user)
            .then(token => {
                resolve({ user: user, token: token });
            })
            .catch(err => reject(err));
    })
}

export const isAuthenticated = (req, res, next) => {
    tokenService.verifyToken(req.headers)
        .then(data => {
            req.user = data;
            next();
        }).catch(err => {
            console.log(err);
            res.status(403).json({
                "mensagem": "Não Autorizado"
            });
        }).bind(null, next);
}