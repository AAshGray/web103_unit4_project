import React from 'react'
import { getCustomCars } from '../services/CarsAPI.jsx'
import { useCarOptions } from '../context/CarOptionsContext'
import DisplayCard from '../components/DisplayCard'

const ViewCars = () => {
    const [carDetails, setCarDetails] = React.useState([])
    const { options, loading } = useCarOptions()

    React.useEffect(() => {
        if (!options) return
        const fetchCars = async () => {
            try {
                const carsData = await getCustomCars()
                const { models, colors, roofs, wheels, interiors } = options
                const resolved = carsData.map((car) => ({
                    ...car,
                    model_name: models.find(m => m.id === car.modelid)?.name,
                    color_name: colors.find(c => c.id === car.colorid)?.name,
                    color_hex: colors.find(c => c.id === car.colorid)?.hex,
                    roof_name: roofs.find(r => r.id === car.roofid)?.name,
                    wheel_name: wheels.find(w => w.id === car.wheelid)?.name,
                    interior_name: interiors.find(i => i.id === car.interiorid)?.name,
                }))
                setCarDetails(resolved)
            } catch (error) {
                console.error('Error fetching cars:', error)
            }
        }
        fetchCars()
    }, [options])

    return (
        <div className="view-cars">
            {loading ? (
                <p>Loading cars...</p>
            ) : (
                <ul>
                    {carDetails.map((car) => (
                        <DisplayCard key={car.id} car={car} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ViewCars