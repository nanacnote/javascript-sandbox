import styled, {css} from 'styled-components';
import {SeparatorProps} from '..';

import colors from '@shared/colors';

export default styled.div<Partial<SeparatorProps>>`
  display: block;
  height: 1px;
  width: 100%;
  background: #f54747;
  background: linear-gradient(
    to right,
    #f54747 20%,
    #faa768 39%,
    #ec86d7 60%,
    #7ec3f5 100%
  );
`;
