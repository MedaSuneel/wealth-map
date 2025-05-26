import React from 'react'
import { useEffect, useState } from "react";
import {ComposableMap,Geographies,Geography,Marker} from "react-simple-maps";
import {db} from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// US TopoJSON (free dataset)
const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const PropertyDetails = ({ property, onBack }) => (
    <div className="p-6 text-black h-[100vh]  ">
      <button
        onClick={onBack}
        className='cursor-pointer mb-4 hover:scale-110'
      >
        <img src='LeftArrow.png' alt='Back' className='w-14 h-9 rounded-2xl  ' />
      </button>
      <h2 className="text-2xl text-white ml-9 font-bold mb-4">Property Details</h2>
      <div className='flex items-center justify-between'>
      <div className="space-y-2 space-x-4 ml-15 text-xl text-white">
        <p><strong>Property Name:</strong> {property.name}</p>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Size:</strong> {property.size}</p>
        <p><strong>Value:</strong> {property.currentValue}</p>
        <p><strong>Built Year:</strong> {property.builtYear}</p>
        <p><strong>State:</strong> {property.state}</p>
        <p><strong>City:</strong> {property.city}</p>
        <h3 className="text-2xl ml-[-1vw] font-bold mt-4 mb-4">Owner Info</h3>
        <p><strong>Owner Name:</strong> {property.owner?.name}</p>
        <p><strong>Contact:</strong> {property.owner?.contact}</p>
        <p><strong>Ownership Type:</strong> {property.owner?.ownershipType}</p>
      </div>
   
      <div>
        <img src='/US-property.jpg' alt='Property' className='w-[55vw] h-[55vh] mr-4 rounded-4xl' />
      </div>
      </div>
  </div>
);



function USMap() {

  const [locations, setLocations] = useState([]);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "Properties"));
      const props = querySnapshot.docs.map(doc => doc.data());
      setLocations(props);
    };
    fetchProperties();
  }, []);

  const handleMouseEnter = (event, property) => {
    const { clientX, clientY } = event;
    setHoveredProperty(property);
    setTooltipPos({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredProperty(null);
  };
    
  if (selectedProperty) {
    return <PropertyDetails property={selectedProperty} onBack={() => setSelectedProperty(null)} />;
  }

  return (
    <div className="w-[100%] h-[100vh]">
        
      <ComposableMap projection="geoAlbersUsa" className="w-full h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-blue-300 stroke-white"
              />
            ))
          }
        </Geographies>

        {locations.map((property) => (
          <Marker className='cursor-pointer' key={property.name} coordinates={[property.long, property.lat]}
            onMouseEnter={(e) => handleMouseEnter(e, {  
              name: property.name,
              size: property.size,
              currentValue: property.currentValue,
              city: property.city })}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedProperty(property)} >
            <circle r={6} fill="red" />
            <text textAnchor="middle" y={-10} className="text-md font-medium fill-black  ">{property.name}</text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {hoveredProperty && (
        <div
          className="absolute bg-white text-black border border-gray-400 rounded-md shadow-md px-3 py-2 text-sm z-50"
          style={{
            top: tooltipPos.y - 100,
            left: tooltipPos.x + 15,
            pointerEvents: "none",
          }}
        >
          <p><strong>{hoveredProperty.name}</strong></p>
          <p>Size: {hoveredProperty.size}</p>
          <p>Value: {hoveredProperty.currentValue}</p>
          <p>City: {hoveredProperty.city}</p>
        </div>
      )}

    </div>
  )
}

export default USMap
