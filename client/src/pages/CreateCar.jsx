import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createCustomCar } from '../services/CarsAPI'
import { useCarOptions } from '../context/CarOptionsContext'
import DisplayCar from '../components/DisplayCar'
import { ConfigPanel } from '../components/ConfigPanel'
import '../css/EditCar.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const { options, loading } = useCarOptions()
    const [selections, setSelections] = React.useState({
        model: null,
        color: null,
        roof: null,
        wheel: null,
        interior: null,
        description: '',
        submittedby: ''
    })

    const resolvedCar = React.useMemo(() => {
        if (!selections.model) return null
        const { model, color, roof, wheel, interior } = selections
        return {
            model_name: model?.name,
            color_name: color?.name,
            color_hex: color?.hex,
            roof_name: roof?.name,
            wheel_name: wheel?.name,
            interior_name: interior?.name,
            totalprice: (model?.price || 0) + (color?.price || 0) + (roof?.price || 0) + (wheel?.price || 0) + (interior?.price || 0),
            description: selections.description,
            submittedby: selections.submittedby,
            lastImage: selections.lastImage || selections.model?.image,
        }
    }, [selections])

    const handleSave = async () => {
        await createCustomCar({
            modelid: selections.model?.id,
            colorid: selections.color?.id,
            roofid: selections.roof?.id,
            wheelid: selections.wheel?.id,
            interiorid: selections.interior?.id,
            totalprice: resolvedCar?.totalprice,
            description: selections.description,
            submittedby: selections.submittedby
        })
        navigate('/customcars')
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="edit-car">
            <div className="edit-car__preview">
                {resolvedCar ? <DisplayCar car={resolvedCar} detail={true} preview={true} /> : <p>Select a model to preview.</p>}
                <button className="edit-car__save" disabled={!resolvedCar} onClick={handleSave}>Save</button>
            </div>
            <ConfigPanel options={options} selections={selections} setSelections={setSelections} />
        </div>
    )
}

export default CreateCar