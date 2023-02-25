export function random(min: number = 0, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function C(k: number, n: number) { //todo
    return fact(n) / (fact(k) * fact(n - k));
}

export function fact(n: number): number { //todo
    return (n !== 1) ? n * fact(n - 1) : 1;
}