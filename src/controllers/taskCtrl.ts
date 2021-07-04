import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Task } from "../entity/Task"
import {authen} from '../middleware/authenMiddleware'
import jwt from "jsonwebtoken"
import {getConnection} from "typeorm";

export const addTask = async (req: Request, res: Response): Promise<Response> =>{
    const {nameTask, desTask, dateCompletedTask,statusTask,userIdAssingTask} = req.body
    if(!nameTask || !desTask || !dateCompletedTask || !statusTask || !userIdAssingTask){
        return res.status(400).json({msg: "Please fill in all fields."})
    }

    if(userIdAssingTask == req.user.id)
    {
        return res.status(400).json({msg: "Do not add yourself to the task"})
    }
    const newTask = getRepository(Task).create({
        nameTask, desTask, dateCompletedTask,statusTask,userIdAssingTask,userIdCreateTask:req.user.id
    })

    await getRepository(Task).save(newTask)
    return res.json({msg: "Add task success!"})
}

export const updateTask = async (req: Request, res: Response): Promise<Response> =>{
    const id = req.params.id
    const task = await getRepository(Task).findOne(id)

    if(!task) return res.json({msg: "Task does not exist"})

    if(task?.userIdCreateTask == req.user.id)
    {
        if(task?.statusTask != "complete")
        {
            const {nameTask, desTask, dateCompletedTask,statusTask} = req.body
            await getConnection()
                .createQueryBuilder()
                .update(Task)
                .set({ nameTask, desTask, dateCompletedTask,statusTask})
                .where("idTask= :id", {id})
                .execute();
            return res.json({msg: "Update success!"})
        } 
        return res.json({msg: "Task completed. Can't edit"})
    }
    return res.json({msg: "You do not have permission to edit. You can only edit tasks created by you"})
}

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    const task = await getRepository(Task).findOne(id)
    if(!task) return res.json({msg: "Task does not exist"})
    
    await getRepository(Task).delete(req.params.id)
    return res.json({msg: "Delete success!"})
}