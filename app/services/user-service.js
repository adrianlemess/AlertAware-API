import mongoose from "mongoose";
import User from "../models/user";
import userRoles from "../models/user-roles";

export const insertUser = (user) => {
    user = setUserRole(user);
    if (typeof user == User) {
        return user.save();
    } else {
        var user = new User(user);
        return user.save();
    }
}

function setUserRole(user) {
    let roleName = user.role || '';
    userRoles.map(role => {
        if (role.id == user.role) {
            roleName = role.name;
        }
    })
    user.role = roleName;
    return user;
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