import mongoose from "mongoose";
import passport from "passport";
import * as tokenService from "../services/token-service";
import * as userService from "../services/user-service";
import User from "../models/user";

export const signin = (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        var error = err;
        if (error) return res.status(401).send(error);
        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;
        tokenService.createToken(user)
            .then(token => {
                res.status(201).json({ user: user, token: token });
            })
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
            res.status(401).send(err);
        })
}

export const signup = (req, res) => {
    var email = req.body.email || '';
    var password = req.body.password || '';
    var username = req.body.username || '';
    var name = req.body.name || '';

    if (email == '' || password == '' || username == '' || name == '') {
        return res.sendStatus(400);
    }

    // Init Variables
    var user = new User(req.body);
    // Add missing user fields
    user.provider = 'local';
    // Then save the user
    userService.insertUser(user, function(err, user) {
        if (err) {
            console.log(err.message);
            return res.status(400).send(err);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            tokenService.createToken(user)
                .then(token => {
                    res.status(201).json({ user: user, token: token });
                })
        }
    });
}

export const isAuthenticated = (req, res, next) => {
    tokenService.verifyToken(req.headers)
        .then(function(next, data) {
            req.user = data;
            next();
        }).catch(err => {
            res.status(401).json({
                "mensagem": "Não Autorizado",
                "err ": err
            });
        }).bind(null, next);
}