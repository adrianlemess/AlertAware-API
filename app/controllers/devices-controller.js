/** devices.controller.js
 * This file have all methods to handler external requests about devices
 */
//Dependencies
import * as deviceService from '../services/device-service';

export const getUserDevice = (req, res) => {
    const userId = req.params.userId || "";
    if (!userId) res.status(400).json("Parâmetro inválido");
    else {
        deviceService.getUserDevice(userId)
            .then(user => res.status(200).json(user.device))
            .catch(err => res.status(401).json(err))
    }
}

export const getUsersWithDevicesRegistred = (req, res) => {
    deviceService.getUsersWithDevicesRegistred()
        .then(userList => res.status(200).json(userList))
        .catch(err => res.status(401).json(err))
}

export const getDeviceByRegistrationId = (req, res) => {
    const registrationId = req.params.registrationId || "";
    deviceService.getDeviceByRegistrationId(registrationId)
        .then(user => res.status(200).json(user.device))
        .catch(err => res.status(401).json(err))
}

//To be implemented
// export const deleteDeviceUser = (req, res) => {
// }

export const registerDevice = (req, res) => {
    const userDevice = {
        deviceId: req.body.deviceId || null,
        registrationId: req.body.registrationId || null,
        celNumber: req.body.celNumber || null
    }
    const userId = req.params.userId || null;

    if (userDevice.deviceId && userDevice.registrationId && userId) {
        deviceService.registerDevice(userId, userDevice)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(401).json(err))
    }

}