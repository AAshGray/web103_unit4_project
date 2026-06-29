import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomCarById, updateCustomCar } from '../services/CarsAPI'
import { useCarOptions } from '../context/CarOptionsContext'
import DisplayCar from '../components/DisplayCar'
import { ConfigPanel } from '../components/ConfigPanel'
import '../css/EditCar.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { options, loading } = useCarOptions()
    const [car, setCar] = React.useState(null)
    const [selections, setSelections] = React.useState(null)

    React.useEffect(() => {
        if (!options) return
        const fetch = async () => {
            const carData = await getCustomCarById(id)
            if (!carData) return
            const { models, colors, roofs, wheels, interiors } = options
            const model = models.find(m => m.id === carData.modelid)
            const color = colors.find(c => c.id === carData.colorid)
            const roof = roofs.find(r => r.id === carData.roofid)
            const wheel = wheels.find(w => w.id === carData.wheelid)
            const interior = interiors.find(i => i.id === carData.interiorid)
            setSelections({
                model,
                color,
                roof,
                wheel,
                interior,
                description: carData.description,
                submittedby: carData.submittedby,
                lastImage: model?.image
            })
            setCar(carData)
        }
        fetch()
    }, [id, options])

    // https://react.dev/reference/react/useMemo
    const resolvedCar = React.useMemo(() => {
        if (!car || !selections) return null
        const { model, color, roof, wheel, interior } = selections
        return {
            ...car,
            modelid: model?.id,
            colorid: color?.id,
            roofid: roof?.id,
            wheelid: wheel?.id,
            interiorid: interior?.id,
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
            interior_price: interior?.price,
            totalprice: (model?.price || 0) + (color?.price || 0) + (roof?.price || 0) + (wheel?.price || 0) + (interior?.price || 0),
            description: selections.description,
            submittedby: selections.submittedby,
            lastImage: selections.lastImage || selections.model?.image,
        }
    }, [car, selections])

    const handleSave = async () => {
        await updateCustomCar(car.id, {
            modelid: selections.model?.id,
            colorid: selections.color?.id,
            roofid: selections.roof?.id,
            wheelid: selections.wheel?.id,
            interiorid: selections.interior?.id,
            totalprice: resolvedCar.totalprice,
            description: selections.description,
            submittedby: selections.submittedby
        })
        navigate(`/customcars/${car.id}`)
    }

    if (loading || !selections) return <p>Loading...</p>

    return (
        <div className="edit-car">
            <div className="edit-car__preview">
                <DisplayCar car={resolvedCar} detail={true} />
                <button className="edit-car__save" onClick={handleSave}>Save</button>
            </div>
            <ConfigPanel options={options} selections={selections} setSelections={setSelections} />
        </div>
    )
}

export default EditCar