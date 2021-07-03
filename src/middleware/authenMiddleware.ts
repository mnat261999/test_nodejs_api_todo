import jwt from "jsonwebtoken"
import { Request, Response, NextFunction} from 'express'
import console from "console"

export const authen = async (req: Request, res: Response, next: NextFunction)=>{
    const token = req.header("Authorization")
    if(!token) return res.status(400).json({msg: "Invalid Authentication."})
    

        jwt.verify(token, 'h[áhfhsadjfhsjjdfhs3kbfhsdkfjhadfhsdkgfdxgfdgdfgdfgdfgfghfghfghfgewryiuwebcxz', (err:any, user:any) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})
            req.user = user
            next()
        })
}