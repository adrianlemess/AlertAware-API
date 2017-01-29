import mongoose from "mongoose";
import User from "../models/user";

export function insertUser(user, callback) {
    user.save(callback);
}