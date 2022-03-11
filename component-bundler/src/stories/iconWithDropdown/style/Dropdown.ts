import styled, {css} from 'styled-components';
import {IconWithDropdownProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<IconWithDropdownProps>>`
  position: relative;
  display: inline-flex;
  flex-direction: column;

  border-radius: 10px;
  border: solid 1px ${colors.hex.gray3};
  box-shadow: 0 2px 16px 0 rgba(50, 50, 50, 0.12),
    0 2px 2px 0 rgba(25, 25, 25, 0.04);
  background-color: ${colors.hex.white};
  overflow: hidden;
  transition: all 250ms ease-in;
`;
