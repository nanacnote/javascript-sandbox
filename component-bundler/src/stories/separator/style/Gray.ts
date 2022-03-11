import styled, {css} from 'styled-components';
import {SeparatorProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<SeparatorProps>>`
  display: block;
  height: 1px;
  width: 100%;
  background: ${colors.hex.gray3};
`;
