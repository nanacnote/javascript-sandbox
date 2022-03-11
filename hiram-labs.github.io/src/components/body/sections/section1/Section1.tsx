import React, { useRef, useEffect } from 'react';
import styles from './section1.module.css';
import cx from 'classnames';
import { useResponsiveTypo } from '../../../../hooks/index';
import content from '../../../../data/content.json';
import Button3d from '../../../buttons/Button3d';
import Dropdown from '../../../buttons/Dropdown';
import { curvedSvgBorder } from '../../../svg/SvgCollection';

interface TProps {}
/**
 * Section1 of Body componet
 *
 */
const Section1: React.FC<TProps> = (): JSX.Element => {
  const bannerHeaderRef = useRef<HTMLDivElement>(null); // gets ref for bannerHeaderRef
  useResponsiveTypo(bannerHeaderRef, 65); // trigger the hook on load

  return (
    <>
      <div className={cx(styles.section1, 'center-child flex-col relative')}>
        {/* banner and sub banner text */}
        <div className={'px-10 mb-12 text-center'}>
          <div
            ref={bannerHeaderRef}
            className={
              'text-6xl uppercase font-black text-shadow-2xl animate-slide-in-top'
            }
          >
            {content.bannerHeader}
          </div>
          <div
            className={
              'lg:text-5xl md:text-4xl sm:text-3xl my-2 neon-text-pink animate-pulse'
            }
          >
            {content.bannerSub}
          </div>
        </div>
        {/* services buttons */}
        {/* large screen buttons*/}
        <div
          className={
            'lg:grid lg:grid-cols-4 grid-cols-2 gap-10 max-w-4xl hidden'
          }
        >
          {content.services.map((e) => (
            <Button3d key={e.name} label={e.name} flavour={'white'} />
          ))}
        </div>
        {/* small screen buttons */}
        <div
          className={
            'lg:hidden center-child flex-col max-w-4xl animate-slide-in-bottom'
          }
        >
          <Dropdown
            flavour={'white'}
            label="our services"
            content={content.services}
          />
        </div>
        <div className={'absolute bottom-0 w-screen'}>
          {curvedSvgBorder('bottom')}
        </div>
      </div>
    </>
  );
};
export default Section1;
