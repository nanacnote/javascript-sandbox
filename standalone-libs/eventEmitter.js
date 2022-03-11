/**
 * @author
 * Owusu K
 *
 * Simple event emmiter class for helping to monitor events in a component
 *
 * ---
 *
 * @method `addListner` - registers a listener on the named event along with a callback function
 * ---
 *
 * @method `removeListner`- marks retired callbacks for garbage collection
 * ---
 *
 * @method `emit`- trigger the callbacks associated with a named event
 * ---
 *
 */
export class EventEmitter {
  constructor() {
    this.events = {};
  }

  addListner(name, callback) {
    if (this.events[name]) {
      this.events = { ...this.events, [name]: [...this.events[name], callback] };
    } else {
      this.events = { ...this.events, [name]: [callback] };
    }
  }

  removeListner(name, callback) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter((cb) => cb.name !== callback.name);
    } else {
      console.warn(
        'EventEmmitter instance error!! \n @ removeListner method. \n Absent subscriber action not allowed \n Undefined event can not be set for garbage collection',
      );
    }
  }

  emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => {
        callback(...args);
      });
    } else {
      console.warn(
        'EventEmmitter instance error!! \n @ emit method. \n Absent subscriber action not allowed \n Emmitting events without subscribers is redundant',
      );
    }
  }
}

export const eventBus = new EventEmitter();
