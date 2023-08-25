import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from 'react'
import { Map,Marker } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordinateContext } from "@/context/SourceCordinateContext";
import { DestinationCordinateContext } from "@/context/DestinationCordinateContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "../Booking/DistanceTime";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

const MapBoxMap = () => {

  const mapRef = useRef<any>();
  
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const { sourceCordinates, setSourceCordinates } = useContext(SourceCordinateContext);
  const {destinationCordinates,setDestinationCordinates}
    = useContext(DestinationCordinateContext);
  
    const {directionData, setDirectionData} = useContext(DirectionDataContext);


  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      })
    }
  }, [sourceCordinates])
  

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      })
    }
    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates])
  
  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
      sourceCordinates.lng +
        "," +
        sourceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    setDirectionData(result);
  };

  return (
      <div className='p-5'>
          <h2 className="text-[20px] font-semibold">Map</h2>
          <div className="rounded-lg overflow-hidden">
        {userLocation ? <Map
          ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: userLocation?.lng ,
        latitude:  userLocation?.lat,
        zoom: 14
      }}
      style={{width: '100%', height: 600, borderRadius:10}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
        >    <Markers />
                      {directionData?.routes && directionData.routes[0]?.geometry?.coordinates? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
</Map>:null} 
          </div>
          <div className="absolute bottom-[40px]
      z-20 right-[20px]">
     <DistanceTime />
     </div>
          
    </div>
  )
}

export default MapBoxMap