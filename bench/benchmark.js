const Benchmark = require("benchmark");

const obid = require("../");
const obidFoo = obid("foo");

const suite = new Benchmark.Suite();

suite.add("encode", () => {
  return obidFoo.encode(0n);
});

suite.add("decode", () => {
  return obidFoo.decode("JZAYZRRqdPkZ");
});

suite.on("cycle", (event) => {
  console.log(event.target.toString());
});

suite.run();
