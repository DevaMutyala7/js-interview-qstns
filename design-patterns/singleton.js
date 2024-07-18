const Singleton = (function () {
  let instance = null;

  function createInstance() {
    let obj = new Object("I'm the instance");
    return obj;
  }

  function getInstance() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  }

  return {
    getInstance,
  };
})();

const pM1 = Singleton.getInstance();
const pM2 = Singleton.getInstance();

console.log(pM1 === pM2);
