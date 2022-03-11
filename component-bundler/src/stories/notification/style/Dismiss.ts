import styled, {css} from 'styled-components';
import {NotificationProps} from '..';

import colors from '@shared/colors';

export default styled.span<Partial<NotificationProps>>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  width: 1.75em;
  height: 1.75em;
  outline: none;
  transition: all 250ms ease-in;

  :hover {
    background-color: rgba(255, 255, 255, 0.4);
    transition: all 250ms ease-in;
  }
`;
