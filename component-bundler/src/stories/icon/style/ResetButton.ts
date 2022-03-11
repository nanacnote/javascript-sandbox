import styled, {css} from 'styled-components';
import {IconProps} from '..';

import colors from '@shared/colors';

export default styled.button<Partial<IconProps>>`
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
