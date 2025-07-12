import React from 'react'
import Batches from '../Batches'
import { Infocard } from '../Infocard'
import { Batchcard } from '../Batchcard'

const AdminDashboard = () => {
  return (
    <div>
       <div className='flex -mt-20 flex-wrap justify-between'>
  <div className="  pl-12 flex items-start  justify-start">
      <Infocard />
      
    </div>
    <div className=" w-3/5 ">
      <Batchcard />
    </div>
    </div>
    </div>
  )
}

export default AdminDashboard
