import React from 'react'
import HomeBanner from '../components/Home_Components/HomeBanner'
import Gatherings from '../components/Home_Components/Gatherings'
import CustomConveyor from '../components/Home_Components/CustomConveyor'
import ModulerSolution from '../components/Home_Components/ModulerSolution'
import Navbar from '../components/Navbar/Navbar'
import ShowCase from '../components/Home_Components/ShowCase'

export default function Home() {
  return (
    <div>
     <Navbar />
     <HomeBanner/>
     <Gatherings/>
     <ModulerSolution/>
     <CustomConveyor/>
     <ShowCase/>   
    </div>
  )
}
