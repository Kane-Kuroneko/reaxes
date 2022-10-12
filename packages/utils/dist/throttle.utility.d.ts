interface IOptions {
    leading?: boolean;
    trailing?: boolean;
}
export default function throttle(func: any, wait: any, options: IOptions): () => void;
export {};
