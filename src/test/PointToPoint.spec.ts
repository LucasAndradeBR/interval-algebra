import Point from '../Point'
import { CompareFunctions } from '../types/CompareFunction'

describe("Numeric point", () => {

    const p1 = new Point(2)
    const p2 = new Point(1)
    const p3 = new Point(2)
    const p4 = new Point(3)
    test("smaller than other point", () => {
        expect(p1.isSmaller(p2)).toBe(false)
        expect(p1.isSmaller(p3)).toBe(false)
        expect(p1.isSmaller(p4)).toBe(true)
    })
    test("equal other point", () => {
        expect(p1.isEqual(p2)).toBe(false)
        expect(p1.isEqual(p3)).toBe(true)
        expect(p1.isEqual(p4)).toBe(false)
    })
    test("greater then other point", () => {
        expect(p1.isGreater(p2)).toBe(true)
        expect(p1.isGreater(p3)).toBe(false)
        expect(p1.isGreater(p4)).toBe(false)
    })
})

describe("String point", () => {

    const p1 = new Point("b")
    const p2 = new Point("a")
    const p3 = new Point("b")
    const p4 = new Point("c")
    test("smaller than other point", () => {
        expect(p1.isSmaller(p2)).toBe(false)
        expect(p1.isSmaller(p3)).toBe(false)
        expect(p1.isSmaller(p4)).toBe(true)
    })
    test("equal other point", () => {
        expect(p1.isEqual(p2)).toBe(false)
        expect(p1.isEqual(p3)).toBe(true)
        expect(p1.isEqual(p4)).toBe(false)
    })
    test("greater then other point", () => {
        expect(p1.isGreater(p2)).toBe(true)
        expect(p1.isGreater(p3)).toBe(false)
        expect(p1.isGreater(p4)).toBe(false)
    })
})

describe("Custom comparation function", () => {
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
    const p1 = new Point(new Date(2), dateComparation)
    const p2 = new Point(new Date(1))
    const p3 = new Point(new Date(2))
    const p4 = new Point(new Date(3))
    test("smaller than other point", () => {
        expect(p1.isSmaller(p2)).toBe(false)
        expect(p1.isSmaller(p3)).toBe(false)
        expect(p1.isSmaller(p4)).toBe(true)
    })
    test("equal other point", () => {
        expect(p1.isEqual(p2)).toBe(false)
        expect(p1.isEqual(p3)).toBe(true)
        expect(p1.isEqual(p4)).toBe(false)
    })
    test("greater then other point", () => {
        expect(p1.isGreater(p2)).toBe(true)
        expect(p1.isGreater(p3)).toBe(false)
        expect(p1.isGreater(p4)).toBe(false)
    })
})

describe("Variable custom comparation function", () => {
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
    const p1 = new Point({ a: 2, b: 2 }, aCompare)
    const p2 = new Point({ a: 1, b: 3 })
    const p3 = new Point({ a: 3, b: 1 })
    const p4 = new Point({ a: 2, b: 2 })
    test("smaller than other point", () => {
        expect(p1.isSmaller(p2)).toBe(false)
        expect(p1.isSmaller(p3)).toBe(true)
        expect(p1.isSmaller(p4)).toBe(false)
        expect(p1.isSmaller(p2, bCompare)).toBe(true)
        expect(p1.isSmaller(p3, bCompare)).toBe(false)
        expect(p1.isSmaller(p4, bCompare)).toBe(false)
    })
    test("equal other point", () => {
        expect(p1.isEqual(p2)).toBe(false)
        expect(p1.isEqual(p3)).toBe(false)
        expect(p1.isEqual(p4)).toBe(true)
        expect(p1.isEqual(p2, bCompare)).toBe(false)
        expect(p1.isEqual(p3, bCompare)).toBe(false)
        expect(p1.isEqual(p4, bCompare)).toBe(true)
    })
    test("greater then other point", () => {
        expect(p1.isGreater(p2)).toBe(true)
        expect(p1.isGreater(p3)).toBe(false)
        expect(p1.isGreater(p4)).toBe(false)
        expect(p1.isGreater(p2, bCompare)).toBe(false)
        expect(p1.isGreater(p3, bCompare)).toBe(true)
        expect(p1.isGreater(p4, bCompare)).toBe(false)
    })
})