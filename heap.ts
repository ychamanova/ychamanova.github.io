class Heap<T> {
    data: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {}

    size(): number {
        return this.data.length;
    }

    peek(): T | undefined {
        return this.data[0];
    }

    push(value: T): void {
        this.data.push(value);
        let i = this.size() - 1;

        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.compare(this.data[i], this.data[p]) >= 0) break;
            this.swap(i, p);
            i = p;
        }
    }

    pop(): T | undefined {
        if (!this.size()) return undefined;

        const top = this.data[0];
        const last = this.data.pop()!;
        if (!this.size()) return top;

        this.data[0] = last;
        let i = 0;

        while (true) {
            let best = i;
            const left = 2 * i + 1;
            const right = left + 1;

            if (left < this.size() &&
                this.compare(this.data[left], this.data[best]) < 0) {
                best = left;
            }
            if (right < this.size() &&
                this.compare(this.data[right], this.data[best]) < 0) {
                best = right;
            }
            if (best === i) break;

            this.swap(i, best);
            i = best;
        }

        return top;
    }

    private swap(i: number, j: number): void {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
}
