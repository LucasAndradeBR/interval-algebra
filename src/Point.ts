import { defaultCompareFunction } from "./DefaultCompareFunction";
import { Interval } from "./Interval";
import { CompareFunctions } from "./types/CompareFunction";


export class Point<t>{
    constructor(public value: t, private compareFunction: CompareFunctions<t> = defaultCompareFunction) {}

    isSmaller(base: Point<t>, compareFunction = this.compareFunction) {
        return compareFunction.smaller(this.value, base.value)
    }
    isEqual(base: Point<t>, compareFunction = this.compareFunction) {
        return compareFunction.equal(this.value, base.value)
    }
    isGreater(base: Point<t>, compareFunction = this.compareFunction) {
        return compareFunction.greater(this.value, base.value)
    }

    isBefore(base: Interval<t>, compareFunction = this.compareFunction) {
        return this.isSmaller(base.start, compareFunction)
    }
    isBaseStart(base: Interval<t>, compareFunction = this.compareFunction) {
        return this.isEqual(base.start, compareFunction)
    }
    isDuring(base: Interval<t>, compareFunction = this.compareFunction) {
        return this.isGreater(base.start, compareFunction) && this.isSmaller(base.end, compareFunction)
    }
    isBaseEnd(base: Interval<t>, compareFunction = this.compareFunction) {
        return this.isEqual(base.end, compareFunction)
    }
    isAfter(base: Interval<t>, compareFunction = this.compareFunction) {
        return this.isGreater(base.end, compareFunction)
    }
}

