import React, { useRef } from 'react'
import { useInView } from '../my_hooks'
import sortBy from 'lodash/sortBy'

type TProps = {
  category: string
  skills: object
}

export const SkillsSetLevel: React.FC<TProps> = ({ ...props }): JSX.Element => {
  //ref variable for this component
  const ref = useRef()

  const inView = useInView(ref)

  //function to help determine how to display the skills progress bar takes
  //two argument 1. type of output required 2. the level of achievement as a number
  //this function is mainly called by data coming in from getstaticprops
  const skillsLevelBarHelper = (
    arg1: 'color' | 'description',
    arg2: number
  ) => {
    if (arg1 === 'color') {
      return arg2 >= 75
        ? 'bg-success'
        : arg2 >= 50
        ? 'bg-info'
        : arg2 >= 25
        ? 'bg-warning'
        : 'bg-danger'
    }
    if (arg1 === 'description') {
      return arg2 >= 75
        ? 'Expert'
        : arg2 >= 50
        ? 'Advance'
        : arg2 >= 25
        ? 'Intermediate'
        : 'Beginer'
    }
  }

  return (
    <div ref={ref}>
      {sortBy(Object.entries(props.skills[props.category] || {}), [
        function (o) {
          return o[1]
        },
      ])
        .reverse()
        .map((e) => (
          <div key={e[0]} className="d-flex flex-row align-items-center pr-2">
            <div className="pr-2">{e[0]}</div>
            <div className="progress w-50 ml-auto">
              <div
                className={`progress-bar ${skillsLevelBarHelper(
                  'color',
                  +e[1]
                )} progress-bar-striped progress-bar-animated`}
                role="progressbar"
                aria-valuenow={+e[1]}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  width: `${inView ? e[1] : 0}%`,
                }}
              >
                {skillsLevelBarHelper('description', +e[1])}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
