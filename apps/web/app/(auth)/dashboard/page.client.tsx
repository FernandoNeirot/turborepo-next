'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { Form } from '@fernando_neirot2/ui'

const Dashboard = () => {
  const router = useRouter();
  const goToAddProduct = () => {
    router.push('/dashboard/producto');
  }
  return (
    <div className='mt-4'>
        <p className='text-lg flex items-center'>Total de productos agregados: {" "}
          <span className='ml-2 mr-6 font-semibold'>15</span>
          <Form.Button 
            onClick={goToAddProduct} 
            label='Agregar nuevo producto'
            textColor='#4450ffff'
          />
        </p>
      </div>
  )
}

export default Dashboard