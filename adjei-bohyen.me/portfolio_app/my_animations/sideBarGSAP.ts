import { gsap } from 'gsap'

/**
 * Contains timeline for layout page landing animation
 * @param context.setLandingStatus
 * @param value
 * @returns set the app context passed as parameter to the second param value ie boolean in this case
 */
export const landingGSAP = (setLandingStatus: any, value: boolean) => {
  tlLanding = gsap
    .timeline()
    .to('.landing-transition-left', {
      duration: 1,
      backgroundColor: '#d9d9d9',
      width: '100%',
      height: '100%',
    })
    .to('.landing-transition-left', {
      duration: 1,
      backgroundColor: '#f0f0f0',
      width: '300%',
      x: 2000,
    })
    .to('.landing-transition-left', {
      duration: 1,
      backgroundColor: '#f5f5f5',
      x: -2000,
    })
    .call(setLandingStatus, [value])
}
export let tlLanding: gsap.core.Timeline

/**
 * Contains timeline for layout page sider animation
 */
export const siderGSAP = () => {
  tlSider = gsap
    .timeline()
    .from('.sider', { duration: 1, height: '0', ease: 'bounce.out' })
    .set('.sider-container', { opacity: 1 })
    .from('.sider-section', {
      duration: 0.25,
      x: -500,
      stagger: 0.1,
      ease: 'back.out(2)',
    })
    .from('.sider-btn', { duration: 0.6, rotationY: 180, stagger: 0.025 })
    .from('.sider-icon, .sider-badge', {
      duration: 0.25,
      opacity: 0,
      fontSize: '0',
      stagger: 0.025,
      ease: 'bounce.out',
    })
    .from('.sider-divider', {
      duration: 0.25,
      y: -1000,
      stagger: 0.025,
      ease: 'elastic.out(1,0.30)',
    })
    .set('.stamp', { visibility: 'visible' }, '-=0.5')
    .from(
      '.stamp',
      {
        duration: 0.5,
        opacity: 0,
        rotate: '-2deg',
        scale: 5,
        clearProps: 'opacity,rotate,scale',
      },
      '-=0.5'
    )
    .to('.grad-hr', { duration: 0.5, width: '100%' }, '-=1')
    .set('.current-col, .theme-col', { visibility: 'visible' }, '-=0.5')
    .fromTo(
      '.current-col-items, .theme-col-items',
      { opacity: 0, yPercent: -50 },
      { duration: 0.75, opacity: 1, yPercent: 0, stagger: 0.25 },
      '-=0.5'
    )
}
export let tlSider: gsap.core.Timeline

/**
 * Contains timeline for layout page no sider animation
 */
export const noSiderGSAP = () => {
  tlNoSider = gsap
    .timeline()
    .set('.sider-container', { opacity: 1 })
    .set('.stamp', { visibility: 'visible' })
    .set('.grad-hr', { width: '100%' })
    .set('.current-col, .theme-col', { visibility: 'visible' })
}
export let tlNoSider: gsap.core.Timeline
