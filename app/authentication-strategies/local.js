import passport from 'passport';
import Promise from 'bluebird';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from "mongoose";

// function asyncFunc() {
//     return new Promise(
//         function (resolve, reject) {
//             ···
//             resolve(result);
//             ···
//             reject(error);
//         });
// }
// You call asyncFunc() as follows:

// asyncFunc()
// .then(result => { ··· })
// .catch(error => { ··· });
// 25.1.1 Chaining then() calls

// then() always returns a Promise, which enables you to chain method calls:

// asyncFunc1()
// .then(result1 => {
//     // Use result1
//     return asyncFunction2(); // (A)
// })
// .then(result2 => { // (B)
//     // Use result2
// })
// .catch(error => {
//     // Handle errors of asyncFunc1() and asyncFunc2()
// });

function localStrategy(User, config) {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        getValidUser(username, passord)
        .then(doSomething2)
        .then(doSomething3)
        .catch(handlerError)))
};

function getValidUser(username, password) {
    //substituir por getUser;
    return new Promise((resolve, ject) => {
        var result = User.findOne({ username: username.toLowerCase() })

    }) return new Promise((resolve) => {
        User.findOne({
            username: username.toLowerCase()
        }, resolve);
    })


}

function validateUsername(err, user) {
    console.log("user", err);
    if (err) return console.log(err);

    // no user found with that username
    if (!user) {
        return console.log(null, false, { message: 'The username is not registered.' });
    }
    // make sure the password is correct
    user.comparePassword(password, doSomething3(err, isMatch));
}

function doSomething3(err, isMatch) {
    if (err) { return console.log(err); }

    // password did not match
    if (!isMatch) {
        return console.log(null, false, { message: 'The password is not correct.' });
    }

    // success
    return console.log(null, user);
};

export default localStrategy