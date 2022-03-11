import React from 'react'

type ContextProps = {
  landingStatus: boolean
  siderState: boolean
  currentViewport: boolean
  setLandingStatus: (params: boolean) => void
  setSiderState: (params: boolean) => void
}
const MyContext = React.createContext<Partial<ContextProps>>({})

export default MyContext
