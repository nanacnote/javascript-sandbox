import styled, {css} from 'styled-components';
import {TogglerProps} from '..';

import colors from '@shared/colors';

export default styled.span<Partial<TogglerProps>>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  background-color: ${colors.hex['grey_gray_6_c_6']};
  transition: all 250ms ease-in;

  :before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    bottom: 2px;
    left: 2px;
    border-radius: 50%;
    background-color: white;
    transition: all 250ms ease-in;
  }
`;
