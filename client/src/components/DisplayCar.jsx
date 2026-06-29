import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/DisplayCard.css'

const DisplayCar = ({ car, detail = false, onDelete }) => {
    const canvasRef = React.useRef(null)
    const canvasW = detail ? 450 : 300
    const canvasH = detail ? 270 : 180
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!car || !canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = '/car_body.png'
        img.onload = () => {
            canvas.width = canvasW
            canvas.height = canvasH
            ctx.drawImage(img, 0, 0, canvasW, canvasH)
            ctx.globalCompositeOperation = 'multiply'
            ctx.fillStyle = car.color_hex
            ctx.fillRect(0, 0, canvasW, canvasH)
            ctx.globalCompositeOperation = 'source-over'
        }
    }, [car, canvasW, canvasH])

    if (!car) return <p>Car not found.</p>

    const totalPrice = car.totalprice || (car.model_price + car.color_price + car.roof_price + car.wheel_price + car.interior_price)

    return (
        <div className={`car-card ${detail ? 'car-card--detail' : ''}`}>
            <canvas ref={canvasRef} />
            <h2>{car.model_name}</h2>
            <p><strong>Color:</strong> {car.color_name}</p>
            <p><strong>Roof:</strong> {car.roof_name}</p>
            <p><strong>Wheels:</strong> {car.wheel_name}</p>
            <p><strong>Interior:</strong> {car.interior_name}</p>
            <p><strong>Total Price:</strong> ${totalPrice?.toLocaleString()}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Submitted by:</strong> {car.submittedby}</p>
            <p><strong>Submitted on:</strong> {new Date(car.submittedon).toLocaleDateString()}</p>
            {onDelete && (
                <div className="car-card-footer">
                    <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default DisplayCar