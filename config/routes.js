import { Router } from 'express'
const router = new Router()


// const router = app.Router();
// const authenticationController = app.app.controllers.authenticationController;

router.get('/', function (req, res) {
    res.json({ "message": "Alert Aware" });
});

// router.get('/restricted', authenticationController.isAuthenticated, function(req, res) {
//     res.json({ "message": "Authorized" });
// });

// //Authentication routes
// router.post('/auth/signin', authenticationController.signin);
// router.post('/auth/signup', authenticationController.signup);
// router.post('/auth/signout', authenticationController.signout);
export default router;

