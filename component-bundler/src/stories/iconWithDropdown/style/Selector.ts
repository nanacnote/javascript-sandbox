import styled, {css} from 'styled-components';
import {IconWithDropdownProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<IconWithDropdownProps>>`
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: all 250ms ease-in;
`;
