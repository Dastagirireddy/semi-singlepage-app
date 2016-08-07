/**
 * @module
 * @description
 * Change detection enables data binding in Angular.
 */
System.register(['./change_detection/change_detection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (change_detection_1_1) {
                exports_1({
                    "ChangeDetectionStrategy": change_detection_1_1["ChangeDetectionStrategy"],
                    "ExpressionChangedAfterItHasBeenCheckedException": change_detection_1_1["ExpressionChangedAfterItHasBeenCheckedException"],
                    "ChangeDetectionError": change_detection_1_1["ChangeDetectionError"],
                    "ChangeDetectorRef": change_detection_1_1["ChangeDetectorRef"],
                    "WrappedValue": change_detection_1_1["WrappedValue"],
                    "SimpleChange": change_detection_1_1["SimpleChange"],
                    "PipeTransform": change_detection_1_1["PipeTransform"],
                    "IterableDiffers": change_detection_1_1["IterableDiffers"],
                    "IterableDiffer": change_detection_1_1["IterableDiffer"],
                    "IterableDifferFactory": change_detection_1_1["IterableDifferFactory"],
                    "KeyValueDiffers": change_detection_1_1["KeyValueDiffers"],
                    "KeyValueDiffer": change_detection_1_1["KeyValueDiffer"],
                    "KeyValueDifferFactory": change_detection_1_1["KeyValueDifferFactory"],
                    "CollectionChangeRecord": change_detection_1_1["CollectionChangeRecord"],
                    "KeyValueChangeRecord": change_detection_1_1["KeyValueChangeRecord"],
                    "TrackByFn": change_detection_1_1["TrackByFn"]
                });
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBDaGFuZ2UgZGV0ZWN0aW9uIGVuYWJsZXMgZGF0YSBiaW5kaW5nIGluIEFuZ3VsYXIuXG4gKi9cblxuZXhwb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG5cbiAgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb24sXG4gIENoYW5nZURldGVjdGlvbkVycm9yLFxuXG4gIENoYW5nZURldGVjdG9yUmVmLFxuXG4gIFdyYXBwZWRWYWx1ZSxcbiAgU2ltcGxlQ2hhbmdlLFxuICBQaXBlVHJhbnNmb3JtLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlckZhY3RvcnksXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEtleVZhbHVlRGlmZmVyRmFjdG9yeSxcbiAgQ29sbGVjdGlvbkNoYW5nZVJlY29yZCxcbiAgS2V5VmFsdWVDaGFuZ2VSZWNvcmQsXG4gIFRyYWNrQnlGblxufSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
