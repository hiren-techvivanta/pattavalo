import React from 'react'
import HomeBanner from '../components/Home_Components/HomeBanner'
import Gatherings from '../components/Home_Components/Gatherings'
import CustomConveyor from '../components/Home_Components/CustomConveyor'
import ModulerSolution from '../components/Home_Components/ModulerSolution'
import ProductShowCase from '../components/Home_Components/ProductShowCase'

export default function Home() {
  return (
    <div>
     <HomeBanner/>
     <Gatherings/>
     <ModulerSolution/>
     <CustomConveyor/>
     <ProductShowCase/>   
    </div>
  )
}
