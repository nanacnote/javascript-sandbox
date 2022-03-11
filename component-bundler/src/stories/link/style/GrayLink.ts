import styled, {css} from 'styled-components';
import {LinkProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.a<Partial<LinkProps>>`
  cursor: pointer;
  color: ${colors.hex['grey_gray_5_8_c']};
  text-decoration: none;
  transition: all 250ms ease-in;

  :hover {
    text-decoration: underline;
    color: ${colors.hex['grey_gray_5_8_c']};
  }

  ${({fontStyle}) =>
    fontStyle &&
    css`
      ${typography.preset[fontStyle]}
    `}

  ${({disabled}) =>
    disabled &&
    css`
      opacity: 0.75;
      cursor: not-allowed;
      text-decoration: none;

      :hover {
        text-decoration: none;
        color: ${colors.hex['grey_gray_5_8_c']};
      }
    `}
`;
