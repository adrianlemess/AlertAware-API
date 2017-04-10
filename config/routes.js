import { Router } from "express";
import { signin, signup, signout, isAuthenticated } from "../app/controllers/auth-controller";
import { getUsers, getUserById } from '../app/controllers/user-controller';
import * as deviceController from '../app/controllers/devices-controller';

const router = new Router();

router.get('/', function(req, res) {
    res.json({ "message": "Alert Aware" });
});

router.get('/restricted', isAuthenticated, function(req, res) {
    res.json({ "message": "Authorized" });
});

//Authentication routes
router.post('/auth/signin', signin);
router.post('/auth/signup', signup);
router.post('/auth/signout', signout);

//Users routes
router.get('/users', isAuthenticated, getUsers);
router.get('/user/:userId', isAuthenticated, getUserById);
router.get('/users/devices', isAuthenticated, deviceController.getUsersWithDevicesRegistred)

//Devices router
router.get('/device/user/:userId', isAuthenticated, deviceController.getUserDevice);
router.get('/device/:registrationId', isAuthenticated, deviceController.getDeviceByRegistrationId);
router.post('/device/:userId', deviceController.registerDevice);

export default router;