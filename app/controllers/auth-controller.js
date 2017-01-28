var mongoose = require("mongoose");
var passport = require("passport");

module.exports = function(application) {
    // Actions da controller
    const User = mongoose.model('User');
    const tokenService = application.app.services.tokenService;
    const userService = application.app.services.userService;

    const authenticationController = {

        signin: function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                var error = err || info;
                if (error) return res.status(401).send(error);
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;


                tokenService.createToken(user, function(res, err, token) {
                    if (err) {
                        logger.error(err);
                        return res.status(400).send(err);
                    }
                    res.status(201).json({ user: user, token: token });
                }.bind(null, res));
            })(req, res, next)
        },

        signout: function(req, res) {
            tokenService.expireToken(req.headers, function(err, success) {
                if (err) {
                    return res.status(401).send(err.message);
                }
                if (success) {
                    delete req.user;
                    res.sendStatus(200);
                } else {
                    res.sendStatus(401);
                }
            });
        },

        signup: function(req, res) {
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

                    tokenService.createToken(user, function(err, token) {
                        if (err) {
                            console.log(err.message);
                            return res.status(400).send(err);
                        }
                        res.status(201).json({ user: user, token: token });
                    });
                }
            });
        },

        isAuthenticated: function(req, res, next) {
            tokenService.verifyToken(req.headers, function(next, err, data) {
                if (err) {
                    console.log(err.message);
                    return res.status(401).send(err.message);
                }

                req.user = data;

                next();
            }.bind(null, next));
        }


    };
    return authenticationController;
};