import { CompareFunctions } from "./types/CompareFunction"

type Type = unknown

function isNumber(obj: unknown): obj is number {
    return typeof obj == "number"
}
function isString(obj: unknown): obj is string {
    return typeof obj == "string"
}
function isDate(obj: unknown): obj is Date {
    return typeof obj == "object" && obj instanceof Date
}

export const defaultCompareFunction: CompareFunctions<Type> = {
    smaller(a: Type, b: Type): boolean {
        if(
            (isNumber(a) && isNumber(b)) ||
            (isString(a) && isString(b))
        ) {
            return a < b
        }
        if(isDate(a) && isDate(b)) {
            a.getTime() < b.getTime()
        }
        return false
    },
    equal(a: Type, b: Type): boolean {
        if(
            (isNumber(a) && isNumber(b)) ||
            (isString(a) && isString(b))
        ) {
            return a == b
        }
        if(isDate(a) && isDate(b)) {
            a.getTime() == b.getTime()
        }
        return false
    },
    greater(a: Type, b: Type): boolean {
        if(
            (isNumber(a) && isNumber(b)) ||
            (isString(a) && isString(b))
        ) {
            return a > b
        }
        if(isDate(a) && isDate(b)) {
            a.getTime() > b.getTime()
        }
        return false
    }
}