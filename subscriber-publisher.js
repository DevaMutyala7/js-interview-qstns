class Events {
  constructor() {
    this.subscribers = {};
    this.subscribeOnceList = {};
    this.subscribeOnceAsyncList = {};
  }

  subscribe = function (name, fn) {
    if(this.subscribers[name]){
        this.subscribers[name].push(fn);
    }
    else{
        this.subscribers[name] = [fn];
    }

    return () => {
      if(this.subscribers[name]){
        const index = this.subscribers[name].indexOf(fn);
        this.subscribers[name].splice(index,1);
      }
    };
  };

  subscribeOnce = function (name,fn){
    if(this.subscribeOnceList[name]){
        let existingCb = this.subscribeOnceList[name];
        this.subscribeOnceList[name].push([...existingCb,fn]);
    }
    else{
        this.subscribeOnceList[name] = [fn];
    }
  }

  subscribeOnceAsync = function(name){
    return new Promise((resolve,reject)=>{
      if(this.subscribeOnceAsyncList[name]){
        this.subscribeOnceAsyncList[name].push(resolve);
      }
      else{
        this.subscribeOnceAsyncList[name] = [resolve];
      }
    })
  }

  publish = function (name, data) {
    let subscribedlist = this.subscribers[name] || [];

    subscribedlist.forEach(sub=>sub(data));

    let subscribeOnceCbs = this.subscribeOnceList[name] || [];

    subscribeOnceCbs.forEach((cbs)=> cbs(data))

    this.subscribeOnceList[name] = [];

    let subscribeOnceAsyncCbs = this.subscribeOnceAsyncList[name] || [];

    subscribeOnceAsyncCbs.forEach(promise=> promise(data));

    this.subscribeOnceAsyncList[name] = [];

  }

  publishAll = function (data){
    this.subscribers.forEach(sub=> sub(data));
  }
}

const myEvent = new Events();


let unsubscribe1 = myEvent.subscribe("click", (data) =>
  console.log("clicked 1", data)
);

let unsubscribe2 = myEvent.subscribe("click", (data) =>
  console.log("clicked 2", data)
);

unsubscribe1();

myEvent.subscribeOnce( "dbClick" , ()=>console.log('Double Clicked') );

myEvent.subscribeOnceAsync("click").then((payload)=>console.log("i'm invoked",payload));


myEvent.publish("click", 2); // clicked
myEvent.publish( "dbClick","db");// Double Clicked

