import React from 'react'
import Hero from '@/components/home-page/Hero'
import MissionSection from '@/components/home-page/MissionSection'
import SupportSection from '@/components/home-page/SupportSection'
import TheFreeForCharityTeam from '@/components/home-page/TheFreeForCharityTeam'

const index = () => {
  return (
    <div>
      <Hero />
      <MissionSection />
      <SupportSection />
      <TheFreeForCharityTeam />
    </div>
  )
}

export default index
