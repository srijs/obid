declare namespace objectId {
  interface ObjectId {
    decode(id: any): bigint | undefined;
    encode(id: bigint): string;
  }
}

declare function objectId(type: string): objectId.ObjectId;
export = objectId;
