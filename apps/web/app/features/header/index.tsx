'use client'
import React from 'react'
import { useAuth } from '../../shared/providers/AuthContext'
import { Form } from '@fernando_neirot2/ui'
import Link from 'next/link'

const Header = () => {
  const auth =useAuth()

  return (
    <div className="bg-blue-200 w-full min-h-16 flex items-center justify-center">
      <div className="max-w-[1240px] w-full p-4 flex items-center justify-between">
        <div>LOGO</div>
        {
          auth.user ? (
            <div className='flex items-center gap-2'>
              
              <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Hola, <span className="font-semibold text-gray-900">{auth.user.displayName}</span>
            </Link>
              <Form.Button
                onClick={auth.logout}
                label=''
                backgroundColor='TRANSPARENT'
                textColor='#000'
                icon="logout"
              />
            </div>
          ) : (
           <div className='flex items-center gap-4'>
              Iniciar sesión
              <Form.Button
                onClick={auth.loginWithGoogle}
                label=''
                backgroundColor='TRANSPARENT'
                textColor='#000'
                icon="login"
              />
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Header