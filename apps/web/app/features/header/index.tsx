'use client'
import React from 'react'
import { useAuth } from '../../shared/providers/AuthContext'
import { Form } from '@fernando_neirot2/ui'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const auth = useAuth()

  return (
    <div className="bg-gray-900 w-full text-white min-h-16 flex items-center justify-center">
      <div className="max-w-[1240px] w-full p-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-white inline-block ml-2">
                NEGOCIA
              </div>
              <div className="text-sm font-bold text-white inline-block ml-2">
                Compra-venta Inteligente
              </div>
            </div>
          </div>
        </Link>
        {
          auth.user ? (
            <div className='flex items-center gap-2'>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-blue-50 transition-colors font-medium"
              >
                Hola, <span className="font-semibold text-gray-50">{auth.user.displayName}</span>
              </Link>
              <Form.Button
                onClick={auth.logout}
                label=''
                backgroundColor='TRANSPARENT'
                textColor='#fff'
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