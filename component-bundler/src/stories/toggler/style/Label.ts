import styled, {css} from 'styled-components';
import {TogglerProps} from '..';

import colors from '@shared/colors';

export default styled.label<Partial<TogglerProps>>`
  position: relative;
  display: inline-block;
  height: 24px;
  width: 42px;
`;
