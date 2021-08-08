import express from "express";
const Router = express.Router();

import { userLogin, userSignup } from "../controllers/userController.js";

Router.post("/login", userLogin);
Router.post("/signup", userSignup);

export default Router;
