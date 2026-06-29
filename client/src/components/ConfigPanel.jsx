import React from 'react'
import '../css/ConfigPanel.css'

export const Section = ({ title, children }) => (
    <div className="config-panel__section">
        <h3>{title}</h3>
        <div className="config-panel__tiles">
            {children}
        </div>
    </div>
)

export const Tile = ({ label, sub, color, selected, onClick }) => (
    <div className={`config-panel__tile ${selected ? 'config-panel__tile--selected' : ''}`} onClick={onClick}>
        {color && <span className="config-panel__tile-swatch" style={{ backgroundColor: color }} />}
        <span>{label}</span>
        <span className="config-panel__tile-price">{sub}</span>
    </div>
)

export const ConfigPanel = ({ options, selections, setSelections }) => {
    const { models, colors, roofs, wheels, interiors } = options

    const handleSelect = (category, item) => {
        setSelections(s => ({
            ...s,
            [category]: item,
            lastImage: item.image
        }))
    }

    return (
        <div className="config-panel">
            <Section title="Model">
                {models.map(m => (
                    <Tile key={m.id} label={m.name} sub={`$${m.price.toLocaleString()}`} selected={selections.model?.id === m.id} onClick={() => handleSelect('model', m)} />
                ))}
            </Section>
            <Section title="Color">
                {colors.filter(c => c.optiontype === 'paint').map(c => (
                    <Tile key={c.id} label={c.name} sub={`$${c.price.toLocaleString()}`} color={c.hex} selected={selections.color?.id === c.id} onClick={() => setSelections(s => ({ ...s, color: c }))} />
                ))}
            </Section>
            <Section title="Roof">
                {roofs.map(r => (
                    <Tile key={r.id} label={r.name} sub={`$${r.price.toLocaleString()}`} selected={selections.roof?.id === r.id} onClick={() => handleSelect('roof', r)} />
                ))}
            </Section>
            <Section title="Wheels">
                {wheels.map(w => (
                    <Tile key={w.id} label={w.name} sub={`$${w.price.toLocaleString()}`} selected={selections.wheel?.id === w.id} onClick={() => handleSelect('wheel', w)} />
                ))}
            </Section>
            <Section title="Interior">
                {interiors.map(i => (
                    <Tile key={i.id} label={i.name} sub={`$${i.price.toLocaleString()}`} selected={selections.interior?.id === i.id} onClick={() => handleSelect('interior', i)} />
                ))}
            </Section>
            <Section title="Details">
                <textarea
                    className="config-panel__textarea"
                    value={selections.description}
                    onChange={e => setSelections(s => ({ ...s, description: e.target.value }))}
                    placeholder="Description"
                />
                <input
                    className="config-panel__input"
                    value={selections.submittedby}
                    onChange={e => setSelections(s => ({ ...s, submittedby: e.target.value }))}
                    placeholder="Submitted by"
                />
            </Section>
        </div>
    )
}