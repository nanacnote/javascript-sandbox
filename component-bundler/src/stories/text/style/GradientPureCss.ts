import styled, {css} from 'styled-components';
import {TextProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.span<Partial<TextProps>>`
  position: relative;
  display: inline-block;
  background-image: linear-gradient(
    105deg,
    #f54747 19%,
    #faa768 36%,
    #ec86d7 55%,
    #7ec3f5 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  ${({fontStyle}) =>
    fontStyle &&
    css`
      ${typography.preset[fontStyle]}
    `}
`;
