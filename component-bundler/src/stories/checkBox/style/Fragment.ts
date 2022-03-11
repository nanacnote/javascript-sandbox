import styled, {css} from 'styled-components';
import {CheckBoxProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<CheckBoxProps>>`
  position: relative;
  display: flex;
`;
