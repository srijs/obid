const tap = require("tap");
const fc = require("fast-check");

const obid = require("..");

fc.assert(
  fc.property(fc.string(), fc.bigUintN(64), (ty, id) => {
    const o = obid(ty);
    tap.equal(o.decode(o.encode(id)), id);
  })
);
