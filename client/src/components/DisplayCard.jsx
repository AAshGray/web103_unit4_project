import React from 'react'
import '../css/DisplayCard.css'
import { useNavigate } from 'react-router-dom'

const DisplayCard = ({ car }) => {
    const navigate = useNavigate()
    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = '/car_body.png'
        img.onload = () => {
            canvas.width = 300
            canvas.height = 180
            ctx.drawImage(img, 0, 0, 300, 180)
            ctx.globalCompositeOperation = 'multiply'
            ctx.fillStyle = car.color_hex
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.globalCompositeOperation = 'source-over'
        }
    }, [car.color_hex])

    return (
        <li className="car-card">
            <canvas ref={canvasRef} style={{ width: '100%' }} />
            <h3>{car.model_name}</h3>
            <p><strong>Color:</strong> {car.color_name}</p>
            <p><strong>Roof:</strong> {car.roof_name}</p>
            <p><strong>Wheels:</strong> {car.wheel_name}</p>
            <p><strong>Interior:</strong> {car.interior_name}</p>
            <p><strong>Total Price:</strong> ${car.totalprice.toLocaleString()}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <p><strong>Submitted by:</strong> {car.submittedby}</p>
            <p><strong>Submitted on:</strong> {new Date(car.submittedon).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/customcars/${car.id}`, { state: { car } })}>View Details</button>
        </li>
    )
}

export default DisplayCard