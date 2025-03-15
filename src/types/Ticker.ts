export interface BinanceTicker {
    A: string // Best ask price
    B: string // Best bid price
    C: number // Event timestamp (milliseconds)
    E: number // Event time (milliseconds)
    F: number // First trade ID in event
    L: number // Last trade ID in event
    P: string // 24hr price change percentage
    Q: string // Best ask quantity
    a: string // Last trade price
    b: string // Last trade best bid price
    c: string // Last trade close price
    h: string // Highest price in 24hr
    l: string // Lowest price in 24hr
    n: number // Number of trades in 24hr
    o: string // Open price in 24hr
    q: string // Quote asset volume (total traded volume in USDT)
    s: string // Symbol (e.g., "SYNUSDC")
    v: string // Base asset volume (total traded SYN tokens)
    w: string // Weighted average price over 24hr
    x: string // Last close price
}
