import { Point } from '../Point'
import { Interval } from '../Interval'
import { CompareFunctions } from '../types/CompareFunction'

describe("Numeric point and interval", () => {
    const p1 = new Point(0)
    const p2 = new Point(10)
    const p3 = new Point(15)
    const p4 = new Point(20)
    const p5 = new Point(30)
    const i = new Interval(10, 20)

    test("Is before", () => {
        expect(p1.isBefore(i)).toBe(true)
        expect(p2.isBefore(i)).toBe(false)
        expect(p3.isBefore(i)).toBe(false)
        expect(p4.isBefore(i)).toBe(false)
        expect(p5.isBefore(i)).toBe(false)
    })
    test("Is base start", () => {
        expect(p1.isBaseStart(i)).toBe(false)
        expect(p2.isBaseStart(i)).toBe(true)
        expect(p3.isBaseStart(i)).toBe(false)
        expect(p4.isBaseStart(i)).toBe(false)
        expect(p5.isBaseStart(i)).toBe(false)
    })
    test("Is during", () => {
        expect(p1.isDuring(i)).toBe(false)
        expect(p2.isDuring(i)).toBe(false)
        expect(p3.isDuring(i)).toBe(true)
        expect(p4.isDuring(i)).toBe(false)
        expect(p5.isDuring(i)).toBe(false)
    })
    test("Is base end", () => {
        expect(p1.isBaseEnd(i)).toBe(false)
        expect(p2.isBaseEnd(i)).toBe(false)
        expect(p3.isBaseEnd(i)).toBe(false)
        expect(p4.isBaseEnd(i)).toBe(true)
        expect(p5.isBaseEnd(i)).toBe(false)
    })
    test("Is after", () => {
        expect(p1.isAfter(i)).toBe(false)
        expect(p2.isAfter(i)).toBe(false)
        expect(p3.isAfter(i)).toBe(false)
        expect(p4.isAfter(i)).toBe(false)
        expect(p5.isAfter(i)).toBe(true)
    })
})

describe("String point and interval", () => {
    const p1 = new Point("a")
    const p2 = new Point("c")
    const p3 = new Point("d")
    const p4 = new Point("e")
    const p5 = new Point("g")
    const i = new Interval("c", "e")

    test("Is before", () => {
        expect(p1.isBefore(i)).toBe(true)
        expect(p2.isBefore(i)).toBe(false)
        expect(p3.isBefore(i)).toBe(false)
        expect(p4.isBefore(i)).toBe(false)
        expect(p5.isBefore(i)).toBe(false)
    })
    test("Is base start", () => {
        expect(p1.isBaseStart(i)).toBe(false)
        expect(p2.isBaseStart(i)).toBe(true)
        expect(p3.isBaseStart(i)).toBe(false)
        expect(p4.isBaseStart(i)).toBe(false)
        expect(p5.isBaseStart(i)).toBe(false)
    })
    test("Is during", () => {
        expect(p1.isDuring(i)).toBe(false)
        expect(p2.isDuring(i)).toBe(false)
        expect(p3.isDuring(i)).toBe(true)
        expect(p4.isDuring(i)).toBe(false)
        expect(p5.isDuring(i)).toBe(false)
    })
    test("Is base end", () => {
        expect(p1.isBaseEnd(i)).toBe(false)
        expect(p2.isBaseEnd(i)).toBe(false)
        expect(p3.isBaseEnd(i)).toBe(false)
        expect(p4.isBaseEnd(i)).toBe(true)
        expect(p5.isBaseEnd(i)).toBe(false)
    })
    test("Is after", () => {
        expect(p1.isAfter(i)).toBe(false)
        expect(p2.isAfter(i)).toBe(false)
        expect(p3.isAfter(i)).toBe(false)
        expect(p4.isAfter(i)).toBe(false)
        expect(p5.isAfter(i)).toBe(true)
    })
})

describe("Custom comparation function point and interval", () => {
    const dateComparation: CompareFunctions<Date> = {
        equal(a, b) {
            return a.getTime() == b.getTime()
        },
        greater(a, b) {
            return a.getTime() > b.getTime()
        },
        smaller(a, b) {
            return a.getTime() < b.getTime()
        },
    }

    const p1 = new Point(new Date(1), dateComparation)
    const p2 = new Point(new Date(2), dateComparation)
    const p3 = new Point(new Date(3), dateComparation)
    const p4 = new Point(new Date(4), dateComparation)
    const p5 = new Point(new Date(5), dateComparation)
    const i = new Interval(new Date(2), new Date(4))

    test("Is before", () => {
        expect(p1.isBefore(i)).toBe(true)
        expect(p2.isBefore(i)).toBe(false)
        expect(p3.isBefore(i)).toBe(false)
        expect(p4.isBefore(i)).toBe(false)
        expect(p5.isBefore(i)).toBe(false)
    })
    test("Is base start", () => {
        expect(p1.isBaseStart(i)).toBe(false)
        expect(p2.isBaseStart(i)).toBe(true)
        expect(p3.isBaseStart(i)).toBe(false)
        expect(p4.isBaseStart(i)).toBe(false)
        expect(p5.isBaseStart(i)).toBe(false)
    })
    test("Is during", () => {
        expect(p1.isDuring(i)).toBe(false)
        expect(p2.isDuring(i)).toBe(false)
        expect(p3.isDuring(i)).toBe(true)
        expect(p4.isDuring(i)).toBe(false)
        expect(p5.isDuring(i)).toBe(false)
    })
    test("Is base end", () => {
        expect(p1.isBaseEnd(i)).toBe(false)
        expect(p2.isBaseEnd(i)).toBe(false)
        expect(p3.isBaseEnd(i)).toBe(false)
        expect(p4.isBaseEnd(i)).toBe(true)
        expect(p5.isBaseEnd(i)).toBe(false)
    })
    test("Is after", () => {
        expect(p1.isAfter(i)).toBe(false)
        expect(p2.isAfter(i)).toBe(false)
        expect(p3.isAfter(i)).toBe(false)
        expect(p4.isAfter(i)).toBe(false)
        expect(p5.isAfter(i)).toBe(true)
    })
})

