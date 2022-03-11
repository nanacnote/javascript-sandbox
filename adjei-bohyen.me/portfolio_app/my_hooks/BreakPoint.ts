// const viewport = useBreakPoint()
// this is a hook which listens to viewport changes and returns true for screens less than
// 768px and false for screens greater than 768px
// it also returns the value of the viewport in number and boostrap standards after every adjustment

import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
// const debounce = require('lodash/debounce')

// helperBoolean function to translate the size to boolean value
const helperBoolean = (arg: number | undefined) => {
  return arg
    ? () => {
        if (arg < 768) {
          return true
        } else {
          return false
        }
      }
    : undefined
}

// helper function to translate the size to string of xs sm md lg
const helperStandard = (arg: number) => {
  if (arg < 320) {
    return 'xs'
  } else if (arg >= 320 && arg < 720) {
    return 'sm'
  } else if (arg >= 720 && arg < 1024) {
    return 'md'
  } else if (arg >= 1024) {
    return 'lg'
  }
}

// Hook to monitor viewport size
export function useBreakPoint() {
  //constant update of viewport size
  const [viewPortSize, setviewPortSize] = useState<number>(0)

  //define viewport size as xs sm md lg
  const [viewPortSizeStandard, setviewPortSizeStandard] = useState<
    'xs' | 'sm' | 'md' | 'lg' | undefined
  >(undefined)

  //defined viewport size (as per small or large)
  const [breakPoint, setbreakPoint] = useState<true | false | undefined>(
    undefined
  )

  // event listner function
  const handleResize = () => {
    setbreakPoint(helperBoolean(window.innerWidth))
    setviewPortSizeStandard(helperStandard(window.innerWidth))
    setviewPortSize(window.innerWidth)
  }

  // lodash debounce function to optimise performance
  const debounced = debounce(handleResize, 500)

  useEffect(() => {
    // checks the caller is a browser as opposed to nodejs
    if (typeof window !== 'object') {
      return
    }

    // set state hooks
    setbreakPoint(helperBoolean(window.innerWidth))
    setviewPortSizeStandard(helperStandard(window.innerWidth))
    setviewPortSize(window.innerWidth)

    window.addEventListener('resize', debounced)

    return () => {
      window.removeEventListener('resize', debounced)
    }
  }, [])

  return [breakPoint, viewPortSizeStandard, viewPortSize]
}
