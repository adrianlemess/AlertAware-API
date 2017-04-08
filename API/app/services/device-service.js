//users.service.js
/**
 * 
 *Here is the file with all methods to create, retrieve, modify and delete user(s) entities from database 
 *
 */

import User from "../models/user";
import * as userService from './user-service';

export const getUserDevice = (userId) => {
    console.log(userId);
    return User.findById(userId);
}

export const getUsersWithDevicesRegistred = () => {
    //limit(10).sort({ occupation: -1 }). -> scroll infinito
    return User.find()
                .then(listUsers => filterUsersWithDevice(listUsers))
}

function filterUsersWithDevice(listUsers) {
    return listUsers.filter(user => {
        return user.device.deviceId;
    })
}
export const getDeviceByRegistrationId = (registrationId) => {
        return User.find({ device: { registrationId: registrationId } })
}

    //maybe a save method instead update
export const registerDevice = (userId, userDevice) => {
    return User.update({ _id: userId }, { $set: { device: userDevice } });
}