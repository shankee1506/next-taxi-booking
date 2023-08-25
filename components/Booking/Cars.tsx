import CarsList from '@/data/CarsList'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>()
  const {directionData, setDirectionData} 
    = useContext(DirectionDataContext);
  
  const getCost=(charges:any)=>{
    return (charges*directionData.routes[0].distance*0.000621371192)
    .toFixed(2)
  }
  return (
      <div className='mt-2'>
          <h2 className='font-medium text-[14px] '>Select Car</h2>
          <div className='grid grid-cols-3 
        md:grid-cols-2
        lg:grid-cols-3'>
              {CarsList.map((item, index) => (
                  <div key={index} className={`m-2
                  p-2 border-[1px] rounded-md 
                  hover:border-orange-400-400 
                  cursor-pointer 
                  ${index==selectedCar
                     ?'border-orange-400 border-[2px]'
                     :null}`} onClick={()=>setSelectedCar(index)}>
                      <Image alt={ item.image}  src={item.image} width={75}
                    height={90}
                          className='w-full' />
                  <h2 className='text-[10px] text-gray-500'>{item.name}
                    {directionData.routes ? <span className='float-right font-medium
                     text-black'>{ getCost(item.charges)}$</span>: null}
</h2>
                  </div>
              ))}
              
          </div>
    </div>
  )
}

export default Cars