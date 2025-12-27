import React from 'react'
import Dashboard from './page.client'

const page = () => {
  return (
    <div className='max-w-[1240px] mx-auto pt-10'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p className='mt-2'>Bienvenido a tu panel de control</p>
      <Dashboard />
    </div>
  )
}

export default page