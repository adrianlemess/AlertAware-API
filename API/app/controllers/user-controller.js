import * as userService from "../services/user-service";
import User from "../models/user";
import * as userUtils from "../utils/user-utils";

export const getUserById = (req, res, next) => {
    const userId = req.params.userId || '';
    if (userId == '') {
        return res.sendStatus(400);
    }
    userService.getUserById(userId)
        .then(user => user ? userUtils.removeSensitiveData(user) : res.status(204))
        .then(userResult => res.status(201).json(userResult))
        .catch(err => res.status(400).json(err))
}

export const getUsers = (req, res, next) => {
    userService.getUsers()
        .then(users => users ? userUtils.readAllListAndRemoveSensitiveData(users) : res.status(204))
        .then(userResult => res.status(201).json(userResult))
        .catch(err => res.status(401).send(err.message))
}