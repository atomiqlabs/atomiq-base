/// <reference types="node" />
import { Buffer } from "buffer";
/**
 * A helper for serializing and deserializing bigints from/to buffers
 *
 * @internal
 */
export declare const BigIntBufferUtils: {
    toBuffer: (value: bigint, endianness?: "be" | "le", length?: number) => Buffer;
    fromBuffer: (value: Buffer, endianness?: "be" | "le") => bigint;
};
