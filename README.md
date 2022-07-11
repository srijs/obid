# `obid`

[![npm](https://img.shields.io/npm/v/obid)](https://www.npmjs.com/package/obid)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/obid)](https://bundlephobia.com/package/obid)
[![NPM](https://img.shields.io/npm/l/obid)](https://github.com/srijs/obid/blob/main/LICENSE)

## Summary

`obid` provides a way to encode 64-bit integers (via `bigint`) into 12-character alphanumeric ids which are URL-safe and designed to minimize accidental profanity as well as errors when copied manually.

It allows you to expose opaque, non-sequential identifiers in your APIs and URLs, while using compact 64-bit keys for your internal data models which can improve the efficiency and performance of your database queries.

## Installation

```
yarn add obid
```

```
npm install --save obid
```

## Features

- Generates non-sequential, fixed-length IDs
- Supports salting for even more obscurity
- Minimizes profanity in generated IDs
- Avoids optically similar characters for fewer typos
- Double-clickable IDs for easy copy-and-paste
- Zero-dependencies and fast encoding/decoding performance

## API

### `obid(type: string): ObjectId`

Creates a new Object ID codec using `type` as the salt.

### `ObjectId.encode(id: bigint): string`

Encodes the given 64-bit integer into a 12-character alphanumeric string.

### `ObjectId.decode(id: string): bigint | undefined`

Decodes the given string into a 64-bit integer. Returns `undefined` when the string an invalid format.

## Usage Example

```js
import obid from "obid";

const { encode, decode } = obid("user");

async function getUserById(id) {
  const row = await db.query("select * from users where id = ?", [decode(id)]);

  return { id: encode(row.id) };
}
```

## Contributing

Pull requests for new features, bug fixes, and suggestions are welcome! Please
create an issue for discussion before working on a substantial change.

## License

[MIT](https://github.com/srijs/obid/blob/main/LICENSE)
