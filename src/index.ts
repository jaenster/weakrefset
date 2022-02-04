import {WeakMapExt} from "map-ext";

const wrapInWeakRef = <T extends object>(t: T) => new WeakRef(t);

export class WeakRefSet<T extends object> implements Set<T> {
    readonly #wk = new WeakMapExt<T, WeakRef<T>>(wrapInWeakRef);
    readonly #set: Set<WeakRef<T>>;

    constructor(values?: readonly T[]) {
        this.#set = new Set<WeakRef<T>>();

        if (values) for (const value of values) this.add(value);
    }

    add(value: T): this {
        if (typeof value === 'object' && value) this.#set.add(this.#wk.get(value));
        return this;
    }

    readonly [Symbol.toStringTag]: string;

    get size(): number {
        let i = 0;
        for (const v of this) i++;
        return i;
    }

    * [Symbol.iterator](): IterableIterator<T> {
        for (const weak of this.#set) {
            const deref = weak.deref();
            if (deref) yield deref;
        }
    }

    clear(): void {
        this.#set.clear();
    }

    delete(value: T): boolean {
        if (typeof value === 'object' && value) return this.#set.delete(this.#wk.get(value));
        return false;
    }

    * entries(): IterableIterator<[T, T]> {
        for (const value of this) yield [value, value]
    }

    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
        // first copy all in an array, so adding and deleting within the handler won't effect the for each, like a typical array
        [...this].forEach((v) => callbackfn(v, v, this));
    }

    has(value: T): boolean {
        if (typeof value === 'object' && value) return this.#set.has(this.#wk.get(value));
        return false;
    }

    // no keys in a set, always return value
    * keys(): IterableIterator<T> {
        for (const v of this) yield v;
    }

    * values(): IterableIterator<T> {
        for (const v of this) yield v;
    }

}