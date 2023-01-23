import { Point } from "./Point"
import { CompareFunctions } from "./types/CompareFunction"

const DateCompareFunction: CompareFunctions<Date> = {
    smaller: (a, b) => a.getTime() < b.getTime(), // Returns true if a is strictly smaller than b
    equal: (a, b) => a.getTime() == b.getTime(), // Returns true if a is equal b
    greater: (a, b) => a.getTime() > b.getTime(), // Returns true if a is strictly greater than b
}
// const p1Date = new Point (new Date(100)) // Point<Date>
// const p2Date = new Point (new Date(100)) // Point<Date>


// With Dates
const p1Date = new Point(new Date(100), DateCompareFunction) // Point<Date>
const p2Date = new Point(new Date(100)) // Point<Date>
const p3Date = new Point(new Date(200)) // Point<Date>
console.log(p1Date.isSmaller(p3Date)) // true
console.log(p3Date.isGreater(p1Date)) // true
console.log(p2Date.isEqual(p1Date)) // false[1]
console.log(p1Date.isEqual(p2Date, DateCompareFunction)) // true