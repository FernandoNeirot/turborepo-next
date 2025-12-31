import React from 'react'
import { Button } from '../../form/button';
import Tooltip from '../tooltip';
export interface HeaderProps {
  logoUrl?: string;
  title?: string;
  subTitle?: string;
  welcomeLabel?: string;
  onClickLogo?: () => void;
  onWelcomeClick: () => void;
  onClickLogin: () => void;
  isAuthenticated?: boolean;
  maxWidth?: string;
}

const Header = ({ isAuthenticated, logoUrl, title, subTitle, welcomeLabel, onWelcomeClick, onClickLogin, onClickLogo, maxWidth = "100%" }: HeaderProps) => {
  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className={`relative w-full text-black min-h-[60px] flex items-center px-4 shadow-md justify-between`}>
      <div style={{maxWidth}} className='w-full flex justify-between mx-auto items-center'>
        <div
          className="flex items-center"
          onClick={onClickLogo}
          onKeyDown={onClickLogo}
          style={{ cursor: onClickLogo ? 'pointer' : 'default' }}
          role='button'
          tabIndex={0}
        >
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className="h-10 w-10 mr-2" />
          )}
          <div className="">
            <h1 className="text-lg font-bold text-black">{title}</h1>
            <p className="text-sm text-black">{subTitle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Tooltip position='top' message={isAuthenticated ? 'Ver mi dashboard' : ''}>
          <Button icon={isAuthenticated ? 'user' : 'none'} onClick={onWelcomeClick} label={welcomeLabel} textColor='#000' backgroundColor="TRANSPARENT" />
          </Tooltip>
          <Tooltip position='top' message={isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}>
          <Button onClick={onClickLogin} icon={isAuthenticated ? 'logout' : 'login'} textColor='#000' backgroundColor='TRANSPARENT_02' />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Header