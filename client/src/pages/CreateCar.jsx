import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createCustomCar } from '../services/CarsAPI'
import { useCarOptions } from '../context/CarOptionsContext'
import DisplayCar from '../components/DisplayCar'
import { ConfigPanel } from '../components/ConfigPanel'
import '../css/EditCar.css'
import { resolveCarSelections, validateSelections } from '../utilities/resolveCarSelections.js'


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
        return resolveCarSelections(selections)
    }, [selections])

    const handleSave = async () => {
            const errors = validateSelections(selections, options)
            if (errors.length > 0) {
                alert(errors.join('\n'))
                return
            }
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
                <button 
                    className="edit-car__save" 
                    disabled={validateSelections(selections, options).length > 0} 
                    onClick={handleSave}
                >Save</button>
            </div>
            <ConfigPanel options={options} selections={selections} setSelections={setSelections} />
        </div>
    )
}

export default CreateCar