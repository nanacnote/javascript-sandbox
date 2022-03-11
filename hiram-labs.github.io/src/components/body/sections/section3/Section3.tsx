import React, { useEffect, useRef } from 'react';
import styles from './section3.module.css';
import cx from 'classnames';
import content from '../../../../data/content.json';
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaCss3,
  FaDatabase,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaVuejs,
  FaWordpress
} from 'react-icons/fa';
import { useInView } from '../../../../hooks';
import { curvedSvgBorder, zigZagSvgBorder } from '../../../svg/SvgCollection';

interface TProps {}

/**
 * Section3 of Body componet
 *
 */
const Section3: React.FC<TProps> = (): JSX.Element => {
  const currentSection = useRef(null); // gets ref for section
  const inView = useInView(currentSection);

  useEffect(() => {
    // handle the marquee auto scroll event
    if (inView) {
      const root = document.querySelector('.' + cx(styles.section3))!;
      const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
        '--marquee-elements-displayed'
      );
      const marqueeContent = document.querySelector(
        '.' + cx(styles['marquee-content'])
      )!;

      root.setAttribute(
        'style',
        `--marquee-elements: ${marqueeContent.children.length}`
      );

      for (let i = 0; i < +marqueeElementsDisplayed; i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      }
    }
  }, [inView]);

  return (
    <>
      <div className={cx(styles.section3, 'w-full center-child relative')}>
        <div ref={currentSection} className={'w-full my-20 pt-48'}>
          <div>
            <div
              className={
                'lg:mx-20 self-start center-child flex-col mx-10 max-w-4xl'
              }
            >
              <div
                className={cx(
                  inView ? 'animate-slide-in-top' : null,
                  'sm:text-4xl text-3xl self-start font-bold leading-tight line-3 pt-5 relative'
                )}
              >
                {content.techHeader}
              </div>
              <div
                className={cx(
                  inView ? 'animate-slide-in-bottom' : null,
                  'self-start py-4 text-xl'
                )}
              >
                {content.techSub}
              </div>
            </div>
            <div className={cx(styles.marquee, 'lg:mx-20 mx-10 my-10')}>
              <ul className={cx(styles['marquee-content'])}>
                <li>
                  <FaGithub />
                </li>
                <li>
                  <FaJava />
                </li>
                <li>
                  <FaPython />
                </li>
                <li>
                  <FaPhp />
                </li>
                <li>
                  <FaHtml5 />
                </li>
                <li>
                  <FaCss3 />
                </li>
                <li>
                  <FaDatabase />
                </li>
                <li>
                  <FaReact />
                </li>
                <li>
                  <FaVuejs />
                </li>
                <li>
                  <FaAngular />
                </li>
                <li>
                  <FaNodeJs />
                </li>
                <li>
                  <FaWordpress />
                </li>
                <li>
                  <FaAws />
                </li>
                <li>
                  <FaDocker />
                </li>
                <li>
                  <FaAndroid />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={'absolute top-0 w-screen'}>
          {curvedSvgBorder('top')}
        </div>
        <div className={'absolute bottom-0 w-screen'}>
          {zigZagSvgBorder('bottom')}
        </div>
      </div>
    </>
  );
};
export default Section3;
