'use client'
import { Form } from '@fernando_neirot2/ui'
import React, { useState } from 'react'

const DashboardProducto = () => {
  const [titulo, setTitulo] = useState('')
  console.log(titulo)
  return (
    <div className='mt-4'>
      <Form.Input 
        label='Nombre del Producto' 
        placeholder='Ingrese el nombre del producto'
        onChange={(e)=>setTitulo(e.target.value)}
        value={titulo}
      />
    </div>
  )
}

export default DashboardProducto