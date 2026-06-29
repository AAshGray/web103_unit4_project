import React from 'react'
import DisplayCar from '../components/DisplayCar'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomCarById, deleteCustomCar } from '../services/CarsAPI'
import { useCarOptions } from '../context/CarOptionsContext'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = React.useState(null)
    const { options, loading } = useCarOptions()

    React.useEffect(() => {
        if (!options) return
        const fetchCarDetails = async () => {
            try {
                const carData = await getCustomCarById(id)
                if (carData) {
                    const { models, colors, roofs, wheels, interiors } = options
                    const model = models.find(m => m.id === carData.modelid)
                    const color = colors.find(c => c.id === carData.colorid)
                    const roof = roofs.find(r => r.id === carData.roofid)
                    const wheel = wheels.find(w => w.id === carData.wheelid)
                    const interior = interiors.find(i => i.id === carData.interiorid)
                    setCar({
                        ...carData,
                        model_name: model?.name,
                        color_name: color?.name,
                        color_hex: color?.hex,
                        roof_name: roof?.name,
                        wheel_name: wheel?.name,
                        interior_name: interior?.name,
                        model_price: model?.price,
                        color_price: color?.price,
                        roof_price: roof?.price,
                        wheel_price: wheel?.price,
                        interior_price: interior?.price
                    })
                }
            } catch (error) {
                console.error('Error fetching car details:', error)
            }
        }
        fetchCarDetails()
    }, [id, options])

    const handleDelete = async () => {
        await deleteCustomCar(car.id)
        navigate('/customcars')
    }

    return (
        <div className="car-details">
            <h1>Car Details</h1>
            {loading ? <p>Loading...</p> : <DisplayCar car={car} detail={true} onDelete={handleDelete} />}
        </div>
    )
}

export default CarDetails