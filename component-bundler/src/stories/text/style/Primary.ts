import styled, {css} from 'styled-components';
import {TextProps} from '..';

import colors from '@shared/colors';
import typography from '@shared/typography';

export default styled.span<Partial<TextProps>>`
  word-wrap: break-word;
  color: ${({fontColor}) => colors.hex[fontColor] || fontColor};

  ${({fontStyle}) =>
    fontStyle &&
    css`
      ${typography.preset[fontStyle]}
    `}
`;
