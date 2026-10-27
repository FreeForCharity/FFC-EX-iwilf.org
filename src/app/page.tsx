import React from 'react'
import HomePage from '@/app/home-page'
import SiteHeader from '@/components/site-header'

const page = () => {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HomePage />
      </main>
    </>
  )
}

export default page
