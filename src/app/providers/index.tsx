import React from 'react'

import { PrerendererProvider } from '@app/components/Prerenderer'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <PrerendererProvider>{children}</PrerendererProvider>
}
