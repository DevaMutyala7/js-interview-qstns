Promise.prototype.allSettled = function (promises){
    let promiseFullfilled=0;
    let result=[];
    return new Promise((resolve)=>{
        promises.forEach((promise,index)=>{
            promise.then(val=>{
                promiseFullfilled++;
                result[index]={status:"fulfilled",value:val}
                if(promiseFullfilled===promises.length){
                    resolve(result);
                }
            })
            .catch(err=>{
                promiseFullfilled++;
                result[index]={status:"rejected",reason:err};
                if(promiseFullfilled===promises.length){
                    resolve(result);
                }
            })
        })
    })
}

let promise1 =  new Promise((_, reject) => {
    setTimeout(() => reject('promise 1 rejected'),  3000);
});

let promise2 = new Promise((resolve) => {
    setTimeout(() => resolve('promise 2 resolved'),  2000);
})

let promise3 = new Promise((resolve) => {
    setTimeout(() => resolve('promise 3 resolved'),  2000);
})

Promise.prototype.allSettled([promise1,promise2,promise3]).then(val=> console.log(val));