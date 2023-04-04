class Model {
  #observers = [];

  addObserver(observer) {
    this.#observers.push(observer);
    observer.model = this;
  }

  removeObserver(observer) {
    this.#observers.splice(
      this.#observers.findIndex(function (o) {
        return o == observer;
      }),
      1
    );

    observer.model = null;
  }

  #notify() {
    for (const observer of this.#observers) {
      observer.update();
    }
  }
}

class Observer {
  model = null;

  update() {
    console.log("I was notified!");
  }
}
