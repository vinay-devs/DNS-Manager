"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const user_middleware_1 = __importDefault(require("../middleware/user-middleware"));
const router = express_1.default.Router();
exports.userRouter = router;
// Signup route
router.post('/signup', user_controller_1.signup);
// Signin route
router.post('/signin', user_controller_1.signin);
// Add access key route
router.post('/credentials', user_middleware_1.default, user_controller_1.addCredentials);
