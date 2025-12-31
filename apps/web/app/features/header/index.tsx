'use client'
import React from 'react'
import { useAuth } from '../../shared/providers/AuthContext'
import { Wrapper } from '@fernando_neirot2/ui'
const { useRouter } = require('next/navigation')

const Header = () => {
  const auth = useAuth()
  const router = useRouter()
  return (
    <div className='w-full'>
      <div style={{height: '60px'}} />
      <div className='fixed w-full top-0 left-0 z-50'>
        <Wrapper.Header
          title="NEGOCIA"
          subTitle="Compra-venta Inteligente"
          logoUrl="/logo.webp"
          welcomeLabel={auth.user ? `Hola, ${auth.user.displayName}` : 'Iniciar sesión'}
          onWelcomeClick={auth.user ? () => router.push('/dashboard') : auth.loginWithGoogle}
          onClickLogin={auth.user ? auth.logout : auth.loginWithGoogle}
          isAuthenticated={!!auth.user}
          onClickLogo={() => router.push('/')}
          maxWidth="1240px"
        />
      </div>
    </div>
  )
}

export default Header