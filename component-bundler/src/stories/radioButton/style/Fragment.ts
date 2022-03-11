import styled, {css} from 'styled-components';
import {RadioButtonProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<RadioButtonProps>>`
  position: relative;
  display: flex;
`;
