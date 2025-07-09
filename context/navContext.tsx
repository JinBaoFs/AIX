// context/NavContext.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// 定义 context 类型
type NavContextType = {
  isNavOpen: boolean
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleNav: () => void
}

// 创建默认值（初始 context）
const NavContext = createContext<NavContextType | undefined>(undefined)

type NavProviderProps = {
  children: ReactNode
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(prev => !prev)
  }

  return (
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  )
}

// 自定义 Hook，方便调用
export const useNav = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error('useNav must be used within a NavProvider')
  }
  return context
}
