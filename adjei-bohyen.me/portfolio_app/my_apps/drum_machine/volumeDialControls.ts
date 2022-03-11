import { default as $ } from 'jquery'
import { Howler } from 'howler'

export default function volumeDialControls(param: any) {
  const knob = $('.knob')
  let angle = 50
  const minangle = 0
  const maxangle = 270

  // variable for holding initial touch coordinates
  let touchMem: Array<number> = []

  // set initial volume
  Howler.volume(0.19)

  const moveKnob = (direction: 'up' | 'down', rotation = 2) => {
    if (direction == 'up') {
      if (angle + rotation <= maxangle) {
        angle = angle + rotation
        setAngle()
      }
    } else if (direction == 'down') {
      if (angle - rotation >= minangle) {
        angle = angle - rotation
        setAngle()
      }
    }
  }

  const setAngle = () => {
    // rotate knob
    knob.css({
      '-moz-transform': 'rotate(' + angle + 'deg)',
      '-webkit-transform': 'rotate(' + angle + 'deg)',
      '-o-transform': 'rotate(' + angle + 'deg)',
      '-ms-transform': 'rotate(' + angle + 'deg)',
      transform: 'rotate(' + angle + 'deg)',
    })

    // highlight ticks
    const activeTicks = Math.round(angle / 10) + 1
    $('.tick').removeClass('activetick')
    $('.tick').slice(0, activeTicks).addClass('activetick')

    // update volume
    const level = Math.round((angle / 270) * 100)
    param.setState({ volumeLevel: level })
    Howler.volume(level / 100)
  }

  // mousewheel event - firefox
  knob.bind('DOMMouseScroll', function (e) {
    if ((e.originalEvent as any).detail > 0) {
      moveKnob('up')
    } else {
      moveKnob('down')
    }
    return false
  })

  // mousewheel event - ie, safari, opera
  knob.bind('mousewheel', function (e) {
    if ((e.originalEvent as any).wheelDelta < 0) {
      moveKnob('up')
    } else {
      moveKnob('down')
    }
    return false
  })

  // touchstart event handler
  knob.bind('touchstart', function (e) {
    e.preventDefault()
    touchMem = [e.touches[0].clientX, e.touches[0].clientY]
  })

  // touchend event handler
  knob.bind('touchend', function (e) {
    e.preventDefault()
    const x = e.changedTouches[0].clientX - touchMem[0]
    const y = e.changedTouches[0].clientY - touchMem[1]
    if (Math.abs(x) > Math.abs(y)) {
      // swipe action is along the x plane
      if (x > 0) {
        moveKnob('up', 16)
      } else {
        moveKnob('down', 16)
      }
    } else {
      // swipe action is along the y plan
      if (y < 0) {
        moveKnob('up', 16)
      } else if (y === 0) {
        // console.log('Tap')
        null
      } else {
        moveKnob('down', 16)
      }
    }
  })
}
