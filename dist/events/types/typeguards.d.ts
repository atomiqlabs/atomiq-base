import { SwapData } from "../../swaps/SwapData.js";
import { ChainEvent } from "./ChainEvent.js";
/**
 * Type guard for processed on-chain events
 *
 * Lives in its own module rather than in ChainEvent.ts: it needs to import the subtree guards, and the
 *  subtree base classes extend {@link ChainEvent}, so importing them from ChainEvent.ts would be a
 *  circular import that crashes at load time. ChainEvent itself has no required properties, so the
 *  guard is the union of the guards of its (currently two) subtrees - extend it when a new ChainEvent
 *  subtree is added.
 *
 * @param event
 * @category Events
 */
export declare function isChainEvent<T extends SwapData>(event: unknown): event is ChainEvent<T>;
