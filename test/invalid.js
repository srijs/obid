const tap = require("tap");

const obid = require("../");

tap.equal(obid("foo").decode(undefined), undefined);
tap.equal(obid("foo").decode(null), undefined);
tap.equal(obid("foo").decode(1234), undefined);
tap.equal(obid("foo").decode("#ZA-ZRRqdPkZ"), undefined);
tap.equal(obid("foo").decode("JZAYZRRqdPkZZ"), undefined);
tap.equal(obid("foo").decode("JZAYZRRqdPk"), undefined);
