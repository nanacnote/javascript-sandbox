import { useBreakPoint, useScrollDirection } from '../my_hooks'

export const BannerDesign = (): JSX.Element => {
  const scrollUnit = useScrollDirection(50).unit
  const [, breakPoint] = useBreakPoint()

  return (
    <>
      <div className="scene stamp banner-design-background">
        <div className="ticket" data-content="admin"></div>
        <div className="ticket" data-content="api doc"></div>
        {/* under construction icon */}
        <div
          className="construction position-absolute"
          style={{ left: '100%' }}
        >
          <div className="px-5">
            <img
              src="pics/construction.png"
              alt="under construction badge"
              style={{ width: '75px' }}
            />
          </div>
        </div>
      </div>
      {/* styling for background is relegated to the main scss style sheet under the class banner-design-background to allow for changes with themes */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text');
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .construction {
          transition: all 500ms ease-in-out;
        }

        .construction:hover {
          transform: scale(1.25);
          transition: all 750ms ease-in-out;
        }

        .stamp {
          visibility: hidden;
        }

        .scene {
          display: -webkit-box;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
          width: 100%;
          padding: 1rem;
          border-radius: 0.25rem;
          opacity: ${1 - (scrollUnit < 25 ? scrollUnit : 23) / 25};
          transform: ${breakPoint === 'sm' || breakPoint === 'xs'
            ? 'scale(0.75)'
            : 'scale(1)'};
          margin: ${breakPoint === 'sm' || breakPoint === 'xs'
            ? '0 -10%'
            : 'auto'};
        }
        .scene:hover {
          opacity: 0.9;
          transition: all 750ms ease-in-out;
        }

        .scene .ticket {
          width: 200px;
          height: 50px;
          line-height: 100px;
          text-align: center;
          background: lightcoral;
          box-shadow: 0 25px 10px -20px rgba(0, 0, 0, 0.18);
          border-left: 2px dotted rgba(273, 216, 230, 0.5);
          position: relative;
          cursor: pointer;
        }
        .scene .ticket:nth-child(2n + 0) {
          background: #348fac;
        }
        .scene .ticket:last-of-type {
          border-right: 2px dotted rgba(273, 216, 230, 0.5);
        }
        .scene .ticket::before,
        .scene .ticket::after {
          content: '';
          position: absolute;
        }
        .scene .ticket::before {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 10%;
          left: -3.05%;
        }
        .scene .ticket::after {
          content: attr(data-content);
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          padding-top: 5px;
          padding-left: 5px;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 1em;
          color: rgba(255, 255, 255, 0.5);
        }

        @media only screen and (max-width: 454px) {
          .scene {
            // margin: 0 -7.5%;
          }
        }
      `}</style>
    </>
  )
}

export default BannerDesign
