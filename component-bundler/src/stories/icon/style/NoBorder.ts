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
  border: solid 1.5px ${colors.hex['grey_gray_9_f_7']};
  background-color: ${colors.hex['grey_gray_9_f_7']};
  transition: all 250ms ease-in;

  ${({disabled}) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;
