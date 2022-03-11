const propertyName = '@extEvent';
const propertyObject = {
  componentName: 'undefined',
};
// TODO:
// implement functionality
// scope
// 1. allow for easy access of needed props
// 2. can also be used for analytics

// create a new Proxy event object
module.exports = (event = undefined, instance = undefined) => {
  if (event) {
    Object.defineProperty(event, propertyName, {
      value: propertyObject,
    });
    // console.log(event.currentTarget.name); // useful for button names
    // console.log('REGISTERED EVENT PENDING LOGIC');
  }
  return event;
};
