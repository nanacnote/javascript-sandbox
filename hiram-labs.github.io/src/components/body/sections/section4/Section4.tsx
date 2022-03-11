import React, { useRef } from 'react';
import styles from './section4.module.css';
import cx from 'classnames';
import content from '../../../../data/content.json';
import Button3d from '../../../buttons/Button3d';
import { useInView } from '../../../../hooks';

interface TProps {}

/**
 * Section4 of Body componet
 *
 */
const Section4: React.FC<TProps> = (): JSX.Element => {
  const currentSection = useRef(null); // gets ref for section
  const inView = useInView(currentSection);

  return (
    <>
      <div
        ref={currentSection}
        className={cx(styles.section4, 'center-child ')}
      >
        <div className={'my-20 center-child flex-col'}>
          <div className={'lg:mx-20 mx-10 max-w-3xl self-start'}>
            <div
              className={cx(
                inView ? 'animate-slide-in-top' : null,
                'sm:text-4xl text-3xl font-bold leading-tight relative line-1 pt-5'
              )}
            >
              {content.projectsHeader}
            </div>
            <div
              className={cx(
                inView ? 'animate-slide-in-bottom' : null,
                'py-4 text-xl'
              )}
            >
              {content.projectsSub}
            </div>
          </div>
          <div className={'sm:grid sm:grid-cols-2 lg:mx-20 mt-10 mx-10'}>
            {content.projects.map((e, i, arr) => (
              <div
                key={e.name}
                tabIndex={0}
                className={cx(
                  styles['image-wrapper'],
                  i === 0 && 'sm:rounded-tl-lg sm:rounded-t-none rounded-t-lg',
                  i === 1 && 'sm:rounded-tr-lg rounded-none',
                  i === arr.length - 2 && 'sm:rounded-bl-lg rounded-none',
                  i === arr.length - 1 &&
                    'sm:rounded-bl-none rounded-bl-lg rounded-br-lg',
                  inView ? 'animate-grow' : null,
                  'center-child cursor-pointer overflow-hidden relative'
                )}
              >
                <img src={'assets/compressed/' + e.image} alt={e.name} />
                <div
                  className={cx(
                    styles.label,
                    'rounded-t-sm bg-customBgContrast'
                  )}
                >
                  <div className={'p-5'}>
                    <div
                      className={'md:text-3xl text-2xl font-bold text-customBg'}
                    >
                      {e.name}
                    </div>
                    <div className={'text-xl text-gray-500'}>{e.service}</div>
                    <div className={'flex justify-between items-center'}>
                      <div>{e.organisation}</div>
                      <Button3d label={'Visit'} flavour={'black'} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Section4;
