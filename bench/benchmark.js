const Benchmark = require("benchmark");

const obid = require("../");

const suite = new Benchmark.Suite();

suite.add("encode", () => {
  return obid("foo").encode(0n);
});

suite.add("decode", () => {
  return obid("foo").decode("JZAYZRRqdPkZ");
});

suite.on("cycle", (event) => {
  console.log(event.target.toString());
});

suite.run();
