export function enumerateRange(start: number, count: number): number[] {
    return new Array(count).fill(0).map((_, i) => start + i);
}

export function except<T>(x: readonly T[], y: readonly T[]): T[] {
    return x.filter(item => !y.includes(item));
}

export function sumArray(arr: readonly number[]): number {
    return arr.reduce((s, n) => s + n, 0);
}

export function hasDuplicated<T>(arr: readonly T[]): boolean {
    for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[i] === arr[j]) {
                return true;
            }
        }
    }
    return false;
}

export function toPercent(value: number): string {
    return `${Math.round(value * 100)}%`;
}

export function localStorageIsAvailable(): boolean {
    try {
        const x = '__storage_test__';
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (localStorage && localStorage.length !== 0);
    }
}