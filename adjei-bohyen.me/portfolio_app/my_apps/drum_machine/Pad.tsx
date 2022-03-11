import React from 'react'

type TProps = {
  parentClass: string
  childClass: string
  keyRefClass: string
  keyRef: string
}

export const Pad = React.forwardRef<HTMLDivElement, TProps>(
  (props, forwardedRef) => (
    <>
      <div className={`${props.parentClass} pad`}>
        <div ref={forwardedRef}>
          <div className={props.keyRefClass}>
            <div>{props.keyRef}</div>
          </div>
          <div className={props.childClass} />
        </div>
      </div>
    </>
  )
)
export default Pad
