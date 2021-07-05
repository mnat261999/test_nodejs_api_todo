import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Task } from "../entity/Task"
import {authen} from '../middleware/authenMiddleware'
import jwt from "jsonwebtoken"
import {getConnection} from "typeorm";

/*Câu 3*/
export const addTask = async (req: Request, res: Response): Promise<Response> =>{
    const {nameTask, desTask, dateCompletedTask,statusTask} = req.body
    if(!nameTask || !desTask || !dateCompletedTask || !statusTask){
        return res.status(400).json({msg: "Please fill in all fields."})
    }

    const newTask = getRepository(Task).create({
        nameTask, desTask, dateCompletedTask,statusTask,userIdCreateTask:req.user.id
    })

    await getRepository(Task).save(newTask)
    return res.json({msg: "Add task success!"})
}

/**********************************************************/


/*Câu 4*/
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
                .where("idTask = :id", {id})
                .execute();
            return res.json({msg: "Update success!"})
        } 
        return res.json({msg: "Task completed. Can't edit"})
    }
    return res.json({msg: "You do not have permission to edit. You can only edit tasks created by you"})
}

/**********************************************************/

/*Câu 5*/
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const idTask = req.params.id
    const task = await getRepository(Task).findOne(idTask)
    if(!task) return res.json({msg: "Task does not exist"})

    await getRepository(Task).delete(req.params.id)
    return res.json({msg: "Delete success!"})
}
/**********************************************************/

/*Câu 6*/
export const getAllTask = async (req: Request, res: Response): Promise<Response> =>{
    const taskList = await getRepository(Task).find({
        relations: ['userIdAssingTask']
    })
    return res.json({taskList})
}
/**********************************************************/

/*Câu 7*/
export const getTaskById = async (req: Request, res: Response): Promise<Response> =>{
    const id = req.params.id
    const taskById = await getRepository(Task).findOne({
        where: {idTask:id},
        relations: ['userIdAssingTask']
    })
    if(!taskById) return res.json({msg: "Task does not exist"})
    return res.json({taskById})
}
/**********************************************************/

/*Câu 9*/
export const assignUser = async (req: Request, res: Response): Promise<Response> => {
    
    const id = req.params.id
    const task = await getRepository(Task).findOne(id)
    if(!task) return res.json({msg: "Task does not exist"})

    if(task?.userIdCreateTask != req.user.id) return res.json({msg: "You do not have permission to specify the person to perform the task. You can only specify the person to perform the task created by you"})
    const {userIdAssingTask} = req.body
    if(userIdAssingTask == req.user.id) return res.status(400).json({msg: "Do not add yourself to the task"})

    await getConnection()
                .createQueryBuilder()
                .update(Task)
                .set({userIdAssingTask})
                .where("idTask= :id", {id})
                .execute();
    const taskById = await getRepository(Task).findOne({
                    where: {idTask:id},
                    relations: ['userIdAssingTask']
                })
    return res.json({
                msg: "Assign success!",
                taskAfterAssignment:taskById
            })

    /* if(task?.userIdCreateTask == req.user.id)
    {
        const {userIdAssingTask} = req.body
        if(userIdAssingTask != req.user.id)
        {
            await getConnection()
                .createQueryBuilder()
                .update(Task)
                .set({userIdAssingTask})
                .where("idTask= :id", {id})
                .execute();
            return res.json({
                msg: "Assign success!",
                taskAfterAssignment:task
            })
        }
        return res.status(400).json({msg: "Do not add yourself to the task"})
    }
    return res.json({msg: "You do not have permission to specify the person to perform the task. You can only specify the person to perform the task created by you"}) */
}
/**********************************************************/