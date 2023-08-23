const a = () => {
  console.log("a");
  const i = setImmediate(() => {
    console.log("i");
  });
  const t = setInterval(() => {
    console.log("b");
    clearInterval(t);
  }, 0.000011);
  console.log("c");
};

a();
