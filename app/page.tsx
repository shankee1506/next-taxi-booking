"use client"

import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCordinateContext } from "@/context/DestinationCordinateContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCordinateContext } from "@/context/SourceCordinateContext";
import { UserLocationContext }  from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {

  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directionData,setDirectionData]=useState<any>([]);

  useEffect(() => {
    getUserLocation()
  }, [])
  
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    }) 
  }
  return (
    <div>

      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordinateContext.Provider value={{sourceCordinates,setSourceCordinates}}>
          <DestinationCordinateContext.Provider value={{ destinationCordinates, setDestinationCordinates }}>
          <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
      <div className="grid grid-cols-1 md:grid-cols-3">

        <div>
<Booking />
        </div>

        <div className="col-span-2">
<MapBoxMap />
        </div>
        </div>
      
        </DirectionDataContext.Provider>
          </DestinationCordinateContext.Provider>
          </SourceCordinateContext.Provider>
      </UserLocationContext.Provider>
</div>

  )
}
