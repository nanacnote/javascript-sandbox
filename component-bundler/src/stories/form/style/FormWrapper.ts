import styled, {css} from 'styled-components';
import {FormProps} from '..';

import colors from '@shared/colors';

export default styled.form<Partial<FormProps>>`
  position: relative;

  button[type='submit'] {
    :disabled {
      span {
        opacity: 0.5 !important;
        background-color: ${colors.hex['grey_gray_1_19']} !important;
        cursor: not-allowed !important;

        :hover {
          background-color: ${colors.hex['grey_gray_1_19']} !important;
        }
      }
    }
  }
`;
