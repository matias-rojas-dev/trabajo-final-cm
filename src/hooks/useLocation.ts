import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

interface LocationState {
  location: LocationObject | null
  error: string | null
  region: string | null
}

const getLocationRegion = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude })
    return results.length > 0 ? results[0].region || null : null
  } catch (error) {
    console.error('Error al obtener la región:', error)
    return null
  }
}

export const useLocation = (): LocationState & {
  getLocationRegion: typeof getLocationRegion
} => {
  const [locationState, setLocationState] = useState<LocationState>({
    location: null,
    error: null,
    region: null,
  })

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setLocationState((prevState) => ({
            ...prevState,
            error: 'Permission to access location was denied',
          }))
          return
        }

        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocationState((prevState) => ({
          ...prevState,
          location: currentLocation,
        }))

        const region = await getLocationRegion(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        )
        setLocationState((prevState) => ({ ...prevState, region }))
      } catch (error) {
        setLocationState((prevState) => ({
          ...prevState,
          error: 'Error while fetching location',
        }))
      }
    }

    fetchLocation()
  }, [])

  return { ...locationState, getLocationRegion }
}

export default useLocation
