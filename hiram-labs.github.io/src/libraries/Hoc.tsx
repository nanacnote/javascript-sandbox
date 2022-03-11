import React from 'react';

interface TProps {}
/**
 * High order componet to delegate click events
 *
 */
const Hoc: React.FC<TProps> = (props): JSX.Element => {
  return <>{props.children}</>;
};
export default Hoc;
