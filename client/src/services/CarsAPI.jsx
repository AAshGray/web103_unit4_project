const api = '/api'

//customCars
export const getCustomCars = async () => { 
    try {
        const response = await fetch(`${api}/customCars`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching custom cars:', error)
    }
}

export const getCustomCarById = async (id) => {
    try {
        const response = await fetch(`${api}/customCars/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching custom car by id ${id}:`, error)
    }
}

export const createCustomCar = async (carData) => {
    try {
        const response = await fetch(`${api}/customCars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating custom car:', error)
    }
}

export const updateCustomCar = async (id, carData) => {
    try {
        const response = await fetch(`${api}/customCars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error updating custom car with id ${id}:`, error)
    }
}

export const deleteCustomCar = async (id) => {
    try {
        const response = await fetch(`${api}/customCars/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error deleting custom car with id ${id}:`, error)
    }
}

//colors
export const getColors = async () => {
    try {
        const response = await fetch(`${api}/colors`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching colors:', error)
    }
}

export const getColorById = async (id) => {
    try {
        const response = await fetch(`${api}/colors/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching color by id ${id}:`, error)
    }
}

// interiors
export const getInteriors = async () => {
    try {
        const response = await fetch(`${api}/interiors`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching interiors:', error)
    }
}

export const getInteriorById = async (id) => {
    try {
        const response = await fetch(`${api}/interiors/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching interior by id ${id}:`, error)
    }
}

// models
export const getModels = async () => {
    try {
        const response = await fetch(`${api}/models`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching models:', error)
    }
}

export const getModelById = async (id) => {
    try {
        const response = await fetch(`${api}/models/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching model by id ${id}:`, error)
    }
}

// roofs
export const getRoofs = async () => {
    try {
        const response = await fetch(`${api}/roofs`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching roofs:', error)
    }
}

export const getRoofById = async (id) => {
    try {
        const response = await fetch(`${api}/roofs/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching roof by id ${id}:`, error)
    }
}

// wheels
export const getWheels = async () => {
    try {
        const response = await fetch(`${api}/wheels`)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching wheels:', error)
    }
}

export const getWheelById = async (id) => {
    try {
        const response = await fetch(`${api}/wheels/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching wheel by id ${id}:`, error)
    }
}