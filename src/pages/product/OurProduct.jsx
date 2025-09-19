import React from 'react'
import ProductCom from '../../components/ProductComponent/ProductCom'
import Navbar from '../../components/Navbar/Navbar'

function OurProduct() {
  return (
    <div>
        <div className='nav_section'>
       <Navbar navStyle={"white"} />
        </div>
        <div className='w-full bg-white pt-20 md:pt-24 lg:pt-20'>
        <ProductCom/>   
        </div>
     
    </div>
  )
}

export default OurProduct