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
                if (!user) {
                    done("Password or Username not match", null)
                } else {
                    validatePasswordIfUsernameIsValid(user, password)
                        .then(result => {
                            if (!result) {
                                done("Password or Username not match", result);
                            }
                            // success
                            done(null, user);
                        })
                }

            })
            .catch(err => done(err, null));
    }))

}

function findValidUser(username, passport) {
    return User.findOne({
        username: username.toLowerCase()
    })
}

function validatePasswordIfUsernameIsValid(user, password) {
    return user.comparePassword(password)
}



function handleError(err) {
    console.log(err);
}

export default localStrategy;