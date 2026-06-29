import React from 'react'
import { getCustomCars, getColors, getInteriors, getModels, getRoofs, getWheels } from '../services/CarsAPI.jsx'
import DisplayCard from '../components/DisplayCard'

const ViewCars = () => {
    const [carDetails, setCarDetails] = React.useState([])
    const [loading, setLoading] = React.useState(true)

React.useEffect(() => {
    const fetchCars = async () => {
        try {
            const [carsData, models, colors, roofs, wheels, interiors] = await Promise.all([
                getCustomCars(),
                getModels(),
                getColors(),
                getRoofs(),
                getWheels(),
                getInteriors()
            ]);

            const resolved = carsData.map((car) => ({
                ...car,
                model_name: models.find(m => m.id === car.modelid)?.name,
                color_name: colors.find(c => c.id === car.colorid)?.name,
                color_hex: colors.find(c => c.id === car.colorid)?.hex,
                roof_name: roofs.find(r => r.id === car.roofid)?.name,
                wheel_name: wheels.find(w => w.id === car.wheelid)?.name,
                interior_name: interiors.find(i => i.id === car.interiorid)?.name,
            }));

            setCarDetails(resolved);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchCars();
}, []);

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