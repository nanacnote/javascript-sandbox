exports.module = {
  db: {
    json() {
      delete this.json;
      return Promise.resolve(this);
    },
  },
};
