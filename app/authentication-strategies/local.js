import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import Promise from "bluebird"

function localStrategy(User, config) {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password) => {
        return findValidUser(username, passport)
            .then(validatePasswordIfUsernameIsValid)
            .then(returnAuthencationResponse)
            .then(userValid => userValid)
            .catch(handleError)
    }))

}

function findValidUser(username, passport) {
    return User.findOne({
        username: username.toLowerCase()
    })
}

function validatePasswordIfUsernameIsValid(user) {
    // no user found with that username
    if (!user) {
        throw new Error("The username is not registered.");
    }
    return user.comparePassword(password)
}

function resultAuthenticationValidate(isMatch) {
    return new Promise((resolve) => {
        if (err) { throw new Error(err); }

        // password did not match
        if (!isMatch) {
            throw new Error("The password is not correct.");
        }

        // success
        resolve(user);
    })
};

function handleError(err) {
    console.log(err);
}

export default localStrategy;
// function localStrategy(User, config) {
//     console.log("teste");
//     passport.use(new LocalStrategy({
//             usernameField: 'username',
//             passwordField: 'password'
//         },
//         function(username, password, callback) {
//             User.findOne({
//                 username: username.toLowerCase()
//             }, function(err, user) {
//                 console.log("user", err);
//                 if (err) return callback(err);

//                 // no user found with that username
//                 if (!user) {
//                     return callback(null, false, { message: 'The username is not registered.' });
//                 }
//                 // make sure the password is correct
//                 user.comparePassword(password, function(err, isMatch) {
//                     if (err) { return callback(err); }

//                     // password did not match
//                     if (!isMatch) {
//                         return callback(null, false, { message: 'The password is not correct.' });
//                     }

//                     // success
//                     return callback(null, user);
//                 });
//             });
//         }
//     ));
// }

// module.exports = localStrategy;