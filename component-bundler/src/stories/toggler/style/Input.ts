import styled, {css} from 'styled-components';
import {TogglerProps} from '..';

import colors from '@shared/colors';

export default styled.input<Partial<TogglerProps>>`
  opacity: 0;
  width: 0;
  height: 0;

  :checked + span {
    background-color: ${colors.hex['primary_tuscan_red']};
  }

  :checked + span:before {
    transform: translateX(91%);
  }
`;
