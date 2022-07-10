const tap = require("tap");

const obid = require("../");

tap.equal(obid("foo").encode(0n), "JZAYZRRqdPkZ");
tap.equal(obid("foo").encode(1n), "23VRd7mrJkvW");
tap.equal(obid("foo").encode(2n), "a7mQAPvqyPj5");
tap.equal(obid("foo").encode(18446744073709551615n), "rdQEX3rNxYNa");
