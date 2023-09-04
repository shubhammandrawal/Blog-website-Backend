const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).json({
            message: "token is not authorized"
        })
    } 

    if(req.headers.authorization && req.headers.authorization.startsWith("bearer")){
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET_CODE, (err, data)=>{
            if(err){
                return res.status(403).json({
                    message: "wrong token"
                })
            } 

            else{
                req.user = data
                next()
            }
        })
    }
}

module.exports = verifyToken;