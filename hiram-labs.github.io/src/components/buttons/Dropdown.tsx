import React, { useState } from 'react';
import styles from './buttons.module.css';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import cx from 'classnames';

interface TProps {
  flavour: 'black' | 'white';
  label: string;
  content: Array<string | { [key: string]: string }>;
}

/**
 * Button with dopdown menu componet
 *
 */
const Dropdown: React.FC<TProps> = (props): JSX.Element => {
  const [openServicesDropdown, setopenServicesDropdown] = useState(false); // handle state of button

  return (
    <div className={cx(styles.dropdown)}>
      <div
        className={cx(
          props.flavour === 'white' && 'btn-3d-white',
          props.flavour === 'black' && 'btn-3d-black',
          'sm:text-lg uppercase text-sm font-extrabold rounded-lg'
        )}
      >
        <div className="sm:w-64 grid grid-cols-8">
          <div
            className={'center-child col-span-6 whitespace-no-wrap py-2 px-4'}
            tabIndex={0}
          >
            {props.label}
          </div>

          <div
            className={
              'sm:text-2xl hvr-icon-wobble-vertical col-span-2 border-l-4 text-lg rounded-r-lg bg-customSecondary'
            }
            tabIndex={0}
            onClick={() => setopenServicesDropdown(!openServicesDropdown)}
          >
            <div className={'h-full center-child'}>
              {openServicesDropdown ? (
                <FiArrowUp className={'hvr-icon'} />
              ) : (
                <FiArrowDown className={'hvr-icon'} />
              )}
            </div>
          </div>
        </div>
      </div>
      {openServicesDropdown && (
        <div className={'w-full relative animate-slide-in-top'}>
          <div
            className={
              'absolute top-0 w-full my-5 border-2 rounded-lg shadow-2xl text-customBg bg-customBgContrast z-50 overflow-hidden'
            }
          >
            {props.content.map((e, i) => (
              <div key={typeof e === 'string' ? e : e.name}>
                <div
                  className={
                    'sm:px-8 px-4 py-2 rounded-lg animate-grow hover:shadow-inner hover:bg-customBg hover:text-customBgContrast outline-none'
                  }
                  tabIndex={0}
                >
                  <div className={'text-base font-medium uppercase'}>
                    {typeof e === 'string' ? e : e.name}
                  </div>
                </div>
                {i < props.content.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
