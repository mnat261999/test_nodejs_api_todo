import { Router } from 'express'
const router = Router()
import {addTask} from '../controllers/taskCtrl'
import {updateTask} from '../controllers/taskCtrl'
import {deleteTask} from '../controllers/taskCtrl'
import {authen} from '../middleware/authenMiddleware'
router.post('/add',authen,addTask)
router.put('/update/:id', authen, updateTask)
router.delete('/delete/:id', authen, deleteTask)

export default router