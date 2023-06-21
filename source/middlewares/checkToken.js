import jwt  from "jsonwebtoken";

export function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({message: 'Acesso negado!'})
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret, (err, payload) => {
            if(err) {
                res.status(403).json({message: "Token inválido!"})
            }
            req.payload = payload;
        })
        next();
    } catch(error) {
        res.status(403).json({message: "Token inválido!"})
    }
}