describe("Custom comparation function point and interval", () => {
    const aCompare: CompareFunctions<{ a: number, b: number }> = {
        equal: (a, b) => a.a == b.a,
        greater: (a, b) => a.a > b.a,
        smaller: (a, b) => a.a < b.a,
    }
    const bCompare: CompareFunctions<{ a: number, b: number }> = {
        equal: (a, b) => a.b == b.b,
        greater: (a, b) => a.b > b.b,
        smaller: (a, b) => a.b < b.b,
    }
    const p1 = new Point({ a: 1, b: 5 }, aCompare)
    const p2 = new Point({ a: 2, b: 4 }, aCompare)
    const p3 = new Point({ a: 3, b: 3 }, aCompare)
    const p4 = new Point({ a: 4, b: 2 }, aCompare)
    const p5 = new Point({ a: 5, b: 1 }, aCompare)
    const i = new Interval({ a: 2, b: 2 }, { a: 4, b: 4 })

    test("Is before", () => {
        expect(p1.isBefore(i)).toBe(true)
        expect(p2.isBefore(i)).toBe(false)
        expect(p3.isBefore(i)).toBe(false)
        expect(p4.isBefore(i)).toBe(false)
        expect(p5.isBefore(i)).toBe(false)

        expect(p1.isBefore(i, bCompare)).toBe(false)
        expect(p2.isBefore(i, bCompare)).toBe(false)
        expect(p3.isBefore(i, bCompare)).toBe(false)
        expect(p4.isBefore(i, bCompare)).toBe(false)
        expect(p5.isBefore(i, bCompare)).toBe(true)
    })
    test("Is base start", () => {
        expect(p1.isBaseStart(i)).toBe(false)
        expect(p2.isBaseStart(i)).toBe(true)
        expect(p3.isBaseStart(i)).toBe(false)
        expect(p4.isBaseStart(i)).toBe(false)
        expect(p5.isBaseStart(i)).toBe(false)

        expect(p1.isBaseStart(i, bCompare)).toBe(false)
        expect(p2.isBaseStart(i, bCompare)).toBe(false)
        expect(p3.isBaseStart(i, bCompare)).toBe(false)
        expect(p4.isBaseStart(i, bCompare)).toBe(true)
        expect(p5.isBaseStart(i, bCompare)).toBe(false)
    })
    test("Is during", () => {
        expect(p1.isDuring(i)).toBe(false)
        expect(p2.isDuring(i)).toBe(false)
        expect(p3.isDuring(i)).toBe(true)
        expect(p4.isDuring(i)).toBe(false)
        expect(p5.isDuring(i)).toBe(false)
        
        expect(p1.isDuring(i, bCompare)).toBe(false)
        expect(p2.isDuring(i, bCompare)).toBe(false)
        expect(p3.isDuring(i, bCompare)).toBe(true)
        expect(p4.isDuring(i, bCompare)).toBe(false)
        expect(p5.isDuring(i, bCompare)).toBe(false)
    })
    test("Is base end", () => {
        expect(p1.isBaseEnd(i)).toBe(false)
        expect(p2.isBaseEnd(i)).toBe(false)
        expect(p3.isBaseEnd(i)).toBe(false)
        expect(p4.isBaseEnd(i)).toBe(true)
        expect(p5.isBaseEnd(i)).toBe(false)
        
        expect(p1.isBaseEnd(i, bCompare)).toBe(false)
        expect(p2.isBaseEnd(i, bCompare)).toBe(true)
        expect(p3.isBaseEnd(i, bCompare)).toBe(false)
        expect(p4.isBaseEnd(i, bCompare)).toBe(false)
        expect(p5.isBaseEnd(i, bCompare)).toBe(false)
    })
    test("Is after", () => {
        expect(p1.isAfter(i)).toBe(false)
        expect(p2.isAfter(i)).toBe(false)
        expect(p3.isAfter(i)).toBe(false)
        expect(p4.isAfter(i)).toBe(false)
        expect(p5.isAfter(i)).toBe(true)
        
        expect(p1.isAfter(i, bCompare)).toBe(true)
        expect(p2.isAfter(i, bCompare)).toBe(false)
        expect(p3.isAfter(i, bCompare)).toBe(false)
        expect(p4.isAfter(i, bCompare)).toBe(false)
        expect(p5.isAfter(i, bCompare)).toBe(false)
    })
})