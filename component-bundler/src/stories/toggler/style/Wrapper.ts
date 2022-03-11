import styled, {css} from 'styled-components';
import {TogglerProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<TogglerProps>>`
  position: relative;
  display: inline-flex;
  transition: all 250ms ease-in;
`;
