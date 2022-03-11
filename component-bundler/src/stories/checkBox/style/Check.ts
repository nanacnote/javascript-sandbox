import styled, {css} from 'styled-components';
import {CheckBoxProps} from '..';

import colors from '@shared/colors';

export default styled.input<Partial<CheckBoxProps>>`
  position: absolute;
  align-self: center;
  left: 0.25rem;
  width: 1px;
  height: 1px;
  outline: none;
  opacity: 0;
  transition: all 250ms ease-in;

  :checked + label::before {
    border: none;
    background-color: ${colors.hex.primary1};
  }

  :checked + label::after {
    opacity: 1;
    border-style: solid;
    border-color: white;
    border-width: 0 0.2rem 0.2rem 0;
    transform: scale(1) rotate(45deg);
  }

  :not(:checked) + label::after {
    opacity: 0;
    transform: scale(0);
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

        ::before {
          border: none;
          background: ${colors.hex.gray3};
        }
        ::after {
          border: none;
          background: ${colors.hex.gray3};
        }
      }

      :hover {
        :checked + label,
        :not(:checked) + label::before {
          border: none;
        }
      }
    `}
`;
