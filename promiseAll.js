Promise.prototype.myAll = function (promises){
    let settledPromises=[];
    let resolvedPromises = 0;

    return new Promise((resolve,reject)=>{
        promises.forEach((promise,index)=>{
            promise.then(val=>{
                resolvedPromises++;
                settledPromises[index]=val;
                if(resolvedPromises>=promises.length){
                    resolve(settledPromises);
                }
            })
            .catch(err=>reject(err));
        })
    })
}

let promise1 =  new Promise((resolve, reject) => {
    setTimeout(() => reject('promise 1 rejected'),  3000);
});

let promise2 = new Promise((resolve,reject) => {
    setTimeout(() => resolve('promise 2 resolved'),  2000);
})

Promise.prototype.myAll([promise1,promise2]).then(val=> console.log(val))
.catch(err=> console.log("err",err))