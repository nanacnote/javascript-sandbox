import styled, {css} from 'styled-components';
import {LinkProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.a<Partial<LinkProps>>`
  cursor: pointer;
  color: ${colors.hex['functional_colors_dark_blue']};
  text-decoration: none;
  transition: all 250ms ease-in;

  :hover {
    text-decoration: underline;
    color: ${colors.hex['functional_colors_dark_blue']};
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
        color: ${colors.hex['functional_colors_dark_blue']};
      }
    `}
`;
