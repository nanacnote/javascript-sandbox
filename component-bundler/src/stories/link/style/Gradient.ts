import styled, {css} from 'styled-components';
import {LinkProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.a<Partial<LinkProps>>`
  position: relative;
  display: inline-block;
  background-image: linear-gradient(
    105deg,
    #f54747 19%,
    #faa768 36%,
    #ec86d7 55%,
    #7ec3f5 90%
  );
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #f54747;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  transition: all 250ms ease-in;

  ${({fontStyle}) =>
    fontStyle &&
    css`
      ${typography.preset[fontStyle]}
    `}

  ${({disabled}) =>
    disabled
      ? css`
          cursor: not-allowed;
          color: ${colors.hex.gray4};
          :hover {
            color: ${colors.hex.gray4};
            transition: all 250ms ease-in;
          }
        `
      : css`
          :hover {
            opacity: 0.5;
            transition: all 250ms ease-in;
          }
        `}
`;
