export type PointToPointRelation = "before" | "equal" | "after"

export type PointToIntervalRelation = "before" | "start" | "during" | "end" | "after"

export type IntervalToIntervalRelation = "precedes"| 
"isPrecededBy"|  
"meets"| 
"isMetBy"| 
"overlaps"| 
"isOverlapedBy"| 
"starts"| 
"isStartedBy"| 
"contains"| 
"isContainedBy"| 
"finishes"| 
"isFinishedBy"| 
"equals"

export type IntervalToIntervalDirectionRelation = "reverse" | ""