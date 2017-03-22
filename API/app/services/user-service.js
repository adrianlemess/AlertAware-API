import mongoose from "mongoose";
import User from "../models/user";

export const insertUser = (user) => {
    if (typeof user == User) {
        return user.save();
    } else {
        var user = new User(user);
        return user.save();
    }
}

export const getUserById = (userId) => {
    console.log(typeof userId);
    if (typeof userId === 'string') {
        return User.findById(userId);
    } else {
        throw new Error("userId inválido");
    }
}

export const getUsers = () => {
    return User.find({});
}