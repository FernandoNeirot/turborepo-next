import React from 'react'
import { getServerUser } from '../../shared/lib/auth'
import HeaderClient from './HeaderClient'

const Header = async () => {
  const serverUser = await getServerUser()
  return <HeaderClient serverUser={serverUser} />
}

export default Header
