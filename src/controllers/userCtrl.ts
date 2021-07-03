import { Request, Response } from "express"
import { getRepository } from "typeorm"
import {User} from "../entity/User"
import jwt from "jsonwebtoken"
import { get } from "http"
import bcrypt from "bcrypt"
import {sendEmail} from "./sendMailCtrl"


export const register = async (req: Request, res: Response): Promise<Response> =>{
    const {name, email, password} = req.body

    if(!name || !email || !password)
    return res.status(400).json({msg: "Please fill in all fields."})

    if(!validateEmail(email))
    return res.status(400).json({msg: "Invalid emails."})

    const user = await getRepository(User).findOne({email})
    if(user) return res.status(400).json({msg: "This email already exists."}) 

    if(!validatePass(password)) 
            return res.status(400).json({msg: "Password must be at least 8 characters, one letter and one number."})

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = {
        name, email, password: passwordHash
    }
    const activation_token = createActivationToken(newUser)
    const url = `http://localhost:3000/user/activate/${activation_token}`

            //console.log(url)
    sendEmail(email, url, "Verify your email address")
            //console.log({activation_token})
            
    return res.json({msg: "Register Success! Please activate your email to start."})
}

export const activateEmail = async (req: Request, res: Response): Promise<Response> =>{
    const {activation_token} = req.body
    console.log(activation_token)
    const user:any = jwt.verify(activation_token, <any>process.env.ACTIVATION_TOKEN_SECRET)
    console.log(user)

    const {name,email,password} = user
    console.log(name)
    const check = await getRepository(User).findOne({email})
    if(check) return res.status(400).json({msg: "This email already exists."})
    const newUser = getRepository(User).create({name,email,password})
    //console.log(newUser)
    await getRepository(User).save(newUser) 

   return res.json({msg: "Account has been activated!"})
}

export const login = async (req: Request, res: Response): Promise<Response> =>{
    const {email, password} = req.body
    const user:any = await getRepository(User).findOne({email})
    if(!user) return res.status(400).json({msg: "This email does not exist."})
    const checkMatchPass = await bcrypt.compare(password, user.password)
    if(!checkMatchPass) return res.status(400).json({msg: "Password is incorrect"})
    const refresh_token = createRefreshToken({id: user.idUser})
    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 //7 days
    })
    //console.log(refresh_token)
    //console.log(req.cookies)
    return res.json({msg: "Login success!"})
}

export const logout = async (req: Request, res: Response): Promise<Response> =>{
    res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
    return res.json({msg: "Logout success!"})
}

export const getAccessToken = async (req: Request, res: Response): Promise<Response> =>{
    let access_token;
    const rf_token = req.cookies.refreshtoken
    if(!rf_token) return res.status(400).json({msg: 'Please login now!'})
    jwt.verify(rf_token, <any>process.env.REFRESH_TOKEN_SECRET, (err:any, user:any) =>{
        if(err){ return res.status(400).json({msg: 'Please login now!'})}

        access_token = createAccessToken({id: user.id})
    })
    return res.json({access_token})
}

function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePass(pass: string) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}

const createActivationToken = (payload:object) => {
    console.log(payload)
    return jwt.sign(payload,<any>process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload:object) => {
    return jwt.sign(payload, <any>process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload:object) => {
    return jwt.sign(payload,   <any>process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}