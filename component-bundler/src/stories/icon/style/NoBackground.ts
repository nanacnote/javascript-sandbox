import styled, {css} from 'styled-components';
import {IconProps} from '..';

import colors from '@shared/colors';

export default styled.span<Partial<IconProps>>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  width: 1.75em;
  height: 1.75em;
  outline: none;
  cursor: pointer;
  transition: all 250ms ease-in;

  ${({disabled}) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;
