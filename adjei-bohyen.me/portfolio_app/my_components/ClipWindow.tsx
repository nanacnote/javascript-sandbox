import Link from 'next/link'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export const ClipWindow = (): JSX.Element => {
  //ref for the window div that plays the gsap animation
  let clipWindowRef: HTMLElement

  const numRangeArray = (arg: number) => {
    const tmp: Array<number> = []
    for (let i = 1; i < arg; i++) {
      tmp.push(i)
    }
    return tmp
  }

  const techStackArray = [
    'webpack',
    'tensor flow',
    'redux',
    'next js',
    'jest js',
    'lodash',
    'heroku',
    'graphql',
    'express js',
    'docker',
    'browserify',
    'babel',
    'mongodb',
    'boostrap',
    'git',
    'mysql',
    'material UI',
    'gulp',
    'java',
    'semantic UI',
    'typescript',
    'npm',
    'bash',
    'linux',
    'adobe xd',
    'node js',
    'vscode',
    'python',
    'jquery',
    'javascript',
    'html5',
    'css3',
    'r lang',
    'dart',
  ]

  useEffect(() => {
    const tl = gsap.timeline()
    // clipWindowRef.onmouseenter = function() {
    //     tl.pause();
    // }
    // clipWindowRef.onmouseleave = function() {
    //     tl.play();
    // }
    tl.to('.pen-tip', { opacity: 1, duration: 0.5 })
    tl.to('.pen-tip', { opacity: 0, duration: 0.5 })
    tl.to('.pen-tip', { opacity: 1, duration: 0.5 })
    tl.to('.pen-tip', { opacity: 0, y: 100, duration: 0.5 })
    tl.to('.pen-tip', { opacity: 1, x: -125, duration: 0.5 })
    // left-bottom draw line up
    tl.to('.pen-tip', {
      width: '10px',
      height: '10px',
      rotation: 360,
      duration: 0.5,
    })
    tl.to('.pen-tip', { rotation: 360, duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', rotation: -360, duration: 0.05 },
      '-=0.05'
    )
    tl.to('.pen-tip', { height: '400px', duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', y: -100, duration: 0.05 },
      '-=0.025'
    )
    // top-left draw line to right
    tl.to('.pen-tip', {
      width: '10px',
      height: '10px',
      rotation: 360,
      duration: 0.5,
    })
    tl.to('.pen-tip', { rotation: 360, duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', rotation: -360, duration: 0.05 },
      '-=0.05'
    )
    tl.to('.pen-tip', { width: '500px', duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', x: 125, duration: 0.05 },
      '-=0.025'
    )
    // top-right draw line down
    tl.to('.pen-tip', {
      width: '10px',
      height: '10px',
      rotation: 360,
      duration: 0.5,
    })
    tl.to('.pen-tip', { rotation: 360, duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', rotation: -360, duration: 0.05 },
      '-=0.05'
    )
    tl.to('.pen-tip', { height: '400px', duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', y: 100, duration: 0.05 },
      '-=0.025'
    )
    // bottom-righ draw line to left
    tl.to('.pen-tip', {
      width: '10px',
      height: '10px',
      rotation: 360,
      duration: 0.5,
    })
    tl.to('.pen-tip', { rotation: 360, duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', rotation: -360, duration: 0.05 },
      '-=0.05'
    )
    tl.to('.pen-tip', { width: '500px', duration: 0.05 })
    tl.to(
      '.pen-tip',
      { width: '5px', height: '5px', x: -125, duration: 0.05 },
      '-=0.025'
    )
    // final spin step
    tl.to('.pen-tip', {
      width: '10px',
      height: '10px',
      rotation: 360,
      duration: 0.05,
    })
    tl.to('.pen-tip', { rotation: 360, duration: 0.05 })
    tl.to(
      '.pen-tip',
      {
        width: '5px',
        height: '5px',
        rotation: -360,
        opacity: 0,
        duration: 0.05,
      },
      '-=0.05'
    )
    // draw white window background
    tl.to(clipWindowRef, { width: '0px', height: '0px', duration: 0 })
    tl.to(clipWindowRef, { backgroundColor: 'white', duration: 0 })
    tl.to(clipWindowRef, {
      width: '250px',
      height: '200px',
      ease: 'bounce.out',
      duration: 1,
    })
    // svg animation container div prep section
    tl.to('.clip-window-svg', { display: 'flex', duration: 0.5 })
    // text on top of svg
    tl.to('.clip-window-text', { display: 'block', opacity: 1, duration: 1 })
    tl.to(
      '.clip-window-text',
      { y: 30, ease: 'elastic.in(1,0.30)', duration: 2.5 },
      '-=1'
    )
    // bring in enter website clickable link
    tl.to('.enter-site', { opacity: 1, duration: 0.5 })
    tl.to('.enter-site', { y: 5, duration: 1 }, '-=0.5')
    // svg animation
    numRangeArray(34).map((e) =>
      tl
        .to(
          `.svg-logo-${e}`,
          { display: 'block', transform: 'translateX(500px)', duration: 1 },
          '-=0.5'
        )
        .to(
          `.svg-logo-${e}`,
          { x: 90, opacity: 1, ease: 'bounce.out', duration: 1 },
          '-=0.1'
        )
        .to(`.svg-logo-${e}`, { rotation: 360, duration: 1 })
        .to(`.svg-logo-${e}`, {
          x: -200,
          opacity: 0,
          display: 'none',
          duration: 0.5,
        })
    )
    tl.to('.clip-window-text', { opacity: 0, duration: 0.5 })
    tl.to(clipWindowRef, {
      width: '0px',
      height: '0px',
      ease: 'bounce.out',
      duration: 1,
    })

    return () => {
      tl.pause()
    }
  }, [])

  return (
    <div className="clip-window-container">
      <div className="clip-window" ref={(div) => (clipWindowRef = div)}>
        <div className="pen-tip" />

        <div className="clip-window-text">
          <span style={{ color: '#ff4d4f' }}>&#10084;</span>
          <br />
          <span style={{ color: '#bfbfbf' }}>tech i like</span>
        </div>

        <div className="clip-window-svg">
          {numRangeArray(35).map((e) => (
            <img
              key={e}
              className={`svg-logo-${e} svg-logo`}
              src={`/svg/${e}.svg`}
              alt={techStackArray[e - 1]}
            />
          ))}
        </div>
      </div>
      <div className="enter-site">
        <Link href="/main">
          <a href="#">Enter</a>
        </Link>
      </div>
    </div>
  )
}

export default ClipWindow
