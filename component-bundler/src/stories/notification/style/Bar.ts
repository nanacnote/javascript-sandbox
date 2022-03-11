import styled, {css} from 'styled-components';
import {NotificationProps} from '..';

import colors from '@shared/colors';

const dict: {[key in NotificationProps['variant']]: string} = {
  black: colors.hex.black,
  gray: colors.hex.gray3,
  gradient: 'transparent',
  rounded: 'transparent',
};

export default styled.div<Partial<NotificationProps>>`
  position: relative;
  display: inline-flex;
  flex-wrap: nowrap;
  border-radius: 3px;
  min-width: min(300px, 90vw);
  padding: 0.65rem;
  box-shadow: 0 2px 10px 0 rgba(50, 50, 50, 0.32),
    0 2px 3px 0 rgba(50, 50, 50, 0.12);
  color: ${colors.hex.white};
  background-color: ${({variant}) => dict[variant]};
  transition: all 250ms ease-in;

  ${({variant}) =>
    variant === 'gradient' &&
    css`
      background-image: linear-gradient(
        135deg,
        #f54747 2%,
        #faa768 25%,
        #ec86d7 51%,
        #7ec3f5 100%
      );
    `}

  ${({variant}) =>
    variant === 'rounded' &&
    css`
      border-radius: 7.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background-image: linear-gradient(
        135deg,
        #f54747 2%,
        #fc7445 100%,
        #fc9c50 100%
      );
    `}

  ${({variant}) =>
    variant === 'gray' &&
    css`
      color: ${colors.hex.black};
    `}
`;
