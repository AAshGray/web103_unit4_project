import React from 'react'
import { getModels, getColors, getRoofs, getWheels, getInteriors } from '../services/CarsAPI.jsx'

const CarOptionsContext = React.createContext(null)

export const CarOptionsProvider = ({ children }) => {
    const [options, setOptions] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [models, colors, roofs, wheels, interiors] = await Promise.all([
                    getModels(),
                    getColors(),
                    getRoofs(),
                    getWheels(),
                    getInteriors()
                ])
                setOptions({ models, colors, roofs, wheels, interiors })
            } catch (error) {
                console.error('Error fetching car options:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOptions()
    }, [])

    return (
        <CarOptionsContext.Provider value={{ options, loading }}>
            {children}
        </CarOptionsContext.Provider>
    )
}

export const useCarOptions = () => React.useContext(CarOptionsContext)