import React from 'react'
import { useParams } from 'react-router-dom'
import { getCustomCarById } from '../services/CarsAPI'

const DisplayCar = ({ car }) => {
    if (!car ) return <p>Car not found.</p>

    const [totalPrice, setTotalPrice] = React.useState(car.totalprice || null);

    if (totalPrice === null || totalPrice === 0 ) {
        setTotalPrice(car.model_price + car.color_price + car.roof_price + car.wheel_price + car.interior_price);
    }

    return (
        <div className="display-car">
            <canvas ref={canvasRef} style={{ width: '100%' }} />
            <h2>{car.model_name}</h2>
            <p><strong>Color:</strong> {car.color_name}</p>
            <p><strong>Roof:</strong> {car.roof_name}</p>
            <p><strong>Wheels:</strong> {car.wheel_name}</p>
            <p><strong>Interior:</strong> {car.interior_name}</p>
            <p><strong>Total Price:</strong> ${totalPrice?.toLocaleString()}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Submitted by:</strong> {car.submittedby}</p>
            <p><strong>Submitted on:</strong> {new Date(car.submittedon).toLocaleDateString()}</p>
        </div>
    )
}

export default DisplayCar