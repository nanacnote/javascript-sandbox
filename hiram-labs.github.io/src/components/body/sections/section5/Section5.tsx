import React, { useRef } from 'react';
import styles from './section5.module.css';
import cx from 'classnames';
import content from '../../../../data/content.json';
import Button3d from '../../../buttons/Button3d';
import { useInView } from '../../../../hooks';
import * as tailwindConfig from '../../../../../tailwind.config';
import { zigZagSvgBorder } from '../../../svg/SvgCollection';

interface TProps {}
/**
 * Section5 of Body componet
 *
 */
const Section5: React.FC<TProps> = (): JSX.Element => {
  const currentSection = useRef(null); // gets ref for section
  const inView = useInView(currentSection);
  return (
    <>
      <div className={cx(styles.section5, 'w-full center-child relative')}>
        <div ref={currentSection}>
          <div className={'my-20 center-child flex-col w-full'}>
            <div className={'lg:mx-20 mx-10 max-w-3xl self-start'}>
              <div
                className={cx(
                  inView ? 'animate-slide-in-top' : null,
                  'sm:text-4xl text-3xl font-bold leading-tight relative line-2 pt-5'
                )}
              >
                {content.contactHeader}
              </div>
              <div
                className={cx(
                  inView ? 'animate-slide-in-bottom' : null,
                  'py-4 text-xl'
                )}
              >
                {content.contactSub}
              </div>
            </div>
            <div className={'w-full'}>
              <div
                className={
                  'sm:grid sm:grid-cols-2 lg:mx-20 mx-10 mt-10 bg-customTetiary shadow-2xl rounded-lg overflow-hidden'
                }
              >
                <div
                  className={cx(
                    inView ? 'animate-grow' : null,
                    'sm:center-child hidden'
                  )}
                >
                  <img
                    src="/assets/compressed/contact.png"
                    alt="contact us illustration"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
                <div className={'p-8'}>
                  <form>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-lg font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          First Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-lg font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Last Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-lg font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          E-mail
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="email"
                          type="email"
                          placeholder="j.doe@email.com"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-lg font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Message
                        </label>
                        <textarea
                          className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                          id="message"
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center">
                      <Button3d flavour="white" label="Send" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'absolute top-0 w-screen'}>
          {zigZagSvgBorder('top')}
        </div>
      </div>
    </>
  );
};

export default Section5;
