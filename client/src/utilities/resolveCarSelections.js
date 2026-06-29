import { calcTotalPrice } from './calculatePrice.js'

export const validateSelections = (selections, options) => {
    const { model, color, roof, wheel, interior } = selections
    const { models, colors, roofs, wheels, interiors } = options

    const errors = []

    if (!model || !models.find(m => m.id === model.id)) errors.push('Invalid model selection')
    if (!color || !colors.find(c => c.id === color.id)) errors.push('Invalid color selection')
    if (!roof || !roofs.find(r => r.id === roof.id)) errors.push('Invalid roof selection')
    if (!wheel || !wheels.find(w => w.id === wheel.id)) errors.push('Invalid wheel selection')
    if (!interior || !interiors.find(i => i.id === interior.id)) errors.push('Invalid interior selection')
    if (!selections.description) errors.push('Description is required')
    if (!selections.submittedby) errors.push('Submitted by is required')

    if (model && color && model.availablecolorids && !model.availablecolorids.includes(color.id)) {
        errors.push('Selected color is not available for this model')
    }

    return errors
}

export const resolveCarSelections = (selections, car = {}) => {
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
        totalprice: calcTotalPrice(model?.price, color?.price, roof?.price, wheel?.price, interior?.price),
        description: selections.description,
        submittedby: selections.submittedby,
        lastImage: selections.lastImage || model?.image,
    }
}