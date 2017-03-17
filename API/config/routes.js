import { Router } from "express";
import { signin, signup, signout, isAuthenticated } from "../app/controllers/auth-controller";
const router = new Router();

router.get('/', function(req, res) {
    res.json({ "message": "Alert Aware" });
});

router.get('/restricted', isAuthenticated, function(req, res) {
    res.json({ "message": "Authorized" });
});

// //Authentication routes
router.post('/auth/signin', signin);
router.post('/auth/signup', signup);
router.post('/auth/signout', signout);



export default router;