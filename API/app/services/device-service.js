//users.service.js
/**
 * 
 *Here is the file with all methods to create, retrieve, modify and delete user(s) entities from database 
 *
 */

import User from "../models/user";
import * as userService from './user-service';

export const getUserDevice = (userId) => {
    return User.findById({ id: userId })
        .then(user => user.device)
        .catch(err => err)
}

export const getUsersWithDevicesRegistred = () => {
    //limit(10).sort({ occupation: -1 }). -> scroll infinito
    User.find()
        .then(listUsers => filterUsersWithDevice(listUsers))
}

function filterUsersWithDevice(listUsers) {
    return listUsers.filter(user => {
        return user.device = !null || user.device != undefined;
    })
}
export const getDeviceByRegistrationId = (registrationId) => {
    return User.find({ device: { registrationId: registrationId } })
        .then(user => user.device)
}

export const registerDevice = (userId, userDevice) => {
    return User.update({ id: userId }, { device: userDevice });
}