import { default as $ } from 'jquery'

export default function padControls(params: any) {
  // all pad elements selector
  const pad = $('.pad')

  // click event
  pad.on('pointerdown', function () {
    params.setState({ padActive: true })
    const idx = pad.index(this) + 1
    params.setState({ padActive: { status: true, index: idx } })
  })
  pad.on('pointerup', function () {
    params.setState({ padActive: { status: false, index: 0 } })
  })
}
