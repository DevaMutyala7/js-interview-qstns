Promise.prototype.myFinally = function (callback) {
    if(typeof callback !== "function"){
        return Promise.then();
    }

    return this.then(
        value => Promise.resolve(callback()).then(()=>value),
        err => Promise.reject(callback()).then(() => {throw err})
    )
}
  
let promise1 = new Promise((resolve, reject) => {
setTimeout(() => resolve("promise 1 rejected"), 300);
});


promise1
.then((val) => console.log(val))
.catch((err) => console.log("err", err))
.myFinally(()=>console.log("finally"))
  