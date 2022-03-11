import { useState } from 'react'
import { useBreakPoint } from '../my_hooks'
import { MyContext } from '.'

export default function MyProvider(props: any) {

  //instantiate useBreakPoint hook
  const [currentViewport] = useBreakPoint()

  // all useState hooks
  const [landingStatus, setlandingStatus] = useState(true)
  const [siderState, setsiderState] = useState(false)

  return (
    <MyContext.Provider
      value={{
        landingStatus: landingStatus,
        siderState: siderState,
        currentViewport: currentViewport as boolean,
        setLandingStatus: (params) => setlandingStatus(params),
        setSiderState: (params) => setsiderState(params),
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}
