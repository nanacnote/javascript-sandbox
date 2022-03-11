import styled, {css} from 'styled-components';
import {RadioButtonProps} from '..';

import colors from '@shared/colors';

export default styled.input<Partial<RadioButtonProps>>`
  position: absolute;
  width: 1px;
  height: 1px;
  outline: none;
  opacity: 0;
  transition: all 250ms ease-in;

  :checked + label {
    color: ${colors.hex['red_red_5_dark']};
    border: solid 1px ${colors.hex['functional_colors_light_red']};
    background-color: ${colors.hex['functional_colors_light_red']};
  }

  :hover {
    :not(:checked) + label::before {
      border: solid 1px ${colors.hex.primary1};
    }
  }

  ${({disabled}) =>
    disabled &&
    css`
      :checked + label,
      :not(:checked) + label {
        cursor: not-allowed;
        opacity: 0.4;
      }
    `}
`;
