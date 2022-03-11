import styled, {css} from 'styled-components';
import {CheckBoxProps} from '..';

import colors from '@shared/colors';

export default styled.label<Partial<CheckBoxProps>>`
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
    border: 1px solid ${colors.hex.black};
    background: ${colors.hex.white};
    transition: all 250ms ease-in;
  }

  ::after {
    content: '';
    position: absolute;
    margin-bottom: 0.175rem;
    left: 0.375rem;
    width: 0.5rem;
    height: 0.75rem;
    background: ${colors.hex.primary1};
    transition: all 250ms ease;
  }

  :hover {
    transition: all 250ms ease-in;
  }
`;
