import React from 'react';
import DisplayCar from '../components/DisplayCar';
import { useParams } from 'react-router-dom';
import { getCustomCarById, getModelById, getColorById, getRoofById, getWheelById, getInteriorById } from '../services/CarsAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = React.useState(null);

    React.useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const carData = await getCustomCarById(id);
                if (carData) {
                    const [model, color, roof, wheel, interior] = await Promise.all([
                        getModelById(carData.model_id),
                        getColorById(carData.color_id),
                        getRoofById(carData.roof_id),
                        getWheelById(carData.wheel_id),
                        getInteriorById(carData.interior_id)
                    ]);
                    setCar({
                        ...carData,
                        model_name: model.name,
                        color_name: color.name,
                        roof_name: roof.name,
                        wheel_name: wheel.name,
                        interior_name: interior.name,
                        model_price: model.baseprice,
                        color_price: color.price,
                        roof_price: roof.price,
                        wheel_price: wheel.price,
                        interior_price: interior.price
                    });
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };
        fetchCarDetails();
    }, [id]);

    return (
        <div className="car-details">
            <h1>Car Details</h1>
            <DisplayCar car={car} />
        </div>
    );
}

export default CarDetails;