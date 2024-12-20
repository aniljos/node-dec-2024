import jwt from 'jsonwebtoken';
//middleware
export function verifyJwtToken(req, resp, next){

    try {
        
        //read the token from the request header
        // header name: authorization
        // header value: Bearer [token]
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){

            //no authorization header
            resp.status(401).send();
        }
        else{
            
            const token = authorizationHeader.split(" ")[1];

            // verify the token
            jwt.verify(token, "tHisIsasEcretkEy", (err) => {

                if(err){
                     // if verification is fails => return a 403(forbidden) error
                     resp.status(403).send();
                }
                else{
                    // if verification is successful => invoke route handler
                    next();
                }

            })
        }
    } catch (error) {
        resp.status(500).send();
    }

}