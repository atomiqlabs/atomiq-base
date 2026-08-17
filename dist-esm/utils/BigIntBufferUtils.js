import { Buffer } from "buffer";
/**
 * A helper for serializing and deserializing bigints from/to buffers
 *
 * @internal
 */
export const BigIntBufferUtils = {
    toBuffer: (value, endianness = "be", length = 32) => {
        let values = Array(length);
        for (let i = 0; i < length; i++) {
            values[i] = Number(value & 0xffn);
            value >>= 8n;
        }
        const buff = Buffer.from(values);
        if (endianness === "be")
            buff.reverse();
        return buff;
    },
    fromBuffer: (value, endianness = "be") => {
        if (endianness === "le") {
            const dst = Buffer.alloc(value.length);
            value.copy(dst);
            dst.reverse();
            value = dst;
        }
        let accumulator = 0n;
        for (let byte of value) {
            accumulator <<= 8n;
            accumulator |= BigInt(byte);
        }
        return accumulator;
    }
};
