import { Dispatch, SetStateAction } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

gsap.registerPlugin(TextPlugin)

/**
 * Contains timeline for main text animation
 * @param setshowBottomRight
 * @param value
 * @returns set the state passed as parameter to the second param value ie boolean in this case
 */
export const mainTextGSAP = (
  setshowBottomRight: Dispatch<SetStateAction<boolean>>,
  value: boolean
) => {
  tlMain = gsap
    .timeline()
    .to(
      '.main-text-row',
      {
        duration: 0.5,
        height: '25vmax',
        minHeight: '350px',
        width: '100%',
        paddingTop: '10px',
      },
      '+=2'
    )
    .set('.skip-text-animation', { visibility: 'visible' })
    .set('.main-languages-numbers', { display: 'flex' })
    .to('.main-languages-header , .main-numbers-header', {
      duration: 1,
      opacity: 1,
    })
    .from('.main-numbers-wrapper', { duration: 1.5, opacity: 0, y: 100 }, '-=1')
    .from(
      '.main-languages-wrapper',
      {
        duration: 1,
        opacity: 0,
        x: -500,
        stagger: 0.125,
        ease: 'elastic.out(1,0.30)',
      },
      '-=1'
    )
    .from(
      '.main-languages-header, .main-numbers-header',
      { duration: 1, y: -20 },
      '-=1'
    )
    .set('.main-text-1', { width: '100%', height: '100%' }, '-=1')
    //set rest of page display to block at this point
    .set('.t-01', {
      y: '-500%',
      display: 'inline',
      fontSize: '1rem',
      opacity: 0,
    })
    .call(setshowBottomRight, [value])
    .to('.t-01', {
      duration: 1,
      y: '0%',
      fontSize: '3rem',
      opacity: 1,
      ease: 'bounce.out',
    })
    .to('.t-01', {
      duration: 0.25,
      transform: 'rotate(15deg)',
      ease: 'elastic.out(1,0.30)',
    })
    .to('.t-01', {
      duration: 0.25,
      transform: 'rotate(-15deg)',
      ease: 'elastic.out(1,0.30)',
    })
    .set('.t-01', { display: 'none' })
    .set('.t-02', { display: 'inline', fontSize: '3rem', y: '0%' })
    .set('.t-02', { display: 'none' }, '+=0.5')
    .to('.t-01', { display: 'inline' })
    .to(
      '.t-01',
      {
        duration: 1,
        transform: 'rotate(-90deg)',
        x: '-500%',
        opacity: 0,
        ease: 'expo.out',
      },
      '-=0.25'
    )
    .set('.t-01', { display: 'none' })
    .addLabel('replayTextAnimation')
    .set('.main-text-1', {
      width: '0%',
      height: '0%',
      borderBottom: 'solid 0.5vmax',
    })
    .to('.main-text-1', { duration: 0.5, width: '10%', opacity: 0.5 })
    .to('.main-text-1', {
      duration: 0.25,
      transform: 'rotate(-90deg)',
      opacity: 0.75,
    })
    .to('.main-text-1', {
      duration: 0.5,
      width: '15%',
      borderBottom: 'solid 0.5vmax',
      opacity: 1,
    })
    .set('.t-03', { display: 'inline' })
    .fromTo(
      '.t-03',
      { x: '-150%', opacity: 0 },
      {
        duration: 0.5,
        x: '0%',
        opacity: 1,
        text: {
          value: "<span style='font-size: 4vmax;'>Hello</span>",
          delimiter: ' ',
        },
        ease: 'bounce.out',
      }
    )
    .to('.main-text-1, .main-text-2, .main-text-3', { x: '-20%' }, '-=0.5')
    .fromTo(
      '.t-03',
      { x: '-150%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        text: {
          value:
            "<span style='font-size: 2vmax'>&nbsp&nbsp i am</span></br> <span style='font-size: 4vmax; color: #40a9ff' >Owusu</span>",
        },
        ease: 'none',
      },
      '+=1'
    )
    .to('.main-text-1, .t-03', { duration: 2, opacity: 0 })
    .set('.main-text-1, .main-text-2, .main-text-3', {
      border: 'none',
      width: 'auto',
      height: 'auto',
      opacity: 1,
      x: 0,
      y: 0,
    })
    .set('.main-text-2', { opacity: 1, width: '100%', height: '100%' })
    .to('.t-04', {
      duration: 0.25,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: 'bold',
      fontSize: '4vmax',
      top: 0,
      color: 'white',
      ease: 'elastic.out(1,0.30)',
    })
    .to('.t-04', { duration: 0.25, fontSize: '2vmax' })
    .to('.main-text-heart', { duration: 2, rotationY: 360, repeat: -1 }, '-=2')
    .to('.t-05', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: 'bolder',
      fontSize: '6vmax',
      top: '10%',
      color: '#39FF14',
    })
    .to('.t-05', {
      rotation: 90,
      top: '50%',
      fontSize: '4vmax',
      ease: 'bounce.out',
    })
    .to('.t-06', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: 'bolder',
      fontSize: '6vmax',
      top: '20%',
      left: '7.5%',
      color: '#FE4164',
      ease: 'back.out(4)',
    })
    .to('.t-07', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: 'bolder',
      fontSize: '3vmax',
      top: '45%',
      left: '7.5%',
      color: '#1C1CF0',
      ease: 'back.out(4)',
    })
    .to('.t-08', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: '900',
      fontSize: '3vmax',
      top: '60%',
      left: '55%',
      color: '#292421',
      borderTop: 'solid 0.5vmax #FFE135',
      ease: 'elastic.out(1,0.30)',
    })
    .to('.t-09', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: '600',
      fontSize: '6vmax',
      bottom: '10%',
      left: '10%',
      color: '#FFE135',
      borderBottom: 'solid 0.5vmax #434343',
      ease: 'none',
    })
    .to('.t-10', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: '300',
      fontSize: '3vmax',
      top: '15%',
      right: '2.5%',
      color: '#292421',
    })
    .to('.t-10', {
      rotation: 90,
      top: '25%',
      fontSize: '2vmax',
      ease: 'bounce.out',
    })
    .to('.t-11', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: '900',
      fontSize: '2vmax',
      top: '30%',
      left: '55%',
      color: '#292421',
      ease: 'elastic.out(1,0.30)',
    })
    .to('.t-12', {
      duration: 0.5,
      opacity: 1,
      position: 'absolute',
      display: 'inline',
      fontWeight: 'lighter',
      fontSize: '3vmax',
      top: '45%',
      left: '57.5%',
      color: '#292421',
      ease: 'elastic.out(1,0.30)',
    })
    .to('.t-a', { duration: 2, opacity: 0 }, '+=3')
    .addLabel('skipTextAnimation')
    .set('.t-a', { display: 'none' })
    .set('.main-text-1, .main-text-2, .main-text-3', {
      border: 'none',
      width: 'auto',
      height: 'auto',
      opacity: 1,
      x: 0,
      y: 0,
    })
    .set('.main-text-3', {
      height: '100%',
      width: '75%',
      overflow: 'visible',
    })
    .set('.test-drive-stage-intro', { display: 'inline' })
    .set('.skip-text-animation', { visibility: 'hidden' })
    .set('.replay-text-animation', { visibility: 'visible' })
}
export default mainTextGSAP

export let tlMain: gsap.core.Timeline
