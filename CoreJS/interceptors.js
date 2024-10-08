const originalFetch = fetch;

window.fetch = async (...args) => {
  const reqArgs = requestInterceptor(args);

  return originalFetch(reqArgs).then((res) => responseInterceptor(res));
};

window.requestInterceptor = (args) => {
  return args[0] + 2;
};

window.responseInterceptor = (res) => {
  return res.json();
};

fetch("https://jsonplaceholder.typicode.com/todos/").then((json) =>
  console.log(json)
);
