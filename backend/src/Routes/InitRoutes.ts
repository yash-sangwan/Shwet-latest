import express, { Router } from 'express';
import * as initController from '../Controllers/Init';

// Define an interface for the taskController
interface InitController {
    isVerified: express.RequestHandler;
    isRoleDefined: express.RequestHandler;
    isWalletAdded: express.RequestHandler;
    addWallet: express.RequestHandler;
    addRole: express.RequestHandler;
    getRole: express.RequestHandler;
    getMail: express.RequestHandler;
    verification: express.RequestHandler;
    checkUser: express.RequestHandler;
}

const initRouter: Router = express.Router();

/* Define user-related routes */
initRouter.get("/isverified", (initController as InitController).isVerified);
initRouter.get("/isrole", (initController as InitController).isRoleDefined);
initRouter.get("/iswallet", (initController as InitController).isWalletAdded);
initRouter.post("/addwallet", (initController as InitController).addWallet);
initRouter.post("/addrole", (initController as InitController).addRole);
initRouter.get("/getrole", (initController as InitController).getRole);
initRouter.get("/getmail", (initController as InitController).getMail);
initRouter.get("/send/verification-mail", (initController as InitController).verification);
initRouter.get("/checkuser", (initController as InitController).checkUser);

export default initRouter;
