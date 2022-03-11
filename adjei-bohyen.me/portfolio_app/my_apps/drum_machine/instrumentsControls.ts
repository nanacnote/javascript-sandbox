import { default as $ } from 'jquery'
import { Howl } from 'howler'

export default function instruments(params: any) {
  // load alls soundkits and assign to app state
  const sounds = {}
  Object.entries(allSoundKits).map((e) => {
    sounds[e[0]] = new Howl({
      src: e[1].urls as string[],
      sprite: e[1].sprite as {},
    })
  })
  params.setState({ allSoundKits: sounds })

  // select all button elements
  const button = $('.instrumentsSelectorItem')

  // click event
  button.on('click', function () {
    //   get index of current clicked button
    const idx = button.index(this)
    // get name of soundkit to use
    const typ = $(this).attr('data-instrument-type')

    button.removeClass('active')
    $(button[idx]).addClass('active')

    button.children().css({
      'background-color': 'darkred',
      width: '7.5%',
      height: '2.5%',
    })
    $(button[idx]).children().css({
      'background-color': '#a8d8f8',
      width: '15.25%',
      height: '5%',
    })
    params.setState({ instrumentActive: typ })
  })
}

const allSoundKits = {
  drums: {
    urls: [
      '/drum_machine/drum_sample.ogg',
      '/drum_machine/drum_sample.m4a',
      '/drum_machine/drum_sample.mp3',
      '/drum_machine/drum_sample.ac3',
    ],
    sprite: {
      '808': [0, 2400],
      Crash: [4000, 4948.458049886622],
      HiHat: [10000, 4948.458049886622],
      Kick: [16000, 454.55782312925305],
      Snap: [18000, 2474.2176870748303],
      Snare: [22000, 2474.2176870748303],
    },
  },
  synth: {
    urls: [
      '/drum_machine/synth_sample.ogg',
      '/drum_machine/synth_sample.m4a',
      '/drum_machine/synth_sample.mp3',
      '/drum_machine/synth_sample.ac3',
    ],
    sprite: {
      CautionPluckC: [0, 5200.45351473923],
      ChordG: [7000, 1237.1201814058957],
      ChordFSharp: [10000, 1026.4852607709756],
      StabDmin: [13000, 839.9999999999999],
      SteelStabD: [15000, 1750],
      ChordCmaj7: [18000, 8166.530612244898],
    },
  },
}
