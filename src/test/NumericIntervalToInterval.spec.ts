import Interval from "../Interval"

export function randomBetween(min: number, max: number) { // max excluded
    return Math.floor(Math.random() * (max - min) + min)
}

// Test Start functions
describe("Interval starts* functions", () => {
    const BEFORE_BASE = 0
    const BASE_START = 10
    const DURING_BASE = 15
    const BASE_END = 20
    const AFTER_BASE = 30

    const base = new Interval(BASE_START, BASE_END)

    const intervals = {
        startsBefore: new Interval(BEFORE_BASE, AFTER_BASE),
        startsTogether: new Interval(BASE_START, AFTER_BASE),
        startsDuring: new Interval(DURING_BASE, AFTER_BASE),
        startsJustAfter: new Interval(BASE_END, AFTER_BASE),
        startsAfter: new Interval(AFTER_BASE - 1, AFTER_BASE),
    }

    const intervalsKeys: (keyof typeof intervals)[] = [
        "startsAfter",
        "startsBefore",
        "startsDuring",
        "startsJustAfter",
        "startsTogether"
    ]

    intervalsKeys.map(key => {
        for (const intervalsKey of intervalsKeys) {
            test(`${key} ${intervalsKey}`, () => {
                if (intervalsKey == key) {
                    expect(intervals[key][intervalsKey](base)).toBeTruthy()
                } else {
                    expect(intervals[key][intervalsKey](base)).toBeFalsy()
                }
            })
        }
    })
})


// Test Ends functions
describe("Interval ends* functions", () => {
    const BEFORE_BASE = 0
    const BASE_START = 10
    const DURING_BASE = 15
    const BASE_END = 20
    const AFTER_BASE = 30
    const base = new Interval(BASE_START, BASE_END)
    const intervals = {
        endsBefore: new Interval(BEFORE_BASE, BEFORE_BASE + 1),
        endsJustBefore: new Interval(BEFORE_BASE, BASE_START),
        endsDuring: new Interval(BEFORE_BASE, DURING_BASE),
        endsTogether: new Interval(BEFORE_BASE, BASE_END),
        endsAfter: new Interval(BEFORE_BASE, AFTER_BASE),
    }

    const intervalsKeys: (keyof typeof intervals)[] = [
        "endsBefore",
        "endsJustBefore",
        "endsDuring",
        "endsTogether",
        "endsAfter"
    ]

    intervalsKeys.map(key => {
        for (const intervalsKey of intervalsKeys) {
            test(`${key} ${intervalsKey}`, () => {
                if (intervalsKey == key) {
                    expect(intervals[key][intervalsKey](base)).toBeTruthy()
                } else {
                    expect(intervals[key][intervalsKey](base)).toBeFalsy()
                }
            })
        }
    })
})

describe("Interval relations", () => {
    const BEFORE_BASE = 0
    const BASE_START = 10
    const DURING_BASE = 15
    const BASE_END = 20
    const AFTER_BASE = 30
    const base = new Interval(BASE_START, BASE_END)

    const intervals = {
        precedes: new Interval(BEFORE_BASE, randomBetween(BEFORE_BASE, BASE_START)), // starts before, ends before : precedes
        isPrecededBy: new Interval(randomBetween(BASE_END+1, AFTER_BASE), AFTER_BASE), // starts after, ends on after : is preceded
        meets: new Interval(BEFORE_BASE, BASE_START), // starts before, ends on start : meets
        isMetBy: new Interval(BASE_END, AFTER_BASE), // starts on end, ends on after : is met
        overlaps: new Interval(BEFORE_BASE, randomBetween(BASE_START + 1, BASE_END)), // starts before, ends during : overlap
        isOverlapedBy: new Interval(randomBetween(BASE_START + 1, BASE_END), AFTER_BASE), // starts during, ends on after : is overlaped
        starts: new Interval(BASE_START, randomBetween(BASE_START + 1, BASE_END)), // starts together, ends during : starts
        isStartedBy: new Interval(BASE_START, AFTER_BASE), // starts together, ends on after : is started
        contains: new Interval(BEFORE_BASE, AFTER_BASE), // starts before, ends after : contains
        isContainedBy: new Interval(randomBetween(BASE_START + 1, DURING_BASE), randomBetween(DURING_BASE, BASE_END)), // starts during, ends during : is contained
        finishes: new Interval(randomBetween(BASE_START + 1, BASE_END), BASE_END), // starts during, ends together : finishes
        isFinishedBy: new Interval(BEFORE_BASE, BASE_END), // starts before, ends together : is finished
        equals: new Interval(BASE_START, BASE_END), // starts together, ends together : equals
    }

    const intervalsKeys: (keyof typeof intervals)[] = [
        "precedes",
        "meets",
        "overlaps",
        "isFinishedBy",
        "contains",
        "starts",
        "equals",
        "isStartedBy",
        "isContainedBy",
        "finishes",
        "isOverlapedBy",
        "isMetBy",
        "isPrecededBy",
    ]

    intervalsKeys.map(key => {
        for (const intervalsKey of intervalsKeys) {
            test(`${key} ${intervalsKey}`, () => {
                if (intervalsKey == key) {
                    expect(intervals[key][intervalsKey](base)).toBeTruthy()
                } else {
                    expect(intervals[key][intervalsKey](base)).toBeFalsy()
                }
            })
        }
    })
})
