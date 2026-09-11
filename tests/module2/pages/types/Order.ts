// Define the shape of an order so test data is checked by TypeScript at compile time.
export interface Order {
    ticker: string;
    price: number;
    quantity: number;
    // Restrict `side` to the two allowed literal values rather than any arbitrary string.
    side: 'buy' | 'sell';
}