import mongoose from "mongoose";
import User from "../models/user";

export function insertUser(user) {
    if (typeof user == User) {
        return user.save();
    } else {
        var user = new User(user);
        return user.save();
    }

}