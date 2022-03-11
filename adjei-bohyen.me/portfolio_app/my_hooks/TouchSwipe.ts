import { useState, useEffect } from 'react'

/**
 * Hook for listening for touch swipe input
 * @param HTMLElement element to listen for touch input on
 * @returns string
 */
export function useTouchSwipe(
  params: HTMLElement
): 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' {
  //state value of direction
  const [direction, setdirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    undefined
  )

  // variable for holding initial touch coordinates
  let touchMem: Array<number> = []

  //Event listner to handle touch start
  const touchStart = (event: TouchEvent) => {
    // event.stopPropagation()
    event.preventDefault()
    touchMem = [event.touches[0].clientX, event.touches[0].clientY]
  }

  //Event listner to handle touch end
  const touchEnd = (event: TouchEvent) => {
    // event.stopPropagation()
    event.preventDefault()
    const x = event.changedTouches[0].clientX - touchMem[0]
    const y = event.changedTouches[0].clientY - touchMem[1]
    if (Math.abs(x) > Math.abs(y)) {
      // swipe action is along the x plane
      if (x > 0) {
        setdirection('RIGHT')
      } else {
        setdirection('LEFT')
      }
    } else {
      // swipe action is along the y plan
      if (y < 0) {
        setdirection('UP')
      } else if (y === 0) {
        // console.log('Tap')
        null
      } else {
        setdirection('DOWN')
      }
    }
  }

  useEffect(() => {
    params?.addEventListener('touchstart', touchStart, false)
    params?.addEventListener('touchend', touchEnd, false)
  })

  useEffect(() => {
    return () => {
      params?.removeEventListener('touchstart', touchStart, false)
      params?.removeEventListener('touchend', touchEnd, false)
    }
  }, [])

  return direction
}
