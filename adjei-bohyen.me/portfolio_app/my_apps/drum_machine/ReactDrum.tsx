import { PureComponent } from 'react'
import {
  Instruments,
  instrumentsControls,
  VolumeDial,
  volumeDialControls,
  Pad,
  padControls,
  Visualiser,
} from './'
import styles from './ReactDrum.module.scss'

type TProps = {}
type TState = {
  volumeLevel: number
  padActive: {
    status: boolean
    index: number
  }
  instrumentActive: string
  allSoundKits: object
}
export class ReactDrum extends PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      volumeLevel: 19,
      padActive: {
        status: false,
        index: undefined,
      },
      instrumentActive: 'non selected',
      allSoundKits: undefined,
    }
  }

  private padRed: HTMLDivElement
  private padGreen: HTMLDivElement
  private padBlue: HTMLDivElement
  private padYellow: HTMLDivElement
  private padPurple: HTMLDivElement
  private padOrange: HTMLDivElement

  // keydown handler
  private keyDown = (e: KeyboardEvent) => {
    //remove the effect added by active class
    const remove = (param: HTMLDivElement) => {
      setTimeout(() => {
        param.classList.remove(styles.padActive)
      }, 250)
    }

    const idx = +e.key
    if ([1, 2, 3, 4, 5, 6].includes(idx)) {
      this.setState({ padActive: { status: true, index: idx } })
      switch (idx) {
        case 1:
          this.padRed.classList.add(styles.padActive)
          remove(this.padRed)
          break
        case 2:
          this.padGreen.classList.add(styles.padActive)
          remove(this.padGreen)
          break
        case 3:
          this.padBlue.classList.add(styles.padActive)
          remove(this.padBlue)
          break
        case 4:
          this.padYellow.classList.add(styles.padActive)
          remove(this.padYellow)
          break
        case 5:
          this.padPurple.classList.add(styles.padActive)
          remove(this.padPurple)
          break
        case 6:
          this.padOrange.classList.add(styles.padActive)
          remove(this.padOrange)
          break
        default:
          break
      }
      this.setState({ padActive: { status: false, index: 0 } })
    }
  }

  componentDidMount() {
    //add event listner for key press
    document.addEventListener('keydown', this.keyDown)

    instrumentsControls(this)
    volumeDialControls(this)
    padControls(this)
  }

  componentDidUpdate() {
    if (
      this.state.allSoundKits &&
      this.state.instrumentActive !== 'non selected' &&
      this.state.padActive.index
    ) {
      this.state.allSoundKits[this.state.instrumentActive]?.play(
        Object.keys(
          this.state.allSoundKits[this.state.instrumentActive]._sprite
        )[this.state.padActive.index - 1]
      )
    }
  }

  componentWillUnmount() {
    //remove event listner for keypress
    document.removeEventListener('keydown', this.keyDown)
  }

  render() {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.device}>
              <div className={styles.screen}>
                <div className={styles.screenSection}>
                  <div className={styles.screenSectionHeader}>Visualiser</div>
                  <div className={styles.screenSectionBody}>
                    <Visualiser active={this.state.padActive.status} />
                  </div>
                </div>
                <div className={styles.screenSection}>
                  <div className={styles.screenSectionHeader}>Instrument</div>
                  <div className={styles.screenSectionBody}>
                    {this.state.instrumentActive.toLocaleUpperCase()}
                  </div>
                </div>
                <div className={styles.screenSection}>
                  <div className={styles.screenSectionHeader}>Volume</div>
                  <div className={styles.screenSectionBody}>
                    {this.state.volumeLevel}
                  </div>
                </div>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.padContainer}>
                  <div className={styles.padTop}>
                    <Pad
                      ref={(div) => (this.padRed = div)}
                      parentClass={styles.padRed}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="1"
                    />
                    <Pad
                      ref={(div) => (this.padGreen = div)}
                      parentClass={styles.padGreen}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="2"
                    />
                    <Pad
                      ref={(div) => (this.padBlue = div)}
                      parentClass={styles.padBlue}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="3"
                    />
                  </div>
                  <div className={styles.padBottom}>
                    <Pad
                      ref={(div) => (this.padYellow = div)}
                      parentClass={styles.padYellow}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="4"
                    />
                    <Pad
                      ref={(div) => (this.padPurple = div)}
                      parentClass={styles.padPurple}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="5"
                    />
                    <Pad
                      ref={(div) => (this.padOrange = div)}
                      parentClass={styles.padOrange}
                      childClass={styles.padLight}
                      keyRefClass={styles.padRef}
                      keyRef="6"
                    />
                  </div>
                </div>
                <div className={styles.controlsContainer}>
                  <div className={styles.instruments}>
                    <div className={styles.instrumentsSelector}>
                      <Instruments type="drums" />
                      <Instruments type="synth" />
                    </div>
                    <div className={styles.instrumentsSelector}>
                      <Instruments type="empty" />
                      <Instruments type="empty" />
                    </div>
                  </div>
                  <div className={styles.volume}>
                    <VolumeDial />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default ReactDrum
