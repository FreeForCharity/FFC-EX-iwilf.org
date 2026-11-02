import React from 'react'

interface ComingSoonProps {
  children?: React.ReactNode
}

// Placeholder for a section whose content Ali hasn't provided yet.
const ComingSoon = ({ children = 'Coming soon.' }: ComingSoonProps) => {
  return (
    <p className="rounded border border-dashed border-iwilf-bronze bg-white/60 px-4 py-3 font-iwilf-sans text-base text-iwilf-charcoal">
      {children}
    </p>
  )
}

export default ComingSoon
