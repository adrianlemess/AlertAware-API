import passport from "passport";
import config from "./config";
import mongoose from "mongoose";
import User from "../app/models/user";
import localStrategy from "../app/authentication-strategies/local";

function initializeAuthenticationConfig(app) {
    // Initialize strategies
    localStrategy(User, config);
    // Add passport's middleware
    app.use(passport.initialize());
};

export default initializeAuthenticationConfig;