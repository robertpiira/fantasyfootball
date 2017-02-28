

class Observer {
  constructor() {
    this.handlers = {}
  }

  subscribe(eventName, fn) {
    if (this.handlers[eventName]) {
      this.handlers[eventName] = [...this.handlers[eventName], fn]
    } else {
      this.handlers[eventName] = [fn]
    }
  }

  unsubscribe(fn) {
    const handlers = this.handlers

    for (const eventName in handlers) {
      if (handlers.hasOwnProperty(eventName)) {
        handlers[eventName] = handlers[eventName].filter(handler => handler !== fn)
      }
    }
  }

  _getHandlers() {
    return {...this.handlers}
  }

  publish(eventName, message) {
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach(handler => handler(message))
    }
  }
}

export default Observer
