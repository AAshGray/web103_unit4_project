import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomCarById, updateCustomCar } from '../services/CarsAPI'
import { useCarOptions } from '../context/CarOptionsContext'
import DisplayCar from '../components/DisplayCar'
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
                submittedby: carData.submittedby
            })
            setCar(carData)
        }
        fetch()
    }, [id, options])

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
            submittedby: selections.submittedby
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

    const { models, colors, roofs, wheels, interiors } = options

    return (
        <div className="edit-car">
            <div className="edit-car__preview">
                <DisplayCar car={resolvedCar} detail={true} />
                <button className="edit-car__save" onClick={handleSave}>Save</button>
            </div>
            <div className="edit-car__panel">
                <Section title="Model">
                    {models.map(m => (
                        <Tile key={m.id} label={m.name} sub={`$${m.price.toLocaleString()}`} selected={selections.model?.id === m.id} onClick={() => setSelections(s => ({ ...s, model: m }))} />
                    ))}
                </Section>
                <Section title="Color">
                    {colors.filter(c => c.optiontype === 'paint').map(c => (
                        <Tile key={c.id} label={c.name} sub={`$${c.price.toLocaleString()}`} color={c.hex} selected={selections.color?.id === c.id} onClick={() => setSelections(s => ({ ...s, color: c }))} />
                    ))}
                </Section>
                <Section title="Roof">
                    {roofs.map(r => (
                        <Tile key={r.id} label={r.name} sub={`$${r.price.toLocaleString()}`} selected={selections.roof?.id === r.id} onClick={() => setSelections(s => ({ ...s, roof: r }))} />
                    ))}
                </Section>
                <Section title="Wheels">
                    {wheels.map(w => (
                        <Tile key={w.id} label={w.name} sub={`$${w.price.toLocaleString()}`} selected={selections.wheel?.id === w.id} onClick={() => setSelections(s => ({ ...s, wheel: w }))} />
                    ))}
                </Section>
                <Section title="Interior">
                    {interiors.map(i => (
                        <Tile key={i.id} label={i.name} sub={`$${i.price.toLocaleString()}`} selected={selections.interior?.id === i.id} onClick={() => setSelections(s => ({ ...s, interior: i }))} />
                    ))}
                </Section>
                <Section title="Details">
                    <textarea
                        className="edit-car__textarea"
                        value={selections.description}
                        onChange={e => setSelections(s => ({ ...s, description: e.target.value }))}
                        placeholder="Description"
                    />
                    <input
                        className="edit-car__input"
                        value={selections.submittedby}
                        onChange={e => setSelections(s => ({ ...s, submittedby: e.target.value }))}
                        placeholder="Submitted by"
                    />
                </Section>
            </div>
        </div>
    )
}

const Section = ({ title, children }) => (
    <div className="edit-car__section">
        <h3>{title}</h3>
        <div className="edit-car__tiles">
            {children}
        </div>
    </div>
)

const Tile = ({ label, sub, color, selected, onClick }) => (
    <div className={`edit-car__tile ${selected ? 'edit-car__tile--selected' : ''}`} onClick={onClick}>
        {color && <span className="edit-car__tile-swatch" style={{ backgroundColor: color }} />}
        <span>{label}</span>
        <span className="edit-car__tile-price">{sub}</span>
    </div>
)

export default EditCar