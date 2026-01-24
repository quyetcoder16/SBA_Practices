import React, { useState } from 'react'
import InstructorList from '../components/InstructorList'

const AdminDashBoard = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <>
    <div className='container my-2'>
      <button className='btn btn-secondary' onClick={()=>{setIsShow(!isShow)}}>Show</button>
    </div>
      
      {isShow &&  <InstructorList /> }
      
      
    </>

   
  )
}

export default AdminDashBoard