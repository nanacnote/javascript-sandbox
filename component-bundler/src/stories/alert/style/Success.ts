import styled, {css} from 'styled-components';
import {AlertProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<AlertProps & {isVisible: boolean}>>`
  position: relative;
  display: none;
  font-size: 0.75rem;
  padding: 0.75rem 0.75rem;
  border-radius: 10px;
  color: ${colors.hex.secondary3};
  background-color: ${colors.hex.success};
  transition: all 250ms ease-in;

  ${({isVisible}) =>
    isVisible &&
    css`
      display: inline-flex;
    `}
`;
