import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import Promise from "bluebird"
import User from "../models/user";

function localStrategy(User, config) {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        findValidUser(username, passport)
            .then(user => {
                validatePasswordIfUsernameIsValid(user, password)
                    .then(result => {
                        if (!result) {
                            done(null, result, "Password or Username not match");
                        }
                        // success
                        done(null, user);
                    })
            })
            .catch(err => done(err, null));
    }))

}

function findValidUser(username, passport) {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username.toLowerCase()
        }, (err, user) => {
            if (err) reject(err);
            resolve(user);
        })
    })
}

function validatePasswordIfUsernameIsValid(user, password) {
    // no user found with that username
    if (!user) {
        throw new Error("The username is not registered.");
    }
    return user.comparePassword(password)
}



function handleError(err) {
    console.log(err);
}

export default localStrategy;