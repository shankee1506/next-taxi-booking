import React from 'react'
import Map, { AttributionControl, GeolocateControl , Layer, Marker, NavigationControl,
    Popup, Source
} from "react-map-gl";
import type {FeatureCollection} from 'geojson';

const MapBoxRoute = (props: any) => {
    
    // const geojson: FeatureCollection = {
    //     type: 'FeatureCollection',
    //     features: [
    //       {type: 'Feature', geometry: {type: 'Point', coordinates:props.coordinates}}
    //     ]
    // };
    
  return (
      <div>
                 <Source type="geojson" data={{ type: 'Feature', geometry: 
{ type: 'LineString', coordinates: props.coordinates },properties: {}, }}>
        <Layer
          type="line"
          layout={{ 'line-join': 'round', 'line-cap': 'square' }}
          paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
        />
      </Source>
    </div>
  )
}

export default MapBoxRoute