import { defaultCompareFunction } from "./DefaultCompareFunction"
import { Point } from "./Point"
import { CompareFunctions } from "./types/CompareFunction"

export class Interval<t>{
    public start: Point<t>
    public end: Point<t>
    public reverse: boolean = false

    constructor(start: t, end: t, private compareFunction: CompareFunctions<t> = defaultCompareFunction) {
        if (compareFunction.smaller(end, start)) {
            this.start = new Point(end, compareFunction)
            this.end = new Point(start, compareFunction)
            this.reverse = true
        } else {
            this.start = new Point(start, compareFunction)
            this.end = new Point(end, compareFunction)
        }
    }

    // Start Point Comparison

    /**
     * Check if the Target Interval (caller) starts before Base Interval (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░████░░░░░░ Target
     * @param base Interval
     * @returns boolean
     */
    startsBefore(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.start.isBefore(base, compareFunction)
    }
    /**
     * Check if the Target Interval (caller) starts at the same point as Base Interval (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░██░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    startsTogether(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.start.isBaseStart(base, compareFunction)
    }
    /**
     * Check if the Target Interval (caller) starts during Base Interval (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░█████░░ Target
     * @param base Interval
     * @returns boolean
    */
    startsDuring(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.start.isDuring(base, compareFunction)
    }
    /**
     * Check if the Target Interval (caller) starts when Base Interval (argument) ends 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░░░██░░ Target
     * @param base Interval
     * @returns boolean
    */
    startsJustAfter(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.start.isBaseEnd(base, compareFunction)
    }
    /**
     * Check if the Target Interval (caller) starts after Base Interval (argument) ends 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░░░░██░ Target
     * @param base Interval
     * @returns boolean
    */
    startsAfter(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.start.isAfter(base, compareFunction)
    }



    // End Point Comparison

    /**
     * Check if the Target Interval (caller) ends before Base Interval (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░██░░░░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    endsBefore(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.end.isBefore(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) ends when Base Interval (argument) begins 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░██░░░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    endsJustBefore(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.end.isBaseStart(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) ends during Base Interval (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░████░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    endsDuring(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.end.isDuring(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) ends when Base Interval (argument) ends 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░██████░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    endsTogether(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.end.isBaseEnd(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) ends afer Base Interval (argument) ends 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░░░██░░ Target
     * @param base Interval
     * @returns boolean
    */
    endsAfter(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.end.isAfter(base, compareFunction)
    }

    //Interval Checks


    /**
     * Check if the Target Interval (caller) starts before and ends before base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░██░░░░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    precedes(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsBefore(base, compareFunction) && this.endsBefore(base, compareFunction)
    }
    /**
    * Check if the Target Interval (caller) starts after and ends after base (argument) 
    * 
    * Example:
    * 
    * ░░░░████░░░░ Base
    * 
    * ░░░░░░░░░██░ Target
    * @param base Interval
    * @returns boolean
    */

    isPrecededBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsAfter(base, compareFunction) && this.endsAfter(base, compareFunction)
    }
    /**
     * Check if the Target Interval (caller) starts before and ends on base (argument) start 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░███░░░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    meets(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsBefore(base, compareFunction) && this.endsJustBefore(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts just after base
     *  and ends after base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░░░███░ Target
     * @param base Interval
     * @returns boolean
    */
    isMetBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsJustAfter(base, compareFunction) && this.endsAfter(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts before and ends during base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░███░░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    overlaps(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsBefore(base, compareFunction) && this.endsDuring(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts during and ends after base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░░███░░ Target
     * @param base Interval
     * @returns boolean
    */
    isOverlapedBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsDuring(base, compareFunction) && this.endsAfter(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts with and ends during base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░███░░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    starts(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsTogether(base, compareFunction) && this.endsDuring(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts with and ends after base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░██████░░ Target
     * @param base Interval
     * @returns boolean
    */
    isStartedBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsTogether(base, compareFunction) && this.endsAfter(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts before and ends after base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░████████░░ Target
     * @param base Interval
     * @returns boolean
    */
    contains(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsBefore(base, compareFunction) && this.endsAfter(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts during and ends during base (argument) 
     * 
     * Example:
     * 
     * ░░████████░░ Base
     * 
     * ░░░░████░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    isContainedBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsDuring(base, compareFunction) && this.endsDuring(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts during and ends with base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░░░██░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    finishes(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsDuring(base, compareFunction) && this.endsTogether(base, compareFunction)
    }

    /**
     * Check if the Target Interval (caller) starts before and ends with base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░██████░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    isFinishedBy(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsBefore(base, compareFunction) && this.endsTogether(base, compareFunction)
    }


    /**
     * Check if the Target Interval (caller) starts with and ends with base (argument) 
     * 
     * Example:
     * 
     * ░░░░████░░░░ Base
     * 
     * ░░░░████░░░░ Target
     * @param base Interval
     * @returns boolean
    */
    equals(base: Interval<t>, compareFunction = this.compareFunction): boolean {
        return this.startsTogether(base, compareFunction) && this.endsTogether(base, compareFunction)
    }
}
