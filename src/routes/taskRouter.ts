import { Router } from 'express'
const router = Router()
import {addTask} from '../controllers/taskCtrl'
import {authen} from '../middleware/authenMiddleware'
router.post('/add',authen,addTask)

export default router