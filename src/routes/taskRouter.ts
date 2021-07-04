import { Router } from 'express'
const router = Router()
import {addTask} from '../controllers/taskCtrl'
import {updateTask} from '../controllers/taskCtrl'
import {deleteTask} from '../controllers/taskCtrl'
import {getAllTask} from '../controllers/taskCtrl'
import {getTaskById} from '../controllers/taskCtrl'
import {assignUser} from '../controllers/taskCtrl'
import {authen} from '../middleware/authenMiddleware'
router.post('/add',authen,addTask)
router.put('/update/:id', authen, updateTask)
router.delete('/delete/:id', authen, deleteTask)
router.get('/getall', authen, getAllTask)
router.get('/gettaskid/:id', authen, getTaskById)
router.put('/assign/:id', authen, assignUser)

export default router