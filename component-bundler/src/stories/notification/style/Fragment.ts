import styled, {css} from 'styled-components';
import {NotificationProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<NotificationProps>>`
  position: relative;
  align-self: center;
  margin: 0 0.5rem;
  flex: 1;
`;
