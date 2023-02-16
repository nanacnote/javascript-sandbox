import React from 'react';
import styles from './body.module.css';
import cx from 'classnames';
import { GlobalDataContext } from '../../context';
import { Overview, Pupil } from '..';

interface TProps {}

/**
 * Body component
 *
 */
const Body: React.FC<TProps> = (): JSX.Element => {
  const { currentViewKey } = React.useContext(GlobalDataContext);
  const views: any = {
    overview: <Overview />,
    pupils: <Pupil />
  };
  return <div className={cx(styles.container)}>{views[currentViewKey]}</div>;
};

export default Body;
