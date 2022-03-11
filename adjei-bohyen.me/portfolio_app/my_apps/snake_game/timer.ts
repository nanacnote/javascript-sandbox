/**
 * @public create a new seconds timer class
 * enter limit as number or -1 for perpetual count
 */
export default class Timer {
  /**
   * @params number
   * @method start
   * @method stop
   * @property current
   */
  constructor(params: number) {
    this.params = params
  }

  /**
   * allocated variable for param value
   */
  private params: number

  /**
   * allocated variable for props value
   */
  public current = 0
  public currentHMS = '0'
  private instance: NodeJS.Timeout

  /**
   * @public method to start timer
   */
  public start() {
    this.instance = setInterval(() => {
      if (this.params !== this.current) {
        this.current += 1
        const h = String(Math.floor(this.current / 3600))
        const m = String(Math.floor((this.current % 3600) / 60))
        const s = String((this.current % 3600) % 60)
        this.currentHMS = h + 'h' + ' ' + m + 'm' + ' ' + s + 's'
      } else {
        this.stop()
      }
    }, 1000)
  }

  /**
   * @public method to stop timer
   */
  public stop() {
    clearInterval(this.instance)
  }
}
