export function random(min: number = 0, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
