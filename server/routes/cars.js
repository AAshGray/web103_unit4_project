import express from 'express'
import * as carController from '../controllers/index.js'

const router = express.Router()

router.get('/customCar', carController.getCustomCars)
router.get('/customCar/:id', carController.getCustomCarById)
router.post('/customCar', carController.createCustomCar)
router.put('/customCar/:id', carController.updateCustomCar)
router.delete('/customCar/:id', carController.deleteCustomCar)

router.get('/model', carController.getModels)
router.get('/model/:id', carController.getModelById)

router.get('/color', carController.getColors)
router.get('/color/:id', carController.getColorById)

router.get('/interiors', carController.getInteriors)
router.get('/interiors/:id', carController.getInteriorById)

router.get('/roof', carController.getRoofs)
router.get('/roof/:id', carController.getRoofById)

router.get('/wheels', carController.getWheels)
router.get('/wheels/:id', carController.getWheelById)

export default router