import { DestinationCordinateContext } from '@/context/DestinationCordinateContext'
import { SourceCordinateContext } from '@/context/SourceCordinateContext'
import { UserLocationContext } from '@/context/UserLocationContext'
import { Marker } from 'react-map-gl'
import React, { useContext } from 'react'

const Markers = () => {
    const { userLocation, setUserLocation } = useContext(UserLocationContext)
    const {sourceCordinates,setSourceCordinates}=useContext(SourceCordinateContext);
    const {destinationCordinates,setDestinationCordinates}
    =useContext(DestinationCordinateContext);

  return (
      <div className=''>

          {sourceCordinates?.length != 0 ? <Marker 
                longitude={sourceCordinates?.lng} 
                latitude={sourceCordinates?.lat} 
                anchor="bottom" >
                
                 
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                
                 
          </Marker> : null}
          

          {destinationCordinates?.length != 0 ? <Marker 
                longitude={destinationCordinates?.lng} 
                latitude={destinationCordinates?.lat} 
                anchor="bottom" >
                
                 
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                
                 
          </Marker> : null}


      </div>
  )
}

export default Markers