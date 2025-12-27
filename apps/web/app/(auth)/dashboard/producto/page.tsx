import React from 'react'
import DashboardProducto from './page.client'

const page = () => {
  return (
    <div className='max-w-[1240px] mx-auto pt-10'>
      <h1 className='text-3xl font-bold'>Agregar Producto</h1>      
      <DashboardProducto />
    </div>
  )
}

export default page