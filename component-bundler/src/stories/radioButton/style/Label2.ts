import styled, {css} from 'styled-components';
import {RadioButtonProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.label<Partial<RadioButtonProps>>`
  position: relative;
  padding: 0.75rem 1.125rem;
  border-radius: 0.625rem;
  width: 100%;
  color: ${colors.hex['grey_gray_4_53']};
  border: solid 1px ${colors.hex['grey_gray_7_e_3']};
  cursor: pointer;
  transition: all 250ms ease-in;

  ${typography.preset['S_Body_Medium']}

  :hover {
    transition: all 250ms ease-in;
  }
`;
