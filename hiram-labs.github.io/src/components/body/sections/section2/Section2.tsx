import React, { useRef } from 'react';
import styles from './section2.module.css';
import cx from 'classnames';
import content from '../../../../data/content.json';
import { useInView } from '../../../../hooks';

interface TProps {}
/**
 * Section1 of Body componet
 *
 */
const Section2: React.FC<TProps> = (): JSX.Element => {
  const currentSection = useRef(null); // gets ref for section
  const inView = useInView(currentSection);

  return (
    <>
      <div
        ref={currentSection}
        className={cx(styles.section2, 'center-child w-full relative')}
      >
        <div className={'lg:mx-20 grid grid-cols-6 gap-10 mx-10 mt-24'}>
          <div
            className={cx(
              inView ? 'animate-slide-in-left' : null,
              'xl:col-span-3 lg:col-start-1 lg:col-span-2 lg:center-child hidden'
            )}
          >
            <img
              src="/assets/compressed/teamwork.png"
              alt="teamwork illustration"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div
            className={
              'xl:col-start-4 lg:col-start-3 lg:col-span-6 center-child flex-col col-start-1 col-span-6'
            }
          >
            <div
              className={cx(
                inView ? 'animate-slide-in-top' : null,
                'sm:text-4xl text-3xl font-bold leading-tight relative line-2 pt-5'
              )}
            >
              {content.introHeader}
            </div>
            <div
              className={cx(
                inView ? 'animate-slide-in-bottom' : null,
                'py-4 text-xl'
              )}
            >
              {content.introSub}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
