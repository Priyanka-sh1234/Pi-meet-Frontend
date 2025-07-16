import React from 'react'
import  Infocard  from '../Infocard'
import Batches from '../Batches'
import { Button } from 'antd'

const TrainerDashboard = () => {
  return (
     <>
    
    <div className='flex flex-wrap justify-between'>
  <div className=" -mt-20 pl-12 flex items-start  justify-start">
      <Infocard />
      
    </div>
  


    <Batches/>
         
    </div>
   

    </>
    
  )
}

export default TrainerDashboard
