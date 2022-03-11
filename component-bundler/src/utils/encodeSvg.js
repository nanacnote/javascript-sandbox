const filters = require('@shared/filter');

module.exports = filterName => {
  const filter = filters.css[filterName] || filters.svg[filterName];

  if (filter) {
    const prefix = 'data:image/svg+xml,';
    const result = encodeURIComponent(filter);

    return `${prefix}${result}#${filterName}`;
  } else {
    return '';
  }
};
