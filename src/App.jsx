import React, { useState } from 'react'
import GTAIntroduction from './components/GTAIntroduction'
import Showcase from './components/Showcase'
import { Routes, Route } from 'react-router-dom'
import Certifications from './components/Certifications'






function App() {




  return (
   <>

   <Routes>
      <Route path="/" element={<GTAIntroduction/>} />
       <Route path="/projects" element={<Showcase/>} />
        <Route path="/certificates" element={<Certifications/>} />
    </Routes>
   
   </>
  )
}

export default App