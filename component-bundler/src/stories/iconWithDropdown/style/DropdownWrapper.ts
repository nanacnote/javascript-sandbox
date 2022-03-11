import styled, {css} from 'styled-components';
import {IconWithDropdownProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<IconWithDropdownProps>>`
  display: none;
  position: absolute;
  right: -50%;
  padding-top: 15px;
`;
