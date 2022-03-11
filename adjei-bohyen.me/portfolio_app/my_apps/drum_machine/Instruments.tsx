export const Instruments: React.FC<{ type: string }> = ({
  ...props
}): JSX.Element => {
  return (
    <>
      <div
        className="instrumentsSelectorItem"
        data-instrument-type={props.type}
      >
        <div className="instrumentsSelectorItemIndicator" />
      </div>
      <style jsx>{`
        .instrumentsSelectorItem {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45%;
          height: 100%;
          border-radius: 30%/50%;
          border: solid 0.25em #0e0e0e;
          background-color: grey;
          background: -webkit-gradient(
            linear,
            left bottom,
            left top,
            color-stop(0, #1d1d1d),
            color-stop(1, #131313)
          );
        }
        .instrumentsSelectorItemIndicator {
          position: absolute;
          top: 50%;
          left: 19%;
          width: 7.5%;
          height: 2.5%;
          background-color: darkred;
          border-radius: 5%;
        }
        .active {
          background-color: #a8d8f8;
          box-shadow: 0 0 0.4em 0 #79c3f4;
        }
      `}</style>
    </>
  )
}

export default Instruments
