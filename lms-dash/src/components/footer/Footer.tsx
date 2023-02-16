import pkg from '../../../package.json';
import React from 'react';
import styles from './footer.module.css';
import cx from 'classnames';

interface TProps {}

/**
 * Footer component
 *
 */
const Footer: React.FC<TProps> = (): JSX.Element => {
  return (
    <div className={cx(styles.container)}>
      <p
        style={{ margin: 0, textAlign: 'center' }}
      >{`${new Date().getFullYear()} | © CC0-1.0 by ${pkg.author}`}</p>
    </div>
  );
};

export default Footer;
