/**
 * Type of the logger
 *
 * @internal
 */
export type LoggerType = {
    debug: (msg: string, ...args: any[]) => void;
    info: (msg: string, ...args: any[]) => void;
    warn: (msg: string, ...args: any[]) => void;
    error: (msg: string, ...args: any[]) => void;
};
/**
 * Getter function to create a logger instance
 *
 * @internal
 */
export declare function getLogger(prefix: string): LoggerType;
