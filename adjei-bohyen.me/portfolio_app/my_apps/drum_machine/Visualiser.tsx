import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export const Visualiser: React.FC<{ active: boolean }> = ({
  ...props
}): JSX.Element => {
  const [inProgress, setinProgress] = useState(false)

  useEffect(() => {
    //trigger for when pad is clicked
    if (props.active && !inProgress) {
      setinProgress(true)
      gsap
        .timeline()
        .to('.container1', { duration: 0.1, opacity: 1 })
        .to('.container2', { duration: 0.1, opacity: 0.75 })
        .to('.container3', { duration: 0.1, opacity: 0.5 })
        .to('.container3', { duration: 0.1, opacity: 0.1 })
        .to('.container2', { duration: 0.1, opacity: 0.1 })
        .to('.container1', {
          duration: 0.1,
          opacity: 0.1,
          onComplete: setinProgress,
          onCompleteParams: [false],
        })
    }
  })

  return (
    <>
      <div className="container3">
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
      </div>
      <div className="container2">
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
      </div>
      <div className="container1">
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
        <div className="visualiser" />
      </div>
      <style jsx>{`
        .container1,
        .container2,
        .container3 {
          display: flex;
          margin-left: -5px;
          align-items: flex-start;
          justify-content: space-between;
          opacity: 0.1;
        }
        .visualiser {
          width: 17.5px;
          height: 10px;
          background: lightsteelblue;
          border: solid 1px blue;
        }
      `}</style>
    </>
  )
}

export default Visualiser
