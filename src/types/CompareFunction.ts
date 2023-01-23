export interface CompareFunctions<t> {
    smaller(a: t, b: t): boolean,
    equal(a: t, b: t): boolean,
    greater(a: t, b: t): boolean,
}