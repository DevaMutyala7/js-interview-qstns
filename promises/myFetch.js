function myFetch(url,config){
    return new Promise((res,rej)=>{
        let httpReq = new XMLHttpRequest();

        httpReq.open(config?.method||"GET",url);

        httpReq.send("");

        httpReq.onload = () => {
            if(httpReq.readyState === httpReq.DONE){
                if(httpReq.status == 200){
                    res(httpReq.response);
                }
            }
        }
    })

}

myFetch("https://dummyjson.com/users")
.then(val=> console.log("val",val))
.finally(()=> console.log("finalyyy"))