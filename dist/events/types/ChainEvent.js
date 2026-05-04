"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainEvent = void 0;
/**
 * Represents a processed on-chain event
 *
 * @category Events
 */
class ChainEvent {
    constructor(contractVersion) {
        this.contractVersion = contractVersion;
    }
}
exports.ChainEvent = ChainEvent;
