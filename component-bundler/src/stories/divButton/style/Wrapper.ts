import styled, {css} from 'styled-components';
import {DivButtonProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<DivButtonProps>>`
  /* resets */
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  text-decoration: none;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: inherit;
  line-height: normal;
  outline: none;

  position: relative;
`;
