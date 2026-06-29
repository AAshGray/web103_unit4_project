import express from 'express'
import * as carController from '../controllers/index.js'

const router = express.Router()

router.get('/customCars', carController.getCustomCars)
router.get('/customCars/:id', carController.getCustomCarById)
router.post('/customCars', carController.createCustomCar)
router.put('/customCars/:id', carController.updateCustomCar)
router.delete('/customCars/:id', carController.deleteCustomCar)


router.get('/models', carController.getModels)
router.get('/models/:id', carController.getModelById)

router.get('/colors', carController.getColors)
router.get('/colors/:id', carController.getColorById)

router.get('/interiors', carController.getInteriors)
router.get('/interiors/:id', carController.getInteriorById)

router.get('/roofs', carController.getRoofs)
router.get('/roofs/:id', carController.getRoofById)

router.get('/wheels', carController.getWheels)
router.get('/wheels/:id', carController.getWheelById)

export default router