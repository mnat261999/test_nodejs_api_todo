import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Task } from "../entity/Task"
import {authen} from '../middleware/authenMiddleware'
import jwt from "jsonwebtoken"

export const addTask = async (req: Request, res: Response): Promise<Response> =>{
    const {nameTask, desTask, dateCompletedTask,userIdAssingTask} = req.body
    if(!nameTask || !desTask || !dateCompletedTask || !userIdAssingTask){
        return res.status(400).json({msg: "Please fill in all fields."})
    }
    const newTask = getRepository(Task).create({
        nameTask, desTask, dateCompletedTask,userIdAssingTask,userIdCreateTask:req.user.id
    })

    await getRepository(Task).save(newTask)
    return res.json({msg: "Add task success!"})
}
