import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 max-w-[1240px] mx-auto pt-5">
      {children}
    </div>
  )
}