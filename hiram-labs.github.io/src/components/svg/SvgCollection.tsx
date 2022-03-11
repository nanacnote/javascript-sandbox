import React from 'react';
import * as tailwindConfig from '../../../tailwind.config';

export const curvedSvgBorder = (type?: 'top' | 'bottom') => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      height="100%"
      width="100%"
      fill={tailwindConfig.theme.colors.customBgContrast}
    >
      <path
        d={
          type == 'top'
            ? 'M0,224L80,240C160,256,320,288,480,272C640,256,800,192,960,186.7C1120,181,1280,235,1360,261.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'
            : 'M0,224L80,240C160,256,320,288,480,272C640,256,800,192,960,186.7C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        }
        transform={type == 'top' ? 'translate(0, -150)' : 'translate(0, 40)'}
      ></path>
    </svg>
  );
};

export const zigZagSvgBorder = (type?: 'top' | 'bottom') => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 13"
      preserveAspectRatio="none"
      height="100%"
      width="100%"
      fill={tailwindConfig.theme.colors.customBgContrast}
      // transform={
      //   type === 'top' ? 'translate(-15 -2) rotate(180)' : 'translate(-15 2)'
      // }
    >
      {/* <polyline points="0.7,13.7 13.4,0.8 25.3,12.8 37.2,0.8 49,12.8 60.9,0.8 72.8,12.8 84.7,0.8 96.6,12.8 108.4,0.8 120.3,12.8 132.2,0.8 144,12.8 155.9,0.8 167.7,12.8 179.8,0.7 191.7,12.8 203.6,0.8 215.4,12.8 227.3,0.8 239.2,12.8 251.1,0.8 262.9,12.8 274.8,0.8 286.7,12.8 298.6,0.8 310.4,12.8 322.9,0.8 334.8,12.8 346.7,0.8 358.6,12.8 370.4,0.8 382.9,12.8 394.8,0.8 406.7,12.8 418.6,0.8 430.4,12.8 442.9,0.8 456.8,12.8 468.7,0.8 480.6,12.8 492.4,0.8 504.9,12.8 516.8,0.8 528.7,12.8 540.6,0.8 552.4,12.8 564.9,0.8 576.8,12.8 588.7,0.8 600.6,12.8"></polyline> */}
      <path
        d={
          type === 'top'
            ? 'M.7.7,13.4,13.6l11.9-12,11.9,12L49,1.6l11.9,12,11.9-12,11.9,12,11.9-12,11.8,12,11.9-12,11.9,12L144,1.6l11.9,12,11.8-12,12.1,12.1L191.7,1.6l11.9,12,11.8-12,11.9,12,11.9-12,11.9,12,11.8-12,11.9,12,11.9-12,11.9,12,11.8-12,12.5,12,11.9-12,11.9,12,11.9-12,11.8,12,12.5-12,11.9,12,11.9-12,11.9,12,11.8-12,12.5,12,13.9-12,11.9,12,11.9-12,11.8,12,12.5-12,11.9,12,11.9-12,11.9,12,11.8-12,12.5,12,11.9-12,11.9,12,11.9-12'
            : 'M.7,13.7,13.4.8l11.9,12L37.2.8,49,12.8,60.9.8l11.9,12L84.7.8l11.9,12L108.4.8l11.9,12L132.2.8l11.8,12L155.9.8l11.8,12L179.8.7l11.9,12.1L203.6.8l11.8,12L227.3.8l11.9,12L251.1.8l11.8,12L274.8.8l11.9,12L298.6.8l11.8,12L322.9.8l11.9,12L346.7.8l11.9,12L370.4.8l12.5,12L394.8.8l11.9,12L418.6.8l11.8,12L442.9.8l13.9,12L468.7.8l11.9,12L492.4.8l12.5,12L516.8.8l11.9,12L540.6.8l11.8,12L564.9.8l11.9,12L588.7.8l11.9,12'
        }
        transform={
          type === 'top' ? 'translate(-7 -1.75)' : 'translate(-7 0.75)'
        }
      />
    </svg>
  );
};