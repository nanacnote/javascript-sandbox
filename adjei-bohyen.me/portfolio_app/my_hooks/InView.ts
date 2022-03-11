import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

// helper function to do the logic of comparing the innerHeight of the window to the top of the parsed element
const helper = (param: HTMLDivElement) => {
  const intViewportHeight = window.innerHeight
  const elementTopPosition = param?.getBoundingClientRect().top
  if (elementTopPosition < intViewportHeight) {
    return true
  } else {
    return false
  }
}

/**
 *React hook which listens for when an element parsed as parameter enters the viewport
 * @param div
 * @returns boolean
 */
// Hook to determine what referenced object is in view
export function useInView(div: React.MutableRefObject<HTMLDivElement>) {
  //set the initial state of the div element
  const [inView, setinView] = useState<boolean>(false)

  // eventlistner call back function to set state
  const scrollHandler = () => {
    setinView(helper(div.current))
  }

  // lodash debounce function to optimise performance
  const debounced = debounce(scrollHandler, 500)

  useEffect(() => {
    window.addEventListener('scroll', debounced)

    return () => {
      window.removeEventListener('scroll', debounced)
    }
  }, [])

  return inView
}
