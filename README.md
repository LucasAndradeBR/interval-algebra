# Interval Algebra
A package for interval algebra calculations, with the implementation of [Allen's interval algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra)

# Types

## Comparing Function

Comparing function is a generic interface with operations to determine the relation between two [Points](#point) of the same type t. They must implement all three properties described below:

``` Typescript
interface CompareFunctions<t> {
    smaller(a: t, b: t): boolean, // Returns true if a is strictly smaller than b
    equal(a: t, b: t): boolean, // Returns true if a is equal b
    greater(a: t, b: t): boolean, // Returns true if a is strictly greater than b
}
```

The default implementation works with `string`, `number` and `Date`, the following implementation is an example for a different type than ones natively suported:

``` Typescript
class MyClass {
    constructor(public a: number, public  b: string){}
}
const CustomCompareFunction: CompareFunctions<MyClass> = {
    smaller: (a, b) => a.a < b.a, // Returns true if a is strictly smaller than b
    equal: (a, b) => a.a == b.a, // Returns true if a is equal b
    greater: (a, b) => a.a > b.a, // Returns true if a is strictly greater than b
}
```

## Point

A point is a generic class that stores a data and can operate against other [Points](#point) or [Intervals](#intervals) given a [Comparing Function](#comparing-function).

Its constructor accepts two arguments:
| **Argument**    | **Type**            | **Description**                                              |
| --------------- | ------------------- | ------------------------------------------------------------ |
| Value           | Generic: t          | The current value of the point                               |
| compareFunction | (optional) CompareFunctions\<t\> | The [Comparing Function](#comparing-function) for that point |

example:

``` Typescript
const p1 = new Point(2) // Point<number>
const p2 = new Point(new Date(), DateCompareFunction) // Point<Date>
```

All methods of this class are related to comparisons betwees itself and other Point or Interval of same type.

### Point to Point relations:
Compares values of two points

| **Function** 	| **Arguments** 	| **Return Type** 	| **Description** 	|
|-	|-	|-	|-	|
| isSmaller	| base: Point\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |the return of Point#compareFunction#smaler is true|
| isEqual	| base: Point\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |the return of Point#compareFunction#equals is true|
| isGreater	| base: Point\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |the return of Point#compareFunction#greater is true|

``` Typescript
// With numbers
const p1 = new Point(2) // Point<number>
const p2 = new Point(3) // Point<number>
p1.isSmaller(p2) // true
p1.isEqual(new Point(2)) // true
p1.isGreater(p2) // false

// With Dates
const p1Date = new Point(new Date(100),) // Point<Date>
const p2Date = new Point(new Date(200)) // Point<Date>
p1Date.isSmaller(p2Date) // true
p2Date.isGreater(p1Date) // true
```

With other types: 
``` Typescript
    const p1 = new Point(new MyClass(1,"a")) // Point<number>
    const p1WithComparation = new Point(new MyClass(1,"d"), CustomCompareFunction) // Point<number>
    const p2 = new Point(new MyClass(2,"c")) // Point<number>
    p1Date.isSmaller(p2Date) // false
    p1WithComparation.isSmaller(p2Date) // true
    p2Date.isGreater(p1Date) // false

    p1Date.isSmaller(p2Date, CustomCompareFunction) // true
    p2Date.isGreater(p1Date, CustomCompareFunction) // true

    const AnotherCustomCompareFunction: CompareFunctions<MyClass> = {
        smaller: (p1, p2) => p1.b < p2.b, // Returns true if a is strictly smaller than b
        equal: (p1, p2) => p1.b == p2.b, // Returns true if a is equal b
        greater: (p1, p2) => p1.b > p2.b, // Returns true if a is strictly greater than b
    }
    // If you pass a custom ComparationFunction it will be preferred
    p1WithComparation.isSmaller(p2Date, AnotherCustomCompareFunction) // false, beacuse "d" > "c"

```

### Point to Interval relations

<mark style="background-color: black; color: white"> Note: You should read [Intervals](#intervals) first. </mark>


| **Function** 	| **Arguments** 	| **Return Type** 	| **Description** 	|
|-	|-	|-	|-	|
| isBefore	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Point is smaller than Base.start|
| isBaseStart	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean | Point is equal Base.start |
| isDuring	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Point is greater than Base.start AND Point is smaller than Base.end|
| isBaseEnd	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Point is equal Base.end|
| isAfter	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Point is greater than Base.end|

``` Typescript
// With numbers
const p1 = new Point(1) // Point<number>
const p2 = new Point(2) // Point<number>
const p3 = new Point(3) // Point<number>
const p4 = new Point(4) // Point<number>
const p5 = new Point(5) // Point<number>
const interval = new Interval(2,4) // Interval<number>

p1.isBefore(interval) // true
p1.isBaseStart(interval) // false
p2.isBaseStart(interval) // true
p3.isDuring(interval) // true
p4.isBaseEnd(interval) // true
p5.isAfter(interval) // true
```


``` Typescript
// With other classes
const p1 = new Point(new MyClass(100, "a")) // Point<number>
const interval = new Interval(new MyClass(100, "b"), new MyClass(200, "c")) // Interval<number>

p1.isBefore(interval) // false
p1.isBaseStart(interval) // false
p1.isDuring(interval) // false
p1.isBaseEnd(interval) // false
p1.isAfter(interval) // false, to solve pass a compare function to either the point constructor or the function call:

// Solution 1: Pass to the function call
p1.isBaseStart(interval, CustomCompareFunction) // true 

// Solution 2: Pass to the constructor
const p1 = new Point(new MyClass(100, "a"), CustomCompareFunction) // Point<number>
p1.isBaseStart(interval) // true, beacuse 100 == 100
// Here you can also override the point Compare Function:
p1.isBaseStart(interval, AnotherCustomCompareFunction) // false, because "a" < "b"
p1.isBefore(interval, AnotherCustomCompareFunction) // true, because "a" < "b"
```

## Interval

A Interval is generic class that stores two points in ascending direction 
Its constructor accepts three arguments:
| **Argument**    | **Type**            | **Description**                                              |
| --------------- | ------------------- | ------------------------------------------------------------ |
| start           | Generic: t          | The value of the start point of the interval         |
| end             | Generic: t          | The value of the end point of the interval           |
| compareFunction | (optional) CompareFunctions\<t\> | The [Comparing Function](#comparing-function) for that point |

note: if compareFunction.smaller(end, start) the interval will be reversed, you can check if a interval is reversed with the property Interval#reverse


Interval Properties:
| **Property**    | **Type**            | **Description**                                              |
| --------------- | ------------------- | ------------------------------------------------------------ |
| start           | Point\<t\>          | The current value of the start point of the interval         |
| end             | Point\<t\>           | The current value of the end point of the interval           |
| compareFunction | CompareFunctions\<t\> | The [Comparing Function](#comparing-function) for that point |
| reverse | boolean | true if start and end were swaped during creation (see previous note) |


Methods:
| **Function** 	| **Arguments** 	| **Return Type** 	| **Description** 	|
|-	|-	|-	|-	|
| **Start Point** |
| startsBefore	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#start is before Base<br/> ░░░░████░░░░ Base (argument)<br/> ░░██░░░░░░░░ Target (self)|
| startsTogether	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#start is BaseStart <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░██░░░░░░ Target (self)|
| startsDuring	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#start is during Base <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░██░░░░░ Target (self)|
| startsJustAfter	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#start is BaseEnd<br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░░░██░░ Target (self)|
| startsAfter | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#start is after Base<br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░░░░██░ Target (self)|
| **End Point** |
| endsBefore	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#end is before Base<br/> ░░░░████░░░░ Base (argument)<br/> ░██░░░░░░░░░ Target (self)|
| endsJustBefor	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#end is BaseStart <br/> ░░░░████░░░░ Base (argument)<br/> ░░██░░░░░░░░ Target (self)|
| endsDuring	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#end is during Base <br/> ░░░░████░░░░ Base (argument)<br/> ░░████░░░░░░ Target (self)|
| endsTogether	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#end is BaseEnd<br/> ░░░░████░░░░ Base (argument)<br/> ░░██████░░░░ Target (self)|
| endsAfter | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Interval#end is after Base<br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░░░██░░ Target (self)|
| **Interval** |
| precedes	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts before and ends before base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░██░░░░░░░░░ Target (self)|
| isPrecededBy	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts after and ends after base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░░░░██░ Target (self)|
| meets	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts before and ends on base (argument) start <br/> ░░░░████░░░░ Base (argument)<br/> ░███░░░░░░░░ Target (self)|
| isMetBy	| Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts just after base<br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░░░███░ Target (self)|
| overlaps | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts before and ends during base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░████░░░░░░ Target (self)|
| isOverlapedBy | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts during and ends after base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░████░░ Target (self)|
| starts | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts with and ends during base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░███░░░░░ Target (self)|
| isStartedBy | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target Interval (caller) starts with and ends after base (argument)<br/> ░░░░████░░░░ Base (argument)<br/> ░░░░██████░░ Target (self)|
| contains | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target Interval (caller) starts before and ends after base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░████████░░ Target (self)|
| isContainedBy | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts during and ends during base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░██░░░░░ Target (self)|
| finishes | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts during and ends with base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░░░██░░░░ Target (self)|
| isFinishedBy | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts before and ends with base (argument)<br/> ░░░░████░░░░ Base (argument)<br/> ░░██████░░░░ Target (self)|
| equals | Base: Interval\<t\>, (optional) compareFunction: CompareFunctions\<t\> | Boolean |Target (caller) starts with and ends with base (argument) <br/> ░░░░████░░░░ Base (argument)<br/> ░░░░████░░░░ Target (self)|

### Start Point Comparison

``` Typescript
    const base = new Interval(10,20)        // ░░██░░
    const interval1 = new Interval(5,15)    // ░██░░░
    const interval2 = new Interval(10,20)   // ░░██░░
    const interval3 = new Interval(15,25)   // ░░░██░
    const interval4 = new Interval(20,30)   // ░░░░██
    const interval5 = new Interval(25,30)   // ░░░░░█

    interval1.startsBefore(base) // true
    interval2.startsTogether(base) // true
    interval3.startsDuring(base) // true
    interval4.startsJustAfter(base) // true
    interval5.startsAfter(base) // true
```

### End Point Comparison

``` Typescript
    const base = new Interval(10,20)        // ░░██░░
    const interval1 = new Interval(0,5)     // █░░░░░
    const interval2 = new Interval(0,10)    // ██░░░░
    const interval3 = new Interval(5,15)    // ░██░░░
    const interval4 = new Interval(10,20)   // ░░██░░
    const interval5 = new Interval(20,30)   // ░░░░██

    interval1.endsBefore(base) // true
    interval2.endsJustBefor(base) // true
    interval3.endsDuring(base) // true
    interval4.endsTogether(base) // true
    interval5.endsAfter(base) // true
```

### Interval Comparison

``` Typescript
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(1,3)    // ░██░░░░░░░░░

    target.precedes(base) // true
    base.isPrecededBy(target) // true

    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(2,4)    // ░░██░░░░░░░░

    target.meets(base) // true
    base.isMetBy(target) // true
    
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(3,5)    // ░░░██░░░░░░░

    target.overlaps(base) // true
    base.isOverlapedBy(target) // true
    
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(4,6)    // ░░░░██░░░░░░

    target.starts(base) // true
    base.isStartedBy(target) // true
    
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(3,9)    // ░░░██████░░░

    target.contains(base) // true
    base.isContainedBy(target) // true
    
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(5,8)    // ░░░░░███░░░░

    target.finishes(base) // true
    base.isFinishedBy(target) // true
    
    const base = new Interval(4,8)      // ░░░░████░░░░
    const target = new Interval(4,8)    // ░░░░████░░░░

    target.equals(base) // true
```

#### Custom Compare Function

``` Typescript
    const base = new Interval(
        new MyClass(10,"c"),        // ░░░░░█████░░░░░
        new MyClass(20,"g")         // --c---g--
    )
    const interval = new Interval(
        new MyClass(12,"b"),        // ░░░░░░███░░░░░
        new MyClass(18,"h"),         // -b-----h-
        CustomCompareFunction
    )

    interval.isContainedBy(base) // true
    base.contains(interval) // false, lacks a proper comparation function
    base.contains(interval, CustomCompareFunction) // true

    
    interval.contains(base, AnotherCustomCompareFunction) // true    
    base.isContainedBy(interval, AnotherCustomCompareFunction) // true

```

