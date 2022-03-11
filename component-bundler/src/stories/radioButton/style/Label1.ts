import styled, {css} from 'styled-components';
import {RadioButtonProps} from '..';

import colors from '@shared/colors';

export default styled.label<Partial<RadioButtonProps>>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  cursor: pointer;
  padding-left: 1.75rem;
  color: ${colors.hex.black};
  transition: all 250ms ease-in;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 100%;
    border: 1px solid ${colors.hex.black};
    background: ${colors.hex.white};
    transition: all 250ms ease-in;
  }

  ::after {
    content: '';
    position: absolute;
    left: 0.25rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 100%;
    background: ${colors.hex.primary1};
    transition: all 250ms ease;
  }

  :hover {
    transition: all 250ms ease-in;
  }
`;
