module.exports = {
  svg: {
    black: `
    <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
    <filter id="black">
    <feColorMatrix
    color-interpolations="sRGB"
    type="matrix"
    values="0.00 0 0 0 0 0 0.00 0 0 0 0 0 0.00 0 0 0 0 0 1 0"/>
    </filter>
    </defs>
    </svg>
    `,
    white: `
    <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
    <filter id="white">
    <feColorMatrix
    color-interpolations="sRGB"
    type="matrix"
    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>
    </filter>
    </defs>
    </svg>
    `,
    'light-gray': `
    <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
    <filter id="light-gray">
    <feColorMatrix
    type="matrix"
    values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 0.25 0"
    />
    </filter>
    </defs>
    </svg>
    `,
    'dark-gray': `
    <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
    <filter id="dark-gray">
    <feColorMatrix
    type="matrix"
    values="0.55 0 0 0 0 0 0.55 0 0 0 0 0 0.55 0 0 0 0 0 1 0"
    />
    </filter>
    </defs>
    </svg>
    `,
    'red-imperial': `
    <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
    <filter id="red-imperial">
    <feColorMatrix
    color-interpolations="sRGB"
    type="matrix"
    values="0.98 0 0 0 0 0 0.14 0 0 0 0 0 0.24 0 0 0 0 0 1 0"/>
    </filter>
    </defs>
    </svg>
  `,
  },
  css: {},
};
