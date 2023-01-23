import { Interval } from "../Interval"

describe("Interval", () => {
    test("Starts always beore or equal end", () => {
        const intervals = [new Interval(1,2), new Interval(2,1), new Interval(1,1)] 
        intervals.forEach(
            v => v.start.isSmaller(v.end) || v.start.isEqual(v.end)
        )
    })
})