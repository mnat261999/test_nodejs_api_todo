import {register} from '../controllers/userCtrl'
import {activateEmail} from '../controllers/userCtrl'
import {login} from '../controllers/userCtrl'
import {logout} from '../controllers/userCtrl'
import {getAccessToken} from '../controllers/userCtrl'
import {getAllUser} from '../controllers/userCtrl'
import { Router } from 'express'
import {authen} from '../middleware/authenMiddleware'
const router = Router()

router.post('/register', register)
router.post('/activation', activateEmail)
router.post('/login', login)
router.get('/logout',logout)
router.get('/refresh_token', getAccessToken)
router.get('/getall',authen, getAllUser)

export default router