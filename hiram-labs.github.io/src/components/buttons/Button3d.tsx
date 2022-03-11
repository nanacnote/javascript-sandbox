import React from 'react';
import styles from './buttons.module.css';
import { FiArrowRight } from 'react-icons/fi';
import cx from 'classnames';

interface TProps {
  flavour: 'black' | 'white';
  label: string;
}

/**
 * Default 3d effect button
 *
 */
const Button3d: React.FC<TProps> = (props): JSX.Element => {
  return (
    <div className={cx(styles.button3d)}>
      <div className={'animate-grow'}>
        <button
          className={cx(
            props.flavour === 'white' && 'btn-3d-white',
            props.flavour === 'black' && 'btn-3d-black',
            'sm:text-lg uppercase text-sm hvr-icon-wobble-horizontal font-extrabold py-2 px-4 rounded-lg'
          )}
        >
          <div className={'center-child gap-2 sm:w-32'}>
            <div>{props.label}</div>
            <FiArrowRight className={'hvr-icon text-lg'} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Button3d;
