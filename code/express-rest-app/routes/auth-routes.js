import {Router} from 'express'
import { registerUser, validateUser } from '../repository/mongodb-connect.js';

export const authRouter = Router();


authRouter.post("/register", async (req, resp) => {

    try {
        const user = req.body;
        if(!user.name || !user.loginId || !user.password || !user.role){
            resp.status(400).send();
        }
        else{
            const result = await registerUser(user);
            resp.json(result);
        }
    } catch (error) {
        console.log("Error creating user", error);
        resp.status(500).send();
    }

})

authRouter.post("/validateUser", async (req, resp) => {

    try {
        const user = req.body;
        if(!user.loginId || !user.password ){
            resp.status(400).send();
        }
        else{
            const result = await validateUser(user.loginId, user.password);
            console.log("result", result)
            if(result !== null){
                resp.status(200).send(result);
            }
            else{
                resp.status(401).send();
            }
            
        }
    } catch (error) {
        console.log("Error validating user", error);
        resp.status(500).send();
    }

})