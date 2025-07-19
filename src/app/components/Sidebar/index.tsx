import React from 'react'
import { Sidebar } from '@app/components/ui/sidebar'
import { RecommendationsBlock } from '@app/blocks/SidebarLayouts/RecommendationsBlock'

export const AppSidebar = () => {
  return (
    <Sidebar side="right">
      <div className="pl-5 pr-5  h-ful pt-20 flex flex-col gap-4">
        <RecommendationsBlock />
        <RecommendationsBlock />
        <RecommendationsBlock />
      </div>
    </Sidebar>
  )
}